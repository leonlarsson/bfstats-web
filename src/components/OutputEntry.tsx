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

/** Branch tying one session's rows together. Uses primary because border is invisible on dark. */
const ChainRail = ({ row }: { row: OutputRow }) =>
  row.chained ? (
    <>
      <span
        className={cn(
          "absolute left-2 w-px bg-primary/30",
          row.first && "top-8 bottom-0",
          // 1px past centre to fill the corner.
          row.last && "top-0 bottom-[calc(50%-1px)]",
          !row.first && !row.last && "inset-y-0",
        )}
      />
      {/* Starts right of the rail so the two translucent layers don't stack. */}
      {!row.first && <span className="absolute top-1/2 left-[9px] h-px w-2 bg-primary/30" />}
    </>
  ) : null;

/** Indents the whole row so wrapped lines clear the rail, and drops the dividers that would cut it. */
export const chainRowClass = (row: OutputRow) =>
  // pl-[22px] would exactly match the first
  cn(row.chained && !row.first && "pl-6", row.chained && !row.last && "border-b-0");

const SortIcon = ({ ascending }: { ascending: boolean }) =>
  ascending ? <SortAscIcon className="size-3" /> : <SortDescIcon className="size-3" />;

/** One segment's badge, with its sorts and page depths in a tooltip. */
const ChainChip = ({ group }: { group: OutputGroup }) => {
  // A lone output is only worth a tooltip if it was sorted. Its page is either the chip or the default.
  const sorts = group.count > 1 ? group.sorts : group.sorts.filter((sort) => sort.key);
  const chip = chainChip(group);
  // Page 1 says nothing, so a single sorted output shows what it was sorted by instead.
  const content = chip ?? (sorts[0] ? <SortIcon ascending={sorts[0].ascending} /> : null);
  if (!content) return null;

  const badge = <Badge className="ml-1.5 inline-flex translate-y-px items-center">{content}</Badge>;
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
        {sorts.some((sort) => sort.key) && <div className="mb-1">Sorted by</div>}
        {/* One row per sort. Second column only when it has depths — an empty track still costs its gap. */}
        <div className={cn("grid gap-y-0.5 text-muted-foreground", showDepths && "grid-cols-[1fr_auto] gap-x-4")}>
          {sorts.map((sort) => (
            <Fragment key={`${sort.key}-${sort.ascending}`}>
              <span className="flex items-center gap-1.5">
                {sort.key ? (
                  <>
                    <SortIcon ascending={sort.ascending} />
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
