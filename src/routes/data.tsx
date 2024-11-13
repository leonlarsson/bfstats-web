import { BarChart, StatsSentPerDayChartWithFilter } from "@/components/Charts";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueries, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import humanizeDuration from "humanize-duration";
import { Loader2Icon, MinusCircleIcon, PlusCircleIcon, SendIcon } from "lucide-react";
import type { BaseStats, CountsItem, Event, Output, SentDailyItemGames, User } from "types";

export const Route = createFileRoute("/data")({
  component: DataComponent,
});

function DataComponent() {
  return (
    <div>
      <span className="text-3xl font-bold">Data</span>
      <br />
      <span>
        All data displayed here consumes my public API, which can be browsed{" "}
        <a className="link" href="https://api.battlefieldstats.com/" target="_blank" rel="noreferrer">
          here
        </a>
        .
      </span>

      <br />

      <span>
        To view your usage statistics, you can use the /usage command. This will show you the number of times you've
        used the bot, grouped by game.
      </span>

      <br />
      <br />
      <div>
        <div>
          <h2 className="mb-1 text-2xl font-bold">Total (since May 25, 2021)</h2>
          <TotalStats />
        </div>

        <hr className="my-6 border-2" />

        <div>
          <h2 className="mb-1 text-2xl font-bold">Since January 1, 2023</h2>
          <SinceJanuary />
        </div>

        <hr className="my-6 border-2" />

        <div>
          <h2 className="mb-1 text-2xl font-bold">Last 20 stats sent</h2>
          <RecentOutputs />
        </div>

        <hr className="my-6 border-2" />

        <div>
          <h2 className="mb-1 text-2xl font-bold">Last 20 events</h2>
          <RecentEvents />
        </div>
      </div>
    </div>
  );
}

