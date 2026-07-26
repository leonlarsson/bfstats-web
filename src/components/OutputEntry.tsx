import humanizeDuration from "humanize-duration";
import { SendIcon, SortAscIcon, SortDescIcon } from "lucide-react";
import { Fragment } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { chainChip, type OutputGroup, pageDepth } from "@/lib/outputs";
import { cn, parseUTCDate } from "@/lib/utils";

const humanizeSpan = humanizeDuration.humanizer({ round: true, largest: 1, units: ["d", "h", "m", "s"] });

const formatDepth = (depth: number) => (depth ? `${depth} page${depth === 1 ? "" : "s"}` : "");

/** Row label for one output group, shared by the live feed and the recent outputs list. */
export const OutputEntry = ({ group }: { group: OutputGroup }) => (
  <>
    <SendIcon className="size-3.5 shrink-0 translate-y-0.5 text-primary" />
    <span className="truncate">
      <span className="font-medium">{group.latest.game}</span>{" "}
      <span className="text-muted-foreground">
        {group.latest.segment} · {group.latest.language}
      </span>
      <ChainChip group={group} />
    </span>
  </>
);

/** The row's badge, with the sorts and pages behind it in a tooltip so rows stay on one line. */
const ChainChip = ({ group }: { group: OutputGroup }) => {
  const chip = chainChip(group);
  if (!chip) return null;

  const badge = (
    <span className="ml-1.5 rounded-sm bg-muted px-1.5 py-px font-mono text-[11px] text-muted-foreground">{chip}</span>
  );

  // A lone output is only worth a tooltip if it was sorted — its page is already the chip.
  const sorts = group.count > 1 ? group.sorts : group.sorts.filter((sort) => sort.key);
  if (!sorts.length) return badge;

  const span = parseUTCDate(group.date).getTime() - parseUTCDate(group.firstDate).getTime();
  const showDepths = group.count > 1;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent className="font-mono text-[11px]">
        {group.count > 1 && (
          <div className="mb-1">
            {group.count} outputs{span >= 1000 && ` over ${humanizeSpan(span)}`}
          </div>
        )}
        {/* One row per sort. Second column only when it has depths — an empty track still costs its gap. */}
        <div className={cn("grid gap-y-0.5 text-muted-foreground", showDepths && "grid-cols-[1fr_auto] gap-x-4")}>
          {sorts.map((sort) => (
            <Fragment key={`${sort.key}-${sort.ascending}`}>
              <span className="flex items-center gap-1.5">
                {sort.key ? (
                  <>
                    {sort.ascending ? <SortAscIcon className="size-3" /> : <SortDescIcon className="size-3" />}
                    {sort.key}
                  </>
                ) : (
                  "unsorted"
                )}
              </span>
              {/* Rendered even when empty so the columns line up. */}
              {showDepths && <span className="justify-self-end">{formatDepth(pageDepth(sort))}</span>}
            </Fragment>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
