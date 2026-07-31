import { CircleHelpIcon, SortDescIcon } from "lucide-react";
import { Badge } from "@/components/OutputEntry";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/** Miniature of the rail, so the legend shows the thing rather than describing it. */
const RailGlyph = () => (
  <span className="relative block h-6 w-3">
    <span className="absolute top-1 bottom-1 left-0 w-px bg-primary/30" />
    <span className="absolute top-1 left-px h-px w-2 bg-primary/30" />
    <span className="absolute bottom-1 left-px h-px w-2 bg-primary/30" />
  </span>
);

/** "How do I read this?" for the live feed and the recent activity lists. */
export const ActivityLegend = () => (
  <Popover>
    <PopoverTrigger
      aria-label="How to read this list"
      className="text-muted-foreground transition-colors hover:text-primary"
    >
      <CircleHelpIcon className="size-4" />
    </PopoverTrigger>
    <PopoverContent align="end" className="w-80 space-y-3 text-xs">
      <p className="text-xs font-semibold">Reading this list</p>
      <p className="text-muted-foreground">Every row is one stats response the bot delivered.</p>
      <dl className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 text-muted-foreground">
        <dt className="justify-self-center">
          <RailGlyph />
        </dt>
        <dd>Rows joined by a line came from one command — paged or re-sorted in place, oldest at the top.</dd>

        <dt className="justify-self-center">
          <Badge>×2</Badge>
        </dt>
        <dd>How many responses that segment sent.</dd>

        <dt className="justify-self-center">
          <Badge className="inline-flex items-center">
            <SortDescIcon className="size-3" />
          </Badge>
        </dt>
        <dd>A single response, and the sort it used.</dd>

        <dt className="justify-self-center">
          <Badge>#2</Badge>
        </dt>
        <dd>Which page it was on, otherwise page 1.</dd>
      </dl>
      <p className="text-muted-foreground">Hover a badge for the sorts used and how far they paged.</p>
    </PopoverContent>
  </Popover>
);
