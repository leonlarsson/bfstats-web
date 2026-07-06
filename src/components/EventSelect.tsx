import type { DBEvent } from "types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EVENTS } from "@/lib/events";

export const ALL_EVENTS = "All events" as const;
export type EventOrAll = DBEvent["event"] | typeof ALL_EVENTS;

export const EventSelect = ({
  value,
  onValueChange,
  className,
}: {
  value: EventOrAll;
  onValueChange: (value: EventOrAll) => void;
  className?: string;
}) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className={className ?? "w-[250px]"}>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value={ALL_EVENTS}>{ALL_EVENTS}</SelectItem>
        {EVENTS.map((event) => (
          <SelectItem key={event} value={event}>
            {event}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
