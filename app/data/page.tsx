import { Suspense } from "react";
import Link from "next/link";
import humanizeDuration from "humanize-duration";
import { Loader2Icon, MinusCircleIcon, PlusCircleIcon, SendIcon } from "lucide-react";
import { BarChart, StatsSentPerDayChartWithFilter } from "@/components/Charts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Icons } from "@/components/icons";
import type { BaseStats, Output, CountsItem, UserSpecial, Event, SentDailyItemGames } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata = {
  title: "Data | Battlefield Stats Discord Bot",
  description: "Dive into the usage data for the Battlefield Stats Discord Bot.",
};

export default () => {
  return (
    <div>
      <span className="text-3xl font-bold">Data</span>
      <br />
      <span>
        All data displayed here consumes my public APIs. All APIs can be seen{" "}
        <Popover>
          <PopoverTrigger asChild>
            <span className="link cursor-pointer">here</span>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col">
            <APILink url="https://api.battlefieldstats.com/base" title="Base" />
            <APILink url="https://api.battlefieldstats.com/users/top" title="Users (top 20)" />
            <APILink url="https://api.battlefieldstats.com/users/counts" title="Users (total)" />
            <APILink url="https://api.battlefieldstats.com/users/special" title="Users (top 20 + total)" />
            <APILink url="https://api.battlefieldstats.com/outputs/counts" title="Outputs (counts)" />
            <APILink url="https://api.battlefieldstats.com/outputs/last" title="Outputs (last 20)" />
            <APILink url="https://api.battlefieldstats.com/outputs/daily" title="Outputs (per day)" />
            <APILink url="https://api.battlefieldstats.com/outputs/daily/games" title="Outputs (per day, per game)" />
            <APILink url="https://api.battlefieldstats.com/outputs/FECbLioP" title="Output by identifier" />
            <APILink url="https://api.battlefieldstats.com/events/last" title="Events (last 20)" />
          </PopoverContent>
        </Popover>
        .
      </span>

      <br />

      <span>To view your usage statistics, you can use the /usage command. This will show you the number of times you've used the bot, grouped by game.</span>

      <br />
      <br />
      <div>
        <div>
          <h2 className="mb-1 text-2xl font-bold">Total (since May 25, 2021)</h2>
          <Suspense fallback={<LoadingText />}>
            <TotalStats />
          </Suspense>
        </div>

        <hr className="my-6 border-2" />

        <div>
          <h2 className="mb-1 text-2xl font-bold">Since January 1, 2023</h2>
          <Suspense fallback={<LoadingText />}>
            <SinceJanuary />
          </Suspense>
        </div>

        <hr className="my-6 border-2" />

        <div>
          <h2 className="mb-1 text-2xl font-bold">Last 20 stats sent</h2>
          <Suspense fallback={<LoadingText />}>
            <LastStatsSent />
          </Suspense>
        </div>

        <hr className="my-6 border-2" />

        <div>
          <h2 className="mb-1 text-2xl font-bold">Last 20 events</h2>
          <Suspense fallback={<LoadingText />}>
            <LastEvents />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const TotalStats = async () => {
  const res = await fetch("https://api.battlefieldstats.com/base", { next: { revalidate: 0 } });
  if (!res.ok) return <ErrorFetchingText />;
  const baseStats: BaseStats = await res.json();

  return (
    <>
      <div className="mb-3">
        <b>{baseStats.totalStatsSent.total.toLocaleString("en")}</b> stats sent
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Per game</CardTitle>
            <CardDescription>since May 25, 2021</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea type="always" className="h-[330px] pr-4">
              <BarChart
                data={Object.entries(baseStats.totalStatsSent.games)
                  .map(x => ({ name: x[0], value: x[1] }))
                  .sort((a, b) => b.value - a.value)}
                total={baseStats.totalStatsSent.total}
              />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Per language</CardTitle>
            <CardDescription>since May 25, 2021</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea type="always" className="h-[330px] pr-4">
              <BarChart
                data={Object.entries(baseStats.totalStatsSent.languages)
                  .map(x => ({ name: x[0], value: x[1] }))
                  .sort((a, b) => b.value - a.value)}
                total={baseStats.totalStatsSent.total}
              />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const SinceJanuary = async () => {
  const [users, data, sentDaily] = (await Promise.all(
    ["https://api.battlefieldstats.com/users/special", "https://api.battlefieldstats.com/outputs/counts", "https://api.battlefieldstats.com/outputs/daily/games"].map(url => fetch(url, { next: { revalidate: 0 } }).then(res => res.ok && res.json())),
  )) as [UserSpecial[], CountsItem[], SentDailyItemGames[]];
  if (!users || !data || !sentDaily) return <ErrorFetchingText />;
  const games = data.filter(x => x.category === "game");
  const segments = data.filter(x => x.category === "segment");
  const languages = data.filter(x => x.category === "language");
  const totalSent = games.reduce((a, b) => a + b.sent, 0);

  return (
    <div className="space-y-6">
      <div className="mb-3 flex flex-col">
        <span>
          <b>{totalSent.toLocaleString("en")}</b> stats sent
        </span>

        <span>
          <b>{users[0].total_users.toLocaleString("en")}</b> unique users
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Per game</CardTitle>
            <CardDescription>since Jan 1, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea type="always" className="h-[330px] pr-4">
              <BarChart data={games.map(x => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)} total={totalSent} />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Per segment</CardTitle>
            <CardDescription>since Jan 1, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea type="always" className="h-[330px] pr-4">
              <BarChart data={segments.map(x => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)} total={totalSent} />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Per language</CardTitle>
            <CardDescription>since Jan 1, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea type="always" className="h-[330px] pr-4">
              <BarChart data={languages.map(x => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)} total={totalSent} />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Top users</CardTitle>
            <CardDescription>since Jan 1, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea type="always" className="h-[330px] pr-4">
              <BarChart data={users.map((sent, i) => ({ name: `User #${i + 1}`, value: sent.total_stats_sent }))} total={totalSent} />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Stats sent per day</CardTitle>
        </CardHeader>
        <CardContent>
          <StatsSentPerDayChartWithFilter data={sentDaily} />
        </CardContent>
      </Card>
    </div>
  );
};

const LastStatsSent = async () => {
  const res = await fetch("https://api.battlefieldstats.com/outputs/last", { next: { revalidate: 0 } });
  if (!res.ok) return <ErrorFetchingText />;
  const outputs: Output[] = await res.json();
  return (
    <div className="flex flex-col">
      <ScrollArea type="always" className="h-[370px] rounded pr-4">
        {outputs.map((output, i) => (
          <div key={i} className="flex flex-wrap justify-between rounded p-1 even:bg-neutral-200 dark:even:bg-neutral-900">
            <span className="flex items-center gap-2">
              <SendIcon className="inline size-4" /> {output.game} {output.segment} - {output.language}
            </span>
            <span title={new Date(output.date).toUTCString()}>{humanizeDuration(output.date - new Date().getTime(), { round: true, units: ["d", "h", "m"] })} ago</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

const LastEvents = async () => {
  const res = await fetch("https://api.battlefieldstats.com/events/last", { next: { revalidate: 0 } });
  if (!res.ok) return <ErrorFetchingText />;
  const events: Event[] = await res.json();

  const eventToIcon = (eventName: string) => {
    switch (eventName) {
      case "guildCreate":
        return <PlusCircleIcon className="inline size-4" />;
      case "guildDelete":
        return <MinusCircleIcon className="inline size-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <ScrollArea type="always" className="h-[370px] rounded pr-4">
        {events.map((event, i) => (
          <div key={i} className="flex flex-wrap justify-between rounded p-1 even:bg-neutral-200 dark:even:bg-neutral-900">
            <span className="flex items-center gap-2">
              {eventToIcon(event.event)} Bot {event.event === "guildCreate" ? "joined" : "left"} a guild
            </span>
            <span title={new Date(event.date).toUTCString()}>{humanizeDuration(event.date - new Date().getTime(), { round: true, units: ["d", "h", "m"] })} ago</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

const LoadingText = () => (
  <span className="flex items-center gap-2 text-xl font-semibold">
    <Loader2Icon className="inline animate-spin" /> Fetching data... This might take a while.
  </span>
);

const ErrorFetchingText = () => <span className="text-lg font-semibold text-red-600 dark:text-red-500">Error fetching.</span>;

const APILink = ({ url, title }: { url: string; title: string }) => (
  <Link href={url} target="_blank" className="group flex items-center gap-1 underline-offset-4 hover:underline">
    <Icons.arrowRight className="inline size-4 transition-transform group-hover:translate-x-1" />
    <span className="hidden font-mono group-hover:inline">{url.split("stats.com")[1]}</span>
    <span className="inline group-hover:hidden">{title}</span>
  </Link>
);
