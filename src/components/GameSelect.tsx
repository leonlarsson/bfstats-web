import type { Game } from "types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GAMES } from "@/lib/games";

export const ALL_GAMES = "All games" as const;
export type GameOrAll = Game | typeof ALL_GAMES;

export const GameSelect = ({
  value,
  onValueChange,
  className,
}: {
  value: GameOrAll;
  onValueChange: (value: GameOrAll) => void;
  className?: string;
}) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className={className ?? "w-[250px]"}>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value={ALL_GAMES}>{ALL_GAMES}</SelectItem>
        {GAMES.map((game) => (
          <SelectItem key={game} value={game}>
            {game}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
