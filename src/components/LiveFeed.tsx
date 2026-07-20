import { useQueries } from "@tanstack/react-query";
import humanizeDuration from "humanize-duration";
import { HomeIcon, ImagePlusIcon, Link2Icon, type LucideIcon, RadioIcon, SendIcon, UserIcon } from "lucide-react";
import { useMemo } from "react";
import type { DBEvent, DBOutput } from "types";
import { cn } from "@/lib/utils";
import { eventsRecentQueryOptions, outputsRecentQueryOptions } from "@/queries";

// Status shown in the feed header. Content (skeleton / rows) is unaffected by this.
const FEED_STATUS = {
  live: { label: "Transmitting", dot: "bg-primary animate-blink", text: "text-muted-foreground" },
  connecting: { label: "Connecting", dot: "bg-muted-foreground animate-pulse", text: "text-muted-foreground" },
  offline: { label: "Offline", dot: "bg-destructive", text: "text-destructive" },
} as const;

// Fix for mobile
const parseUTCDate = (date: string) => new Date(`${date.replace(" ", "T")}Z`);

const shortAgo = (date: string) =>
  humanizeDuration(parseUTCDate(date).getTime() - Date.now(), {
    round: true,
    largest: 1,
    units: ["d", "h", "m"],
  });

// Only the positive events belong in the feed — uninstalls/unlinks are noise here.
const EVENT_META: Partial<Record<DBEvent["event"], { icon: LucideIcon; label: string }>> = {
  appGuildInstall: { icon: HomeIcon, label: "Added to a server" },
  appUserInstall: { icon: UserIcon, label: "Installed to an account" },
  bfAccountLink: { icon: Link2Icon, label: "Battlefield account linked" },
  apiImageGenerated: { icon: ImagePlusIcon, label: "API image generated" },
};

type FeedItem = { kind: "output"; date: string; output: DBOutput } | { kind: "event"; date: string; event: DBEvent };

/** Real-time feed of the bot's recent deliveries and install/link events, straight from the public API. */
export const LiveFeed = () => {
  const [outputsQuery, eventsQuery] = useQueries({
    queries: [
      { ...outputsRecentQueryOptions, refetchInterval: 30_000 },
      { ...eventsRecentQueryOptions, refetchInterval: 30_000 },
    ],
  });

  const items = useMemo<FeedItem[] | undefined>(() => {
    if (!outputsQuery.data && !eventsQuery.data) return undefined;
    const outputs: FeedItem[] = (outputsQuery.data ?? []).map((output) => ({
      kind: "output",
      date: output.date,
      output,
    }));
    const events: FeedItem[] = (eventsQuery.data ?? [])
      .filter((event) => event.event in EVENT_META)
      .map((event) => ({ kind: "event", date: event.date, event }));
    return [...outputs, ...events]
      .sort((a, b) => parseUTCDate(b.date).getTime() - parseUTCDate(a.date).getTime())
      .slice(0, 12);
  }, [outputsQuery.data, eventsQuery.data]);

  // Both feeds failed (retries exhausted) → offline; otherwise live if we have data, else still connecting.
  const status: keyof typeof FEED_STATUS =
    outputsQuery.isError && eventsQuery.isError ? "offline" : items !== undefined ? "live" : "connecting";
  const statusMeta = FEED_STATUS[status];

  return (
    <div className="panel clip-notch flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest">
          <RadioIcon className="size-4 text-primary" />
          Live feed
        </span>
        <span
          className={cn(
            "flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
            statusMeta.text,
          )}
        >
          <span className={cn("size-1.5 rounded-full", statusMeta.dot)} />
          {statusMeta.label}
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden px-4 py-2">
        {items ? (
          <ul className="divide-y divide-border/60">
            {items.map((item, i) => (
              <li
                className="flex items-baseline justify-between gap-3 py-2 text-sm"
                key={`${item.kind}-${item.date}-${i.toString()}`}
              >
                {item.kind === "output" ? (
                  <span className="flex min-w-0 items-baseline gap-2">
                    <SendIcon className="size-3.5 shrink-0 translate-y-0.5 text-primary" />
                    <span className="truncate">
                      <span className="font-medium">{item.output.game}</span>{" "}
                      <span className="text-muted-foreground">
                        {item.output.segment}
                        {item.output.paginationPage ? ` [#${item.output.paginationPage}]` : ""} · {item.output.language}
                      </span>
                    </span>
                  </span>
                ) : (
                  <EventRow event={item.event} />
                )}
                <span
                  className="shrink-0 font-mono text-xs text-muted-foreground"
                  title={parseUTCDate(item.date).toLocaleString()}
                >
                  {shortAgo(item.date)} ago
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="divide-y divide-border/60">
            {Array.from({ length: 12 }, (_, i) => i).map((i) => (
              <li className="py-2" key={i}>
                <div className="h-5 w-full animate-pulse rounded bg-muted" style={{ animationDelay: `${i * 80}ms` }} />
              </li>
            ))}
          </ul>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-card to-transparent" />
      </div>

      <div className="border-t px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Latest deliveries & events from the bot
      </div>
    </div>
  );
};

const EventRow = ({ event }: { event: DBEvent }) => {
  const meta = EVENT_META[event.event];
  if (!meta) return null;
  const Icon = meta.icon;
  return (
    <span className="flex min-w-0 items-baseline gap-2">
      <Icon className="size-3.5 shrink-0 translate-y-0.5 text-primary" />
      <span className="truncate text-muted-foreground">{meta.label}</span>
    </span>
  );
};
