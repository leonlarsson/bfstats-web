import { useQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import humanizeDuration from "humanize-duration";
import {
  HomeIcon,
  HouseIcon,
  Link2Icon,
  Link2OffIcon,
  Loader2Icon,
  MinusCircleIcon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { BaseStats, CountsItem, DBEvent, DBOutput, DBUser, EventDailyItem, SentDailyItemGames } from "types";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { BarChart, EventsPerDayChartWithFilter, StatsSentPerDayChartWithFilter } from "@/components/Charts";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  baseStatsQueryOptions,
  eventsDailyNoGapsQueryOptions,
  eventsRecentQueryOptions,
  outputsCountsLast7DaysQueryOptions,
  outputsCountsQueryOptions,
  outputsDailyGamesNoGapsQueryOptions,
  outputsRecentQueryOptions,
  usersCountQueryOptions,
  usersTopQueryOptions,
} from "@/queries";

export const Route = createFileRoute("/data")({
  component: DataComponent,
});

// Fix for mobile
const parseUTCDate = (date: string) => new Date(`${date.replace(" ", "T")}Z`);

function DataComponent() {
  const [
    baseStatsQuery,
    usersCountQuery,
    usersTopQuery,
    outputsCountsQuery,
    outputsDailyGamesNoGapsQuery,
    eventsDailyNoGapsQuery,
    outputsCountsLast7DaysQuery,
    outputsRecentQuery,
    eventsRecentQuery,
  ] = useQueries({
    queries: [
      { ...baseStatsQueryOptions, staleTime: Number.POSITIVE_INFINITY },
      { ...usersCountQueryOptions, staleTime: Number.POSITIVE_INFINITY },
      { ...usersTopQueryOptions, staleTime: Number.POSITIVE_INFINITY },
      { ...outputsCountsQueryOptions, staleTime: Number.POSITIVE_INFINITY },
      { ...outputsDailyGamesNoGapsQueryOptions, staleTime: Number.POSITIVE_INFINITY },
      { ...eventsDailyNoGapsQueryOptions, staleTime: Number.POSITIVE_INFINITY },
      { ...outputsCountsLast7DaysQueryOptions, staleTime: Number.POSITIVE_INFINITY },
      { ...outputsRecentQueryOptions, staleTime: Number.POSITIVE_INFINITY },
      { ...eventsRecentQueryOptions, staleTime: Number.POSITIVE_INFINITY },
    ],
  });

  const queries = [
    baseStatsQuery,
    usersCountQuery,
    usersTopQuery,
    outputsCountsQuery,
    outputsDailyGamesNoGapsQuery,
    eventsDailyNoGapsQuery,
    outputsCountsLast7DaysQuery,
    outputsRecentQuery,
    eventsRecentQuery,
  ];

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => !query.isSuccess);

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
        {isLoading ? (
          <LoadingText />
        ) : isError ? (
          <ErrorFetchingText />
        ) : (
          <>
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
              <InstallCount baseStats={baseStatsQuery.data as BaseStats} />
            </div>

            <hr className="my-6 border-2" />

            <div>
              <h2 className="mb-1 text-2xl font-bold">Total (since May 25, 2021)</h2>
              <TotalStats baseStats={baseStatsQuery.data as BaseStats} />
            </div>

            <hr className="my-6 border-2" />

            <div>
              <h2 className="mb-1 text-2xl font-bold">Since January 1, 2023</h2>
              <SinceJanuary
                totalUsers={usersCountQuery.data as { totalUsers: number }}
                topUsers={usersTopQuery.data as DBUser[]}
                outputsCounts={outputsCountsQuery.data as CountsItem[]}
                outputDailyGames={outputsDailyGamesNoGapsQuery.data as SentDailyItemGames[]}
                eventsDaily={eventsDailyNoGapsQuery.data as EventDailyItem[]}
              />
            </div>

            <hr className="my-6 border-2" />

            <div>
              <h2 className="mb-1 text-2xl font-bold">Last 7 days</h2>
              <Last7Days outputsCounts={outputsCountsLast7DaysQuery.data as CountsItem[]} />
            </div>

            <hr className="my-6 border-2" />

            <div>
              <h2 className="mb-1 text-2xl font-bold">Last 20 stats sent</h2>
              <RecentOutputs outputs={outputsRecentQuery.data as DBOutput[]} />
            </div>

            <hr className="my-6 border-2" />

            <div>
              <h2 className="mb-1 text-2xl font-bold">Last 40 events</h2>
              <RecentEvents events={eventsRecentQuery.data as DBEvent[]} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const InstallCount = ({ baseStats }: { baseStats: BaseStats }) => (
  <div className="flex flex-col tabular-nums">
    <span className="inline-flex items-center gap-2">
      <HouseIcon className="inline size-5" /> {baseStats.totalGuilds.toLocaleString("en")} Servers
    </span>
    <span className="inline-flex items-center gap-2">
      <UserIcon className="inline size-5" /> {baseStats.totalUserInstalls.toLocaleString("en")} User Installs
    </span>
  </div>
);

const TotalStats = ({ baseStats }: { baseStats: BaseStats }) => {
  return (
    <>
      <div className="mb-3">
        <b>{baseStats.totalStatsSent.total.toLocaleString("en")}</b> stats sent
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <StatCard title="Per game" description="since May 25, 2021">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={Object.entries(baseStats.totalStatsSent.games)
                .map((x) => ({ name: x[0], value: x[1] }))
                .sort((a, b) => b.value - a.value)}
              total={baseStats.totalStatsSent.total}
            />
          </ScrollArea>
        </StatCard>

        <StatCard title="Per language" description="since May 25, 2021">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={Object.entries(baseStats.totalStatsSent.languages)
                .map((x) => ({ name: x[0], value: x[1] }))
                .sort((a, b) => b.value - a.value)}
              total={baseStats.totalStatsSent.total}
            />
          </ScrollArea>
        </StatCard>
      </div>
    </>
  );
};

const SinceJanuary = ({
  totalUsers,
  topUsers,
  outputsCounts,
  outputDailyGames,
  eventsDaily,
}: {
  totalUsers: { totalUsers: number };
  topUsers: DBUser[];
  outputsCounts: CountsItem[];
  outputDailyGames: SentDailyItemGames[];
  eventsDaily: EventDailyItem[];
}) => {
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
        <StatCard title="Per game" description="since Jan 1, 2023">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={games.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>

        <StatCard title="Per segment" description="since Jan 1, 2023">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={segments.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>

        <StatCard title="Per language" description="since Jan 1, 2023">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={languages.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>

        <StatCard title="Top users" description="since Jan 1, 2023">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={topUsers.map((sent, i) => ({ name: `User #${i + 1}`, value: sent.totalStatsSent }))}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>
      </div>

      <StatCard title="Activity heatmap" description="stats sent per day, since Jan 1, 2023">
        <ActivityHeatmap data={outputDailyGames} />
      </StatCard>

      <StatCard title="Stats sent per day">
        <StatsSentPerDayChartWithFilter data={outputDailyGames} />
      </StatCard>

      <StatCard title="Events per day">
        <EventsPerDayChartWithFilter data={eventsDaily} />
      </StatCard>
    </div>
  );
};

const Last7Days = ({ outputsCounts }: { outputsCounts: CountsItem[] }) => {
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
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <StatCard title="Per game" description="last 7 days">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={games.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>

        <StatCard title="Per segment" description="last 7 days">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={segments.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>

        <StatCard title="Per language" description="last 7 days" cardClassName="col-span-full">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={languages.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>
      </div>
    </div>
  );
};

const RecentOutputs = ({ outputs }: { outputs: DBOutput[] }) => {
  return (
    <div className="flex flex-col">
      <ScrollArea type="always" className="h-[370px] rounded pr-4">
        {outputs.map((output) => (
          <div
            key={output.date}
            className="flex flex-wrap justify-between rounded p-1 even:bg-neutral-200 dark:even:bg-neutral-900"
          >
            <span className="flex items-center gap-2">
              <SendIcon className="inline size-4" /> {output.game} {output.segment} - {output.language}
            </span>
            <span title={parseUTCDate(output.date).toLocaleString()}>
              {humanizeDuration(parseUTCDate(output.date).getTime() - Date.now(), {
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

const RecentEvents = ({ events }: { events: DBEvent[] }) => {
  const renderEventTitle = (eventName: DBEvent["event"]) => {
    switch (eventName) {
      case "appGuildInstall":
        return (
          <>
            <HomeIcon className="inline size-4" /> Bot was added to a server
          </>
        );
      case "appUserInstall":
        return (
          <>
            <UserIcon className="inline size-4" /> Bot was installed to an account
          </>
        );
      case "appGuildUninstall":
        return (
          <>
            <MinusCircleIcon className="inline size-4" /> Bot was removed from a server
          </>
        );
      case "appUserUninstall":
        return (
          <>
            <MinusCircleIcon className="inline size-4" /> Bot was removed from an account
          </>
        );
      case "bfAccountLink":
        return (
          <>
            <Link2Icon className="inline size-4" /> Someone linked their Battlefield
          </>
        );
      case "bfAccountUnlink":
        return (
          <>
            <Link2OffIcon className="inline size-4" /> Someone unlinked their Battlefield account
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <ScrollArea type="always" className="h-[370px] rounded pr-4">
        {events.map((event) => (
          <div
            key={event.date}
            className="flex flex-wrap justify-between rounded p-1 even:bg-neutral-200 dark:even:bg-neutral-900"
          >
            <span className="flex items-center gap-2">{renderEventTitle(event.event)}</span>
            <span title={parseUTCDate(event.date).toLocaleString()}>
              {humanizeDuration(parseUTCDate(event.date).getTime() - Date.now(), {
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

const StatCard = ({
  title,
  description,
  cardClassName,
  children,
}: {
  title: string;
  description?: string;
  cardClassName?: string;
  children: ReactNode;
}) => (
  <Card className={cardClassName}>
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
