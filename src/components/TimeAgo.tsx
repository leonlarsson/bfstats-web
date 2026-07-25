import humanizeDuration from "humanize-duration";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, parseUTCDate } from "@/lib/utils";

const AGO_OPTIONS: humanizeDuration.Options = { round: true, largest: 1, units: ["d", "h", "m"] };

const longAgo = humanizeDuration.humanizer(AGO_OPTIONS);

// Same value with single-letter units ("4m"), for narrow containers where "4 minutes ago" pushes the row.
const compactAgo = humanizeDuration.humanizer({
  ...AGO_OPTIONS,
  spacer: "",
  language: "shortEn",
  languages: { shortEn: { d: () => "d", h: () => "h", m: () => "m" } },
});

/**
 * Relative timestamp. With `responsive`, the nearest `@container` ancestor decides the form —
 * below 24rem it renders "4m" instead of "4 minutes ago". Only worth it in rows that stay on one
 * line; where the row wraps, the timestamp gets a line of its own and the long form reads better.
 */
export const TimeAgo = ({ date, responsive = false }: { date: string; responsive?: boolean }) => {
  const parsed = parseUTCDate(date);
  const elapsed = parsed.getTime() - Date.now();

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <span className="shrink-0 font-mono text-xs text-muted-foreground">
          {responsive && <span className="@[24rem]:hidden">{compactAgo(elapsed)}</span>}
          <span className={cn(responsive && "hidden @[24rem]:inline")}>{longAgo(elapsed)} ago</span>
        </span>
      </TooltipTrigger>
      <TooltipContent className="font-mono text-[11px]">{parsed.toLocaleString()}</TooltipContent>
    </Tooltip>
  );
};
