import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import type { Game, SentDailyItemGames } from "types";
import { getNotesForGameOnDate } from "@/components/Charts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type HeatmapDay = { day: string; value: number };
type HoveredCell = { x: number; y: number; date: Date; value: number };

const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_OPACITY = 0.12;
const MAX_OPACITY = 1;

const GAMES = [
  "Battlefield 6",
  "Battlefield 2042",
  "Battlefield V",
  "Battlefield 1",
  "Battlefield Hardline",
  "Battlefield 4",
  "Battlefield 3",
  "Battlefield Bad Company 2",
  "Battlefield 2",
] satisfies Game[];

// UTC-only: local-time methods here would shift days in timezones behind UTC.
const toDateOnly = (d: Date) => {
  const copy = new Date(d);
  copy.setUTCHours(0, 0, 0, 0);
  return copy;
};

const toKey = (d: Date) => d.toISOString().slice(0, 10);

// Percentile of a sorted array using linear interpolation between closest ranks.
const percentile = (sorted: number[], p: number) => {
  if (sorted.length === 0) return 0;
  const index = (sorted.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower]!;
  return sorted[lower]! + (sorted[upper]! - sorted[lower]!) * (index - lower);
};

export const ActivityHeatmap = ({ data }: { data: SentDailyItemGames[] }) => {
  const [selectedGame, setSelectedGame] = useState<Game | "All games">("All games");

  const heatmapData = useMemo<HeatmapDay[]>(() => {
    if (selectedGame === "All games") {
      const seen = new Set<string>();
      return data
        .filter((d) => (seen.has(d.day) ? false : seen.add(d.day)))
        .map((d) => ({ day: d.day, value: d.totalSent }));
    }
    return data.filter((d) => d.game === selectedGame).map((d) => ({ day: d.day, value: d.sent }));
  }, [data, selectedGame]);

  const { weeks, monthLabels, yearLabels, colorLow, colorHigh } = useMemo(() => {
    if (heatmapData.length === 0)
      return {
        weeks: [] as { date: Date; value: number }[][],
        monthLabels: [],
        yearLabels: [],
        colorLow: 0,
        colorHigh: 1,
      };

    const valueByDay = new Map(heatmapData.map((d) => [d.day, d.value]));
    const sortedDates = heatmapData.map((d) => new Date(d.day)).sort((a, b) => a.getTime() - b.getTime());

    const start = toDateOnly(sortedDates[0]!);
    start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
    const end = toDateOnly(sortedDates[sortedDates.length - 1]!);

    const allDays: { date: Date; value: number }[] = [];
    for (let d = new Date(start); d <= end; d = new Date(d.getTime() + DAY_MS)) {
      allDays.push({ date: new Date(d), value: valueByDay.get(toKey(d)) ?? 0 });
    }

    const weeks: { date: Date; value: number }[][] = [];
    for (let i = 0; i < allDays.length; i += 7) weeks.push(allDays.slice(i, i + 7));

    const monthLabels: { weekIndex: number; label: string }[] = [];
    let lastMonth = weeks[0]![0]!.date.getUTCMonth();
    weeks.forEach((week, i) => {
      const month = week[0]!.date.getUTCMonth();
      if (month !== lastMonth) {
        monthLabels.push({
          weekIndex: i,
          label: week[0]!.date.toLocaleDateString("en", { month: "short", timeZone: "UTC" }),
        });
        lastMonth = month;
      }
    });

    const yearLabels: { weekIndex: number; label: string }[] = [];
    let lastYear = weeks[0]![0]!.date.getUTCFullYear();
    weeks.forEach((week, i) => {
      const year = week[0]!.date.getUTCFullYear();
      if (year !== lastYear) {
        yearLabels.push({ weekIndex: i, label: year.toString() });
        lastYear = year;
      }
    });

    // Log scale from p10 to the true max, so outlier days don't wash out the rest of the scale.
    const nonZeroSorted = allDays
      .map((d) => d.value)
      .filter((v) => v > 0)
      .sort((a, b) => a - b);
    const colorLow = percentile(nonZeroSorted, 0.1);
    const colorHigh = Math.max(nonZeroSorted[nonZeroSorted.length - 1] ?? colorLow + 1, colorLow + 1);

    return { weeks, monthLabels, yearLabels, colorLow, colorHigh };
  }, [heatmapData]);

  const [hovered, setHovered] = useState<HoveredCell | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (weeks.length === 0) return;
    // Scroll the Radix viewport straight to its true max.
    const viewport = scrollAreaRef.current?.querySelector<HTMLDivElement>("[data-radix-scroll-area-viewport]");
    if (viewport) viewport.scrollLeft = viewport.scrollWidth;
  }, [weeks.length]);

  const opacityForValue = (value: number) => {
    if (value <= 0) return 0;
    const logLow = Math.log1p(colorLow);
    const logHigh = Math.log1p(colorHigh);
    const t = (Math.log1p(value) - logLow) / (logHigh - logLow);
    const clamped = Math.min(Math.max(t, 0), 1);
    return MIN_OPACITY + clamped * (MAX_OPACITY - MIN_OPACITY);
  };

  const showTooltip = (e: MouseEvent<HTMLDivElement>, date: Date, value: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHovered({ x: rect.left + rect.width / 2, y: rect.top, date, value });
  };

  const hoveredNotes = hovered ? getNotesForGameOnDate(selectedGame, toKey(hovered.date)) : [];

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="relative">
      <Select value={selectedGame} onValueChange={(v: Game | "All games") => setSelectedGame(v)}>
        <SelectTrigger className="mb-3 w-[250px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="All games">All games</SelectItem>
            {GAMES.map((game) => (
              <SelectItem key={game} value={game}>
                {game}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* fixed, not inside the scroll container, so it never gets clipped */}
      {hovered && (
        <div
          className="pointer-events-none fixed z-50 rounded-md border bg-popover px-2 py-1 text-popover-foreground text-xs shadow-md"
          style={{ left: hovered.x, top: hovered.y, transform: "translate(-50%, calc(-100% - 8px))" }}
        >
          <div className="font-medium">
            {hovered.date.toLocaleDateString("en", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            })}
          </div>
          <div className="text-muted-foreground">
            {hovered.value.toLocaleString("en")} sent {selectedGame === "All games" ? "" : `(${selectedGame})`}
          </div>
          {hoveredNotes.length > 0 && (
            <div className="mt-1 max-w-56 whitespace-normal border-t pt-1 text-muted-foreground">
              {hoveredNotes.map((note, i) => (
                <div key={`${note}-${i.toString()}`}>{note}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {weeks.length > 0 && (
        <ScrollArea ref={scrollAreaRef} type="always" className="w-full pb-4">
          {/* pr-4: room for the last label ("Jul", "2025") to overflow without extending scroll width */}
          <div className="inline-flex flex-col gap-1 pr-4">
            <div className="flex gap-1 pl-8 text-xs text-muted-foreground">
              {weeks.map((week, i) => (
                <div key={week[0]!.date.toISOString()} className="w-[11px] shrink-0">
                  {monthLabels.find((m) => m.weekIndex === i)?.label}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              <div className="flex flex-col gap-1 pr-1 text-xs text-muted-foreground">
                {dayLabels.map((label, i) => (
                  <div key={`${label}-${i.toString()}`} className="h-[11px] leading-[11px]">
                    {label}
                  </div>
                ))}
              </div>

              {weeks.map((week) => (
                <div key={week[0]!.date.toISOString()} className="flex shrink-0 flex-col gap-1">
                  {week.map((day) => {
                    const hasNote = getNotesForGameOnDate(selectedGame, toKey(day.date)).length > 0;
                    return (
                      // biome-ignore lint/a11y/noStaticElementInteractions: decorative hover-only tooltip trigger, not keyboard operable
                      <div
                        key={day.date.toISOString()}
                        onMouseEnter={(e) => showTooltip(e, day.date, day.value)}
                        onMouseLeave={() => setHovered(null)}
                        className={cn("size-[11px] rounded-[2px]", hasNote && "outline-1 -outline-offset-1")}
                        style={{
                          backgroundColor:
                            day.value === 0
                              ? "hsl(var(--muted))"
                              : `hsl(var(--chart-1) / ${opacityForValue(day.value)})`,
                          outlineColor: hasNote ? "hsl(var(--foreground) / 0.15)" : undefined,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {yearLabels.length > 1 && (
              <div className="flex gap-1 pl-8 text-xs text-muted-foreground">
                {weeks.map((week, i) => (
                  <div key={week[0]!.date.toISOString()} className="w-[11px] shrink-0">
                    {yearLabels.find((y) => y.weekIndex === i)?.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};
