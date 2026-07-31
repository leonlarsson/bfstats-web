import { useQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, HomeIcon, ImagePlusIcon, Link2Icon, type LucideIcon, RadioIcon, UserIcon } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import type { DBEvent } from "types";
import { ActivityLegend } from "@/components/ActivityLegend";
import { chainRowClass, OutputEntry } from "@/components/OutputEntry";
import { TimeAgo } from "@/components/TimeAgo";
import { groupOutputs, type OutputSession, toRows } from "@/lib/outputs";
import { cn, parseUTCDate } from "@/lib/utils";
import { eventsRecentQueryOptions, outputsRecentQueryOptions } from "@/queries";

// Status shown in the feed header. Content (skeleton / rows) is unaffected by this.
const FEED_STATUS = {
  live: { label: "Transmitting", dot: "bg-primary animate-blink", text: "text-muted-foreground" },
  connecting: { label: "Connecting", dot: "bg-muted-foreground animate-pulse", text: "text-muted-foreground" },
  offline: { label: "Offline", dot: "bg-destructive", text: "text-destructive" },
} as const;

// Only the positive events belong in the feed — uninstalls/unlinks are noise here.
const EVENT_META: Partial<Record<DBEvent["event"], { icon: LucideIcon; label: string }>> = {
  appGuildInstall: { icon: HomeIcon, label: "Added to a server" },
  appUserInstall: { icon: UserIcon, label: "Installed to an account" },
  bfAccountLink: { icon: Link2Icon, label: "Battlefield account linked" },
  apiImageGenerated: { icon: ImagePlusIcon, label: "API image generated" },
};

type FeedItem =
  | { kind: "output"; date: string; session: OutputSession }
  | { kind: "event"; date: string; event: DBEvent };

const FEED_ROWS = 8;

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
    // Group so one user's paging doesn't flood the feed.
    const outputs: FeedItem[] = groupOutputs(outputsQuery.data ?? []).map((session) => ({
      kind: "output",
      date: session.date,
      session,
    }));
    const events: FeedItem[] = (eventsQuery.data ?? [])
      .filter((event) => event.event in EVENT_META)
      .map((event) => ({ kind: "event", date: event.date, event }));

    const sorted = [...outputs, ...events].sort(
      (a, b) => parseUTCDate(b.date).getTime() - parseUTCDate(a.date).getTime(),
    );

    // Budget by rows, not items. Sessions stay intact where possible; the final session is trimmed if needed so the feed never exceeds the row budget.
    const shown: FeedItem[] = [];
    let rows = 0;

    for (const item of sorted) {
      const remaining = FEED_ROWS - rows;
      if (remaining <= 0) break;

      if (item.kind === "event") {
        shown.push(item);
        rows++;
        continue;
      }

      const segmentCount = item.session.segments.length;

      if (segmentCount <= remaining) {
        shown.push(item);
        rows += segmentCount;
        continue;
      }

      // Last visible session: trim it so we never exceed FEED_ROWS.
      shown.push({
        ...item,
        session: {
          ...item.session,
          segments: item.session.segments.slice(0, remaining),
        },
      });

      break;
    }

    return shown;
  }, [outputsQuery.data, eventsQuery.data]);

  // Both feeds failed (retries exhausted) → offline; otherwise live if we have data, else still connecting.
  const status: keyof typeof FEED_STATUS =
    outputsQuery.isError && eventsQuery.isError ? "offline" : items !== undefined ? "live" : "connecting";
  const statusMeta = FEED_STATUS[status];

  return (
    <div className="panel clip-notch flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-medium">
          <RadioIcon className="size-4 text-primary" />
          Live feed
          <ActivityLegend />
        </span>
        <span className={cn("flex items-center gap-1.5 text-xs transition-colors", statusMeta.text)}>
          <span className={cn("size-1.5 rounded-full", statusMeta.dot)} />
          {statusMeta.label}
        </span>
      </div>

      <div className="@container relative flex-1 overflow-hidden px-4 py-2">
        {items ? (
          <ul className="divide-y divide-border/60">
            {items.map((item, i) =>
              item.kind === "output" ? (
                toRows([item.session]).map((row) => (
                  <FeedRow className={chainRowClass(row)} key={`output-${row.date}`}>
                    <span className="flex min-w-0 items-baseline gap-2">
                      <OutputEntry row={row} />
                    </span>
                    <TimeAgo date={row.date} responsive />
                  </FeedRow>
                ))
              ) : (
                <FeedRow key={`event-${item.date}-${i.toString()}`}>
                  <EventRow event={item.event} />
                  <TimeAgo date={item.date} responsive />
                </FeedRow>
              ),
            )}
          </ul>
        ) : (
          <ul className="divide-y divide-border/60">
            {Array.from({ length: FEED_ROWS }, (_, i) => i).map((i) => (
              <li className="py-2" key={i}>
                <div className="h-5 w-full animate-pulse rounded bg-muted" style={{ animationDelay: `${i * 80}ms` }} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-3 border-t px-4 py-2.5 text-xs text-muted-foreground">
        <span className="truncate">Latest deliveries and events</span>
        <Link
          className="group flex shrink-0 items-center gap-1 transition-colors hover:text-primary"
          hash="recent-outputs"
          hashScrollIntoView={{ behavior: "instant", block: "start" }}
          to="/data"
        >
          See all
          <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

/** Keyed per delivery, so only rows that just arrived mount — and only those animate. */
const FeedRow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <li className={cn("feed-in relative flex items-baseline justify-between gap-3 py-2 text-sm", className)}>
    {children}
  </li>
);

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