const TotalStats = () => {
  const totalStatsQuery = useQuery({
    queryKey: ["base-data"],
    queryFn: () => fetch("https://api.battlefieldstats.com/base").then((res) => res.json() as unknown as BaseStats),
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (totalStatsQuery.isLoading) return <LoadingText />;
  if (!totalStatsQuery.isSuccess) return <ErrorFetchingText />;

  const baseStats = totalStatsQuery.data;

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
                  .map((x) => ({ name: x[0], value: x[1] }))
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
                  .map((x) => ({ name: x[0], value: x[1] }))
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

const SinceJanuary = () => {
  const [countUsersQuery, topUsersQuery, outputCountsQuery, sentDailyQuery] = useQueries({
    queries: [
      {
        queryKey: ["users-total"],
        queryFn: () =>
          fetch("https://api.battlefieldstats.com/users/count").then(
            (res) => res.json() as unknown as { totalUsers: number },
          ),
        staleTime: Number.POSITIVE_INFINITY,
      },
      {
        queryKey: ["users-top"],
        queryFn: () =>
          fetch("https://api.battlefieldstats.com/users/top").then((res) => res.json() as unknown as User[]),
        staleTime: Number.POSITIVE_INFINITY,
      },
      {
        queryKey: ["outputs-counts"],
        queryFn: () =>
          fetch("https://api.battlefieldstats.com/outputs/counts").then((res) => res.json() as unknown as CountsItem[]),
        staleTime: Number.POSITIVE_INFINITY,
      },
      {
        queryKey: ["outputs-daily-games"],
        queryFn: () =>
          fetch("https://api.battlefieldstats.com/outputs/daily-games-no-gaps").then(
            (res) => res.json() as unknown as SentDailyItemGames[],
          ),
        staleTime: Number.POSITIVE_INFINITY,
      },
    ],
  });

  if (countUsersQuery.isLoading || topUsersQuery.isLoading || outputCountsQuery.isLoading || sentDailyQuery.isLoading)
    return <LoadingText />;
  if (
    !countUsersQuery.isSuccess ||
    !topUsersQuery.isSuccess ||
    !outputCountsQuery.isSuccess ||
    !sentDailyQuery.isSuccess
  )
    return <ErrorFetchingText />;

  const [totalUsers, topUsers, outputsCounts, outputDailyGames] = [
    countUsersQuery.data,
    topUsersQuery.data,
    outputCountsQuery.data,
    sentDailyQuery.data,
  ];

  const games = outputsCounts.filter((x) => x.category === "game");
  const segments = outputsCounts.filter((x) => x.category === "segment");
  const languages = outputsCounts.filter((x) => x.category === "language");
  const totalSent = games.reduce((a, b) => a + b.sent, 0);

  return (
    <div className="space-y-6">
      <div className="mb-3 flex flex-col">
        <span>
          <b>{totalSent.toLocaleString("en")}</b> stats sent
        </span>

        <span>
          <b>{totalUsers.totalUsers.toLocaleString("en")}</b> unique users
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
              <BarChart
                data={games.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
                total={totalSent}
              />
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
              <BarChart
                data={segments.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
                total={totalSent}
              />
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
              <BarChart
                data={languages.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
                total={totalSent}
              />
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
              <BarChart
                data={topUsers.map((sent, i) => ({ name: `User #${i + 1}`, value: sent.totalStatsSent }))}
                total={totalSent}
              />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Stats sent per day</CardTitle>
        </CardHeader>
        <CardContent>
          <StatsSentPerDayChartWithFilter data={outputDailyGames} />
        </CardContent>
      </Card>
    </div>
  );
};

const RecentOutputs = () => {
  const recentOutputsQuery = useQuery({
    queryKey: ["outputs-recent"],
    queryFn: () =>
      fetch("https://api.battlefieldstats.com/outputs/recent").then((res) => res.json() as unknown as Output[]),
    refetchInterval: 30_000,
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (recentOutputsQuery.isLoading) return <LoadingText />;
  if (!recentOutputsQuery.isSuccess) return <ErrorFetchingText />;

  const outputs = recentOutputsQuery.data;

  return (
    <div className="flex flex-col">
      <ScrollArea type="always" className="h-[370px] rounded pr-4">
        {outputs.map((output, i) => (
          <div
            key={`${i}-${output.date}`}
            className="flex flex-wrap justify-between rounded p-1 even:bg-neutral-200 dark:even:bg-neutral-900"
          >
            <span className="flex items-center gap-2">
              <SendIcon className="inline size-4" /> {output.game} {output.segment} - {output.language}
            </span>
            <span title={new Date(`${output.date} UTC`).toLocaleString()}>
              {humanizeDuration(new Date(`${output.date} UTC`).getTime() - new Date().getTime(), {
                round: true,
                units: ["d", "h", "m"],
              })}{" "}
              ago
            </span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

const RecentEvents = () => {
  const recentEventsQuery = useQuery({
    queryKey: ["events-recent"],
    queryFn: () =>
      fetch("https://api.battlefieldstats.com/events/recent").then((res) => res.json() as unknown as Event[]),
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (recentEventsQuery.isLoading) return <LoadingText />;
  if (!recentEventsQuery.isSuccess) return <ErrorFetchingText />;

  const events = recentEventsQuery.data;

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
          <div
            key={`${i}-${event.date}`}
            className="flex flex-wrap justify-between rounded p-1 even:bg-neutral-200 dark:even:bg-neutral-900"
          >
            <span className="flex items-center gap-2">
              {eventToIcon(event.event)} Bot {event.event === "guildCreate" ? "joined" : "left"} a guild
            </span>
            <span title={new Date(`${event.date} UTC`).toLocaleString()}>
              {humanizeDuration(new Date(`${event.date} UTC`).getTime() - new Date().getTime(), {
                round: true,
                units: ["d", "h", "m"],
              })}{" "}
              ago
            </span>
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

const ErrorFetchingText = () => (
  <span className="text-lg font-semibold text-red-600 dark:text-red-500">Error fetching.</span>
);

const APILink = ({ url, title }: { url: string; title: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="group flex items-center gap-1 underline-offset-4 hover:underline"
  >
    <Icons.arrowRight className="inline size-4 transition-transform group-hover:translate-x-1" />
    <span className="hidden font-mono group-hover:inline">{url.split("stats.com")[1]}</span>
    <span className="inline group-hover:hidden">{title}</span>
  </a>
);
