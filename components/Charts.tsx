"use client";

import { useState } from "react";
import { BarChart } from "@tremor/react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { SentDailyItemGames } from "@/types";

// Uses /outputs/daily/games
// TODO: Pad data to include data for all days even if that day has no records
export const StatsSentPerDayChartWithFilter = ({ data }: { data: SentDailyItemGames[] }) => {
  const totalData = data.filter((v, i, a) => a.findIndex(v2 => v2.day === v.day) === i);

  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState("All games");
  const [selectedData, setSelectedData] = useState(totalData);

  // On select change:
  // If the selection is All games, show all
  // Set selected game
  // Set selected data:
  // If All games, get each day.
  // If not All games, get selected data from that game
  const handleGameChange = (selectValue: string) => {
    if (selectValue !== "All games") setShowAll(true);
    setSelectedGame(selectValue);
    setSelectedData(selectValue === "All games" ? totalData : data.filter(x => x.game === selectValue));
  };

  return (
    <div>
      <RadioGroup className="mb-2" defaultValue={showAll ? "all" : "30points"} value={showAll ? "all" : "30points"}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="r1" value="all" onClick={() => setShowAll(true)} />
          <Label htmlFor="r1">Since Jan 1st, 2023</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            id="r2"
            value="30points"
            onClick={() => {
              setShowAll(false);
              handleGameChange("All games");
            }}
          />
          <Label htmlFor="r2">Last 30 points</Label>
        </div>
      </RadioGroup>

      <Select value={selectedGame} onValueChange={e => handleGameChange(e)}>
        <SelectTrigger className="w-[250px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="All games">All games</SelectItem>
            {["Battlefield 2042", "Battlefield V", "Battlefield 1", "Battlefield Hardline", "Battlefield 4", "Battlefield 3", "Battlefield Bad Company 2", "Battlefield 2"].map(game => (
              <SelectItem key={game} value={game}>
                {game}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <BarChart
        key={selectedGame}
        data={selectedData.slice(showAll ? 0 : -30).map(x => ({ date: new Date(x.day).toLocaleDateString(), Sent: selectedGame === "All games" ? x.total_sent : x.sent }))}
        index="date"
        allowDecimals={false}
        categories={["Sent"]}
        valueFormatter={v => v.toLocaleString("en")}
        customTooltip={({ label, payload }) => (
          <div className="flex flex-col gap-1 rounded-lg border bg-white p-2 text-sm dark:bg-black">
            <span>{selectedGame}</span>
            <span className="font-medium">{label}</span>
            <hr />
            <span>{payload?.[0]?.value ?? 0} stats sent</span>
          </div>
        )}
      />
    </div>
  );
};
