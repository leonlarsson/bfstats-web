import { useState } from "react";
import { useMemo } from "react";
import { Bar, BarChart as BarChartRaw, CartesianGrid, Rectangle, Tooltip, XAxis, YAxis } from "recharts";
import type { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import type { Game, SentDailyItemGames } from "types";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Uses /outputs/daily/games-no-gaps
export const StatsSentPerDayChartWithFilter = ({ data }: { data: SentDailyItemGames[] }) => {
  const totalData = useMemo(() => {
    return data.filter((v, i, a) => a.findIndex((v2) => v2.day === v.day) === i);
  }, [data]);

  // Show all, last 30 days, last 7 days
  type DataSliceDays = 0 | -30 | -7;
  const [dataSlice, setDataSlice] = useState<DataSliceDays>(-30);
  const [selectedGame, setSelectedGame] = useState<Game | "All games">("All games");
  const [selectedData, setSelectedData] = useState(totalData);

  const handleGameChange = (selectValue: Game | "All games") => {
    setSelectedGame(selectValue);
    setSelectedData(selectValue === "All games" ? totalData : data.filter((x) => x.game === selectValue));
  };

  const chartData = useMemo(() => {
    return selectedData.slice(dataSlice).map((x) => ({
      date: new Date(x.day).toLocaleDateString(),
      value: selectedGame === "All games" ? x.totalSent : x.sent,
    }));
  }, [dataSlice, selectedData, selectedGame]);

  const notesForGame = getAllNotesForGame(selectedGame);

  return (
    <div>
      <RadioGroup
        className="mb-2"
        defaultValue={dataSlice.toString()}
        onValueChange={(v) => {
          setDataSlice(Number.parseInt(v) as DataSliceDays);
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="r1" value={"0"} />
          <Label htmlFor="r1">Since Jan 1st, 2023</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="r2" value={"-30"} />
          <Label htmlFor="r2">Last 30 days</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="r3" value={"-7"} />
          <Label htmlFor="r3">Last 7 days</Label>
        </div>
      </RadioGroup>

      <Select value={selectedGame} onValueChange={(e: Game | "All games") => handleGameChange(e)}>
        <SelectTrigger className="mb-5 w-[250px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="All games">All games</SelectItem>
            {[
              "Battlefield 2042",
              "Battlefield V",
              "Battlefield 1",
              "Battlefield Hardline",
              "Battlefield 4",
              "Battlefield 3",
              "Battlefield Bad Company 2",
              "Battlefield 2",
            ].map((game) => (
              <SelectItem key={game} value={game}>
                {game}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <ChartContainer
        className="h-[400px] w-full"
        config={{
          value: {
            label: "Sent",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <BarChartRaw data={chartData}>
          <XAxis type="category" dataKey="date" />
          <YAxis type="number" tickFormatter={(v) => v.toLocaleString("en")} />
          <CartesianGrid vertical={false} />
          <Tooltip
            content={
              <ChartTooltipContent
                indicator="line"
                labelFormatter={(label: string) => {
                  return (
                    <div className="flex flex-col gap-1">
                      <span>{selectedGame}</span>
                      <span className="font-medium">{label}</span>
                      <ChartDataExtraNote selectedGame={selectedGame} date={label} />
                    </div>
                  );
                }}
              />
            }
          />
          <Bar isAnimationActive={false} dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
        </BarChartRaw>
      </ChartContainer>

      {notesForGame.length > 0 && (
        <details>
          <summary className="cursor-pointer w-fit">Notes</summary>
          <div className="text-sm">
            {notesForGame.map((noteEntry, i) => (
              <div key={`${noteEntry.date}-${noteEntry.note}-${i.toString()}`}>
                <span className="tabular-nums font-medium"> {noteEntry.date}</span>: {noteEntry.note}
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

type BarChartProps = CategoricalChartProps & { chartConfig?: ChartConfig; total: number };
export const BarChart = (props: BarChartProps) => {
  const barHeight = 32;
  const barGap = 8;

  return (
    <ChartContainer
      config={
        props.chartConfig ?? {
          value: {
            label: "Sent",
            color: "hsl(var(--chart-1))",
          },
        }
      }
      style={{
        // 8 acts as the gap between each bar.
        // Defaulting to prevent 0 (which looks bad?)
        height: props.data!.length * (barHeight + (barGap || 1)),
        aspectRatio: "auto",
      }}
    >
      <BarChartRaw accessibilityLayer layout="vertical" barSize={barHeight} margin={{ left: 0, right: 0 }} {...props}>
        <XAxis dataKey="value" type="number" hide />
        <YAxis dataKey="name" type="category" hide />
        <Bar
          dataKey="value"
          layout="vertical"
          fill="var(--color-value)"
          background={{ radius: 0, fill: "hsl(var(--muted))" }}
          radius={[0, 2, 2, 0]}
          // Thanks shadcn: https://x.com/shadcn/status/1813643935254041045
          // biome-ignore lint/suspicious/noExplicitAny: Jank
          shape={(shapeProps: any) => {
            return (
              <>
                {/* Bar */}
                <Rectangle {...shapeProps} />
                {/* Name */}
                <text x={shapeProps.x + 10} y={shapeProps.y + 20} fill="hsl(var(--foreground))">
                  {shapeProps.name}
                </text>
                {/* Value */}
                <text
                  x={shapeProps.background.width - 10}
                  y={shapeProps.y + 20}
                  textAnchor="end"
                  fill="hsl(var(--foreground))"
                >
                  {shapeProps.value?.toLocaleString("en")} ({((shapeProps.value / props.total) * 100).toFixed(1)}%)
                </text>
              </>
            );
          }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
      </BarChartRaw>
    </ChartContainer>
  );
};

const chartDataExtraNotes: Partial<Record<Game | "All games", Record<string, string>>> = {
  "All games": {
    "2025-02-03": "Battlefield Labs was announced.",
  },
  "Battlefield Bad Company 2": {
    "2023-12-01": "BFBC2 stats API was discontinued.",
  },
};

const getNotesForGameOnDate = (selectedGame: Game | "All games", date: string): string[] => {
  const notes: string[] = [];

  // If All games is not selected but it has a note for the date, add it
  if (selectedGame !== "All games" && chartDataExtraNotes["All games"]?.[date]) {
    notes.push(chartDataExtraNotes["All games"][date]!);
  }

  // Add note for selected game
  if (chartDataExtraNotes[selectedGame]?.[date]) {
    notes.push(chartDataExtraNotes[selectedGame][date]!);
  }

  return notes;
};

const getAllNotesForGame = (selectedGame: Game | "All games"): { date: string; note: string }[] => {
  const notes: { date: string; note: string }[] = [];

  // Add notes for All games
  if (selectedGame !== "All games") {
    for (const noteEntry of Object.entries(chartDataExtraNotes["All games"] ?? {})) {
      notes.push({ date: noteEntry[0], note: noteEntry[1] });
    }
  }

  // Add notes for selected game
  for (const noteEntry of Object.entries(chartDataExtraNotes[selectedGame] ?? {})) {
    notes.push({ date: noteEntry[0], note: noteEntry[1] });
  }

  return notes.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

type ChartDataExtraNoteProps = {
  selectedGame: Game | "All games";
  date: string;
};

const ChartDataExtraNote = ({ selectedGame, date }: ChartDataExtraNoteProps) => {
  const notes = getNotesForGameOnDate(selectedGame, date);
  if (!notes.length) return null;
  return (
    <>
      {notes.map((note, i) => (
        <div className="text-xs opacity-75" key={`${note}-${i.toString()}`}>
          Note: {note}
        </div>
      ))}
    </>
  );
};
