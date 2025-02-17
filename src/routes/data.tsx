import { BarChart, StatsSentPerDayChartWithFilter } from "@/components/Charts";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  baseStatsQueryOptions,
  eventsRecentQueryOptions,
  outputsCountsLast7DaysQueryOptions,
  outputsCountsQueryOptions,
  outputsDailyGamesNoGapsQueryOptions,
  outputsRecentQueryOptions,
  usersCountQueryOptions,
  usersTopQueryOptions,
} from "@/queries";
import { useQueries, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import humanizeDuration from "humanize-duration";
import { HouseIcon, Loader2Icon, MinusCircleIcon, PlusCircleIcon, SendIcon, UserIcon } from "lucide-react";

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

      <div className="mt-3">
        <div>
          <h4 className="mb-1 text-lg font-bold">
            <a
              className="inline-flex items-center gap-2 group"
              href="https://discord.com/oauth2/authorize?client_id=842768680252997662"
              rel="noreferrer"
              target="_blank"
            >
              <Icons.discord className="inline size-5 transition-[color,transform] group-hover:text-[#5865F2] group-hover:rotate-12" />{" "}
              Install count
            </a>
          </h4>
          <InstallCount />
        </div>

        <hr className="my-6 border-2" />

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
          <h2 className="mb-1 text-2xl font-bold">Last 7 days</h2>
          <Last7Days />
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

const InstallCount = () => {
  const query = useQuery({
    ...baseStatsQueryOptions,
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (query.isLoading) return <LoadingText />;
  if (!query.isSuccess) return <ErrorFetchingText />;

  return (
    <div className="flex flex-col tabular-nums">
      <span className="inline-flex items-center gap-2">
        <HouseIcon className="inline size-5" /> {query.data.totalGuilds.toLocaleString("en")} Servers
      </span>
      <span className="inline-flex items-center gap-2">
        <UserIcon className="inline size-5" /> {query.data.totalUserInstalls.toLocaleString("en")} User Installs
      </span>
    </div>
  );
};

const TotalStats = () => {
  const totalStatsQuery = useQuery({
    ...baseStatsQueryOptions,
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
        ...usersCountQueryOptions,
        staleTime: Number.POSITIVE_INFINITY,
      },
      {
        ...usersTopQueryOptions,
        staleTime: Number.POSITIVE_INFINITY,
      },
      {
        ...outputsCountsQueryOptions,
        staleTime: Number.POSITIVE_INFINITY,
      },
      {
        ...outputsDailyGamesNoGapsQueryOptions,
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

const Last7Days = () => {
  const query = useQuery({
    ...outputsCountsLast7DaysQueryOptions,
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (query.isLoading) return <LoadingText />;
  if (!query.isSuccess) return <ErrorFetchingText />;

  const games = query.data.filter((x) => x.category === "game");
  const segments = query.data.filter((x) => x.category === "segment");
  const languages = query.data.filter((x) => x.category === "language");
  const totalSent = games.reduce((a, b) => a + b.sent, 0);

  return (
    <div className="space-y-6">
      <div className="mb-3 flex flex-col">
        <span>
          <b>{totalSent.toLocaleString("en")}</b> stats sent
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Per game</CardTitle>
            <CardDescription>last 7 days</CardDescription>
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
            <CardDescription>last 7 days</CardDescription>
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

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="text-xl">Per language</CardTitle>
            <CardDescription>last 7 days</CardDescription>
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
      </div>
    </div>
  );
};

const RecentOutputs = () => {
  const recentOutputsQuery = useQuery({
    ...outputsRecentQueryOptions,
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
    ...eventsRecentQueryOptions,
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
              {eventToIcon(event.event)} Bot was {event.event === "guildCreate" ? "added to" : "removed from"} a server
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
