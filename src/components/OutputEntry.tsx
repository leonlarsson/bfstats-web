import humanizeDuration from "humanize-duration";
import { SendIcon, SortAscIcon, SortDescIcon } from "lucide-react";
import { type ComponentPropsWithoutRef, Fragment } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { chainChip, type OutputGroup, type OutputRow, pageDepth } from "@/lib/outputs";
import { cn, parseUTCDate } from "@/lib/utils";

const humanizeSpan = humanizeDuration.humanizer({ round: true, largest: 1, units: ["d", "h", "m", "s"] });

const formatDepth = (depth: number) => (depth ? `${depth} page${depth === 1 ? "" : "s"}` : "");

const spanOf = (from: string, to: string) => parseUTCDate(to).getTime() - parseUTCDate(from).getTime();

// Spreads props so TooltipTrigger's `asChild` can hand it the ref and hover handlers.
export const Badge = ({ className, ...props }: ComponentPropsWithoutRef<"span">) => (
  <span
    className={cn("rounded-sm bg-muted px-1.5 py-px font-mono text-[11px] text-muted-foreground", className)}
    {...props}
  />
);

/** One output row, shared by the live feed and the recent outputs list. Needs a `relative` parent. */
export const OutputEntry = ({ row }: { row: OutputRow }) => {
  // Later rows of a session drop the game and language — the rail already says they share a command.
  const continuation = row.chained && !row.first;

  return (
    <>
      <ChainRail row={row} />
      {!continuation && <SendIcon className="size-3.5 shrink-0 translate-y-0.5 text-primary" />}
      <span className="truncate">
        {!continuation && <span className="font-medium">{row.group.latest.game} </span>}
        <span className="text-muted-foreground">
          {row.group.latest.segment}
          {!continuation && ` · ${row.group.latest.language}`}
        </span>
        <ChainChip group={row.group} />
      </span>
    </>
  );
};

/**
 * Ties the rows of one session together as a branch, with a tick into every row.
 * Uses `primary` because `border` is invisible on dark.
 */
const ChainRail = ({ row }: { row: OutputRow }) =>
  row.chained ? (
    <>
      <span
        className={cn(
          "absolute left-0 w-px bg-primary/30",
          row.first && "top-1/2 bottom-0",
          // 1px past centre so the rail itself fills the corner the tick no longer covers.
          row.last && "top-0 bottom-[calc(50%-1px)]",
          !row.first && !row.last && "inset-y-0",
        )}
      />
      {/* Starts right of the rail, not on it — two translucent layers would brighten the shared pixel. */}
      <span className="absolute top-1/2 left-px h-px w-2 bg-primary/30" />
      <span className="w-2.5 shrink-0" />
    </>
  ) : null;

/** Row dividers cut the rail, so drop them inside a chain. */
export const chainRowClass = (row: OutputRow) => cn(row.chained && !row.last && "border-b-0");

/** One segment's badge, with its sorts and page depths in a tooltip. */
const ChainChip = ({ group }: { group: OutputGroup }) => {
  const chip = chainChip(group);
  if (!chip) return null;

  const badge = <Badge className="ml-1.5">{chip}</Badge>;

  // A lone output is only worth a tooltip if it was sorted — its page is already the chip.
  const sorts = group.count > 1 ? group.sorts : group.sorts.filter((sort) => sort.key);
  if (!sorts.length) return badge;

  const span = spanOf(group.firstDate, group.date);
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
