import { useQuery } from "@tanstack/react-query";
import humanizeDuration from "humanize-duration";
import { RadioIcon, SendIcon } from "lucide-react";
import { outputsRecentQueryOptions } from "@/queries";

// Fix for mobile
const parseUTCDate = (date: string) => new Date(`${date.replace(" ", "T")}Z`);

const shortAgo = (date: string) =>
  humanizeDuration(parseUTCDate(date).getTime() - Date.now(), {
    round: true,
    largest: 1,
    units: ["d", "h", "m"],
  });

/** Real-time feed of the bot's most recent deliveries, straight from the public API. */
export const LiveFeed = () => {
  const query = useQuery({ ...outputsRecentQueryOptions, refetchInterval: 30_000 });
  const outputs = query.data?.slice(0, 12);

  return (
    <div className="panel clip-notch flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest">
          <RadioIcon className="size-4 text-primary" />
          Live feed
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="size-1.5 animate-blink rounded-full bg-primary" />
          Transmitting
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden px-4 py-2">
        {outputs ? (
          <ul className="divide-y divide-border/60">
            {outputs.map((output) => (
              <li className="flex items-baseline justify-between gap-3 py-2 text-sm" key={output.date}>
                <span className="flex min-w-0 items-baseline gap-2">
                  <SendIcon className="size-3.5 shrink-0 translate-y-0.5 text-primary" />
                  <span className="truncate">
                    <span className="font-medium">{output.game}</span>{" "}
                    <span className="text-muted-foreground">
                      {output.segment} · {output.language}
                    </span>
                  </span>
                </span>
                <span
                  className="shrink-0 font-mono text-xs text-muted-foreground"
                  title={parseUTCDate(output.date).toLocaleString()}
                >
                  {shortAgo(output.date)} ago
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
        Latest stats delivered by the bot
      </div>
    </div>
  );
};
