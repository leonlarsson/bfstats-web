import { useState } from "react";
import { Bar, BarChart as BarChartRaw, CartesianGrid, Rectangle, Tooltip, XAxis, YAxis } from "recharts";
import type { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import type { SentDailyItemGames } from "types";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Uses /outputs/daily/games
// TODO: Pad data to include data for all days even if that day has no records
export const StatsSentPerDayChartWithFilter = ({ data }: { data: SentDailyItemGames[] }) => {
  const totalData = data.filter((v, i, a) => a.findIndex((v2) => v2.day === v.day) === i);

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
    setSelectedData(selectValue === "All games" ? totalData : data.filter((x) => x.game === selectValue));
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

      <Select value={selectedGame} onValueChange={(e) => handleGameChange(e)}>
        <SelectTrigger className="mb-5 w-[250px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="All games">All games</SelectItem>
            {[
              "Battlefield 2042",
              "Battlefield V",
              "Battlefield 1",
              "Battlefield Hardline",
              "Battlefield 4",
              "Battlefield 3",
              "Battlefield Bad Company 2",
              "Battlefield 2",
            ].map((game) => (
              <SelectItem key={game} value={game}>
                {game}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <ChartContainer
        className="h-[400px] w-full"
        config={{
          value: {
            label: "Sent",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <BarChartRaw
          data={selectedData.slice(showAll ? 0 : -30).map((x) => ({
            date: new Date(x.day).toLocaleDateString(),
            value: selectedGame === "All games" ? x.total_sent : x.sent,
          }))}
        >
          <XAxis type="category" dataKey="date" />
          <YAxis type="number" tickFormatter={(v) => v.toLocaleString("en")} />
          <CartesianGrid vertical={false} />
          <Tooltip
            content={
              <ChartTooltipContent
                indicator="line"
                labelFormatter={(label, i) => {
                  return (
                    <div className="flex flex-col gap-1">
                      <span>{selectedGame}</span>
                      <span className="font-medium">{label}</span>
                    </div>
                  );
                }}
              />
            }
          />
          <Bar isAnimationActive={false} dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
        </BarChartRaw>
      </ChartContainer>
    </div>
  );
};

type BarChartProps = CategoricalChartProps & { chartConfig?: ChartConfig; total: number };
export const BarChart = (props: BarChartProps) => {
  const barHeight = 32;
  const barGap = 8;

  return (
    <ChartContainer
      config={
        props.chartConfig ?? {
          value: {
            label: "Sent",
            color: "hsl(var(--chart-1))",
          },
        }
      }
      style={{
        // 8 acts as the gap between each bar.
        // Defaulting to prevent 0 (which looks bad?)
        height: props.data!.length * (barHeight + (barGap || 1)),
        aspectRatio: "auto",
      }}
    >
      <BarChartRaw accessibilityLayer layout="vertical" barSize={barHeight} margin={{ left: 0, right: 0 }} {...props}>
        <XAxis dataKey="value" type="number" hide />
        <YAxis dataKey="name" type="category" hide />
        <Bar
          dataKey="value"
          layout="vertical"
          fill="var(--color-value)"
          background={{ radius: 0, fill: "hsl(var(--muted))" }}
          radius={[0, 2, 2, 0]}
          // Thanks shadcn: https://x.com/shadcn/status/1813643935254041045
          // biome-ignore lint/suspicious/noExplicitAny: Jank
          shape={(shapeProps: any) => (
            <>
              {/* Bar */}
              <Rectangle {...shapeProps} />
              {/* Name */}
              <text x={shapeProps.x + 10} y={shapeProps.y + 20} fill="hsl(var(--foreground))">
                {shapeProps.name}
              </text>
              {/* Value */}
              <text
                x={shapeProps.background.width - 10}
                y={shapeProps.y + 20}
                textAnchor="end"
                fill="hsl(var(--foreground))"
              >
                {shapeProps.value.toLocaleString("en")} ({((shapeProps.value / props.total) * 100).toFixed(1)}%)
              </text>
            </>
          )}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
      </BarChartRaw>
    </ChartContainer>
  );
};
