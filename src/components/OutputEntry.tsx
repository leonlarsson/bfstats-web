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

/** The chain's one-token badge; the sorts and pages behind it live in a tooltip so rows stay on one line. */
const ChainChip = ({ group }: { group: OutputGroup }) => {
  const chip = chainChip(group);
  if (!chip) return null;

  const badge = (
    <span className="ml-1.5 rounded-sm bg-muted px-1.5 py-px font-mono text-[11px] text-muted-foreground">{chip}</span>
  );

  // A lone output only has a story worth telling if it was sorted — its page is already the chip.
  const sorts = group.count > 1 ? group.sorts : group.sorts.filter((sort) => sort.key);
  if (!sorts.length) return badge;

  const span = parseUTCDate(group.date).getTime() - parseUTCDate(group.firstDate).getTime();
  // A lone output's page is already the chip, so there is no depth column to show beside its sort.
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
        {/* One row per sort, in the order applied. Each sort restarts at page 1, so the depth is per sort. */}
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
              {/* Kept as a cell even when empty so the columns stay aligned across rows. */}
              {showDepths && <span className="justify-self-end">{formatDepth(pageDepth(sort))}</span>}
            </Fragment>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
