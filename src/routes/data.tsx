import { useQueries } from "@tanstack/react-query";
import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import humanizeDuration from "humanize-duration";
import {
  ActivityIcon,
  CircleHelpIcon,
  HashIcon,
  HomeIcon,
  ImagePlusIcon,
  Link2Icon,
  Link2OffIcon,
  Loader2Icon,
  MinusCircleIcon,
  SendIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";
import type { BaseStats, CountsItem, DBEvent, DBOutput, DBUser, EventDailyItem, SentDailyItemGames } from "types";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { BotCommand } from "@/components/BotCommand";
import { BarChart, EventsPerDayChartWithFilter, StatsSentPerDayChartWithFilter } from "@/components/Charts";
import { CountUp } from "@/components/CountUp";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
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

  const hasScrolledToHashRef = useRef(false);
  useEffect(() => {
    if (isLoading || hasScrolledToHashRef.current) return;
    hasScrolledToHashRef.current = true;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [isLoading]);

  return (
    <div className="container px-4 py-12 lg:px-8">
      <span className="eyebrow mb-4">Command center</span>
      <h1 className="display text-4xl sm:text-6xl">
        Data<span className="text-primary">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Everything here consumes the{" "}
        <a className="link" href="https://api.battlefieldstats.com/" rel="noreferrer" target="_blank">
          public API
        </a>
        . To see your personal usage, run the <BotCommand command="/usage" /> command in Discord — it shows your totals
        grouped by game.
      </p>

      <div className="mt-10">
        {isLoading ? (
          <LoadingText />
        ) : isError ? (
          <ErrorFetchingText />
        ) : (
          <div className="space-y-16">
            <TileRow
              baseStats={baseStatsQuery.data as BaseStats}
              totalUsers={usersCountQuery.data as { totalUsers: number }}
            />

            <section>
              <SectionHeader
                title="All time"
                description="Since May 25, 2021"
                extra={
                  <span>
                    <b className="tabular-nums">
                      {(baseStatsQuery.data as BaseStats).totalStatsSent.total.toLocaleString("en")}
                    </b>{" "}
                    stats sent
                  </span>
                }
              />
              <TotalStats baseStats={baseStatsQuery.data as BaseStats} />
            </section>

            <section>
              <SectionHeader
                title="Extended tracking"
                description="Since January 1, 2023"
                extra={
                  <SinceJanuaryTotals
                    totalUsers={usersCountQuery.data as { totalUsers: number }}
                    outputsCounts={outputsCountsQuery.data as CountsItem[]}
                  />
                }
              />
              <SinceJanuary
                topUsers={usersTopQuery.data as DBUser[]}
                outputsCounts={outputsCountsQuery.data as CountsItem[]}
                outputDailyGames={outputsDailyGamesNoGapsQuery.data as SentDailyItemGames[]}
                eventsDaily={eventsDailyNoGapsQuery.data as EventDailyItem[]}
              />
            </section>

            <section>
              <SectionHeader
                title="Last 7 days"
                description="Rolling week"
                extra={<Last7DaysTotals outputsCounts={outputsCountsLast7DaysQuery.data as CountsItem[]} />}
              />
              <Last7Days outputsCounts={outputsCountsLast7DaysQuery.data as CountsItem[]} />
            </section>

            <section>
              <SectionHeader title="Recent activity" description="Straight from the wire" />
              <div className="grid gap-6 xl:grid-cols-2">
                <StatCard id="recent-outputs" title="Last 20 stats sent">
                  <RecentOutputs outputs={outputsRecentQuery.data as DBOutput[]} />
                </StatCard>
                <StatCard id="recent-events" title="Last 40 events">
                  <RecentEvents events={eventsRecentQuery.data as DBEvent[]} />
                </StatCard>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

const TileRow = ({ baseStats, totalUsers }: { baseStats: BaseStats; totalUsers: { totalUsers: number } }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
    <Tile icon={<SendIcon className="size-4" />} label="Stats sent" value={baseStats.totalStatsSent.total} />
    <Tile icon={<HomeIcon className="size-4" />} label="Servers" value={baseStats.totalGuilds} />
    <Tile icon={<UserIcon className="size-4" />} label="User installs" value={baseStats.totalUserInstalls} />
    <Tile icon={<UsersIcon className="size-4" />} label="Members reached" value={baseStats.totalMembers} />
    <Tile
      icon={<ActivityIcon className="size-4" />}
      label="Unique users"
      value={totalUsers.totalUsers}
      note="since 2023"
    />
  </div>
);

const Tile = ({ icon, label, value, note }: { icon: ReactNode; label: string; value: number; note?: string }) => (
  <div className="panel clip-notch-sm flex flex-col p-4">
    <div className="flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
      <span className="text-primary">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
    <div className="mt-auto flex items-baseline gap-1.5 pt-2">
      <span className="text-2xl font-black tabular-nums lg:text-3xl">
        <CountUp value={value} />
      </span>
      {note && <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">{note}</span>}
    </div>
  </div>
);

const SectionHeader = ({ title, description, extra }: { title: string; description?: string; extra?: ReactNode }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b pb-3">
    <div>
      <h2 className="display text-2xl sm:text-3xl">{title}</h2>
      {description && (
        <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">{description}</div>
      )}
    </div>
    {extra && <div className="text-right text-sm text-muted-foreground">{extra}</div>}
  </div>
);

const TotalStats = ({ baseStats }: { baseStats: BaseStats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <StatCard description="since May 25, 2021" id="all-time-per-game" title="Per game">
        <ScrollArea type="always" className="h-[330px] pr-4">
          <BarChart
            data={Object.entries(baseStats.totalStatsSent.games)
              .map((x) => ({ name: x[0], value: x[1] }))
              .sort((a, b) => b.value - a.value)}
            total={baseStats.totalStatsSent.total}
          />
        </ScrollArea>
      </StatCard>

      <StatCard description="since May 25, 2021" id="all-time-per-language" title="Per language">
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
  );
};

const SinceJanuaryTotals = ({
  totalUsers,
  outputsCounts,
}: {
  totalUsers: { totalUsers: number };
  outputsCounts: CountsItem[];
}) => {
  const totalSent = outputsCounts.filter((x) => x.category === "game").reduce((a, b) => a + b.sent, 0);
  return (
    <div className="flex flex-col">
      <span>
        <b className="tabular-nums">{totalSent.toLocaleString("en")}</b> stats sent
      </span>
      <span>
        <b className="tabular-nums">{totalUsers.totalUsers.toLocaleString("en")}</b> unique users
      </span>
    </div>
  );
};

const SinceJanuary = ({
  topUsers,
  outputsCounts,
  outputDailyGames,
  eventsDaily,
}: {
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StatCard description="since Jan 1, 2023" id="since-2023-per-game" title="Per game">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={games.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>

        <StatCard description="since Jan 1, 2023" id="since-2023-per-segment" title="Per segment">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={segments.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>

        <StatCard description="since Jan 1, 2023" id="since-2023-per-language" title="Per language">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={languages.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>

        <StatCard description="since Jan 1, 2023" id="since-2023-top-users" title="Top users">
          <ScrollArea type="always" className="h-[330px] pr-4">
            <BarChart
              data={topUsers.map((sent, i) => ({ name: `User #${i + 1}`, value: sent.totalStatsSent }))}
              total={totalSent}
            />
          </ScrollArea>
        </StatCard>
      </div>

      <StatCard
        description="stats sent per day, since Jan 1, 2023"
        id="since-2023-activity-heatmap"
        title="Activity heatmap"
      >
        <ActivityHeatmap data={outputDailyGames} />
      </StatCard>

      <StatCard id="since-2023-stats-per-day" title="Stats sent per day">
        <StatsSentPerDayChartWithFilter data={outputDailyGames} />
      </StatCard>

      <StatCard id="since-2023-events-per-day" title="Events per day">
        <EventsPerDayChartWithFilter data={eventsDaily} />
      </StatCard>
    </div>
  );
};

const Last7DaysTotals = ({ outputsCounts }: { outputsCounts: CountsItem[] }) => {
  const totalSent = outputsCounts.filter((x) => x.category === "game").reduce((a, b) => a + b.sent, 0);
  return (
    <span>
      <b className="tabular-nums">{totalSent.toLocaleString("en")}</b> stats sent
    </span>
  );
};

const Last7Days = ({ outputsCounts }: { outputsCounts: CountsItem[] }) => {
  const games = outputsCounts.filter((x) => x.category === "game");
  const segments = outputsCounts.filter((x) => x.category === "segment");
  const languages = outputsCounts.filter((x) => x.category === "language");
  const totalSent = games.reduce((a, b) => a + b.sent, 0);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <StatCard description="last 7 days" id="last-7-days-per-game" title="Per game">
        <ScrollArea type="always" className="h-[330px] pr-4">
          <BarChart
            data={games.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
            total={totalSent}
          />
        </ScrollArea>
      </StatCard>

      <StatCard description="last 7 days" id="last-7-days-per-segment" title="Per segment">
        <ScrollArea type="always" className="h-[330px] pr-4">
          <BarChart
            data={segments.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
            total={totalSent}
          />
        </ScrollArea>
      </StatCard>

      <StatCard
        cardClassName="col-span-full"
        description="last 7 days"
        id="last-7-days-per-language"
        title="Per language"
      >
        <ScrollArea type="always" className="h-[330px] pr-4">
          <BarChart
            data={languages.map((x) => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
            total={totalSent}
          />
        </ScrollArea>
      </StatCard>
    </div>
  );
};

const RecentOutputs = ({ outputs }: { outputs: DBOutput[] }) => {
  return (
    <ScrollArea type="always" className="h-[370px] pr-4">
      <ul className="divide-y divide-border/60">
        {outputs.map((output) => (
          <li key={output.date} className="flex flex-wrap items-baseline justify-between gap-x-3 py-2 text-sm">
            <span className="flex min-w-0 items-baseline gap-2">
              <SendIcon className="size-3.5 shrink-0 translate-y-0.5 text-primary" />
              <span>
                <span className="font-medium">{output.game}</span>{" "}
                <span className="text-muted-foreground">
                  {output.segment} · {output.language}
                </span>
              </span>
            </span>
            <span
              className="shrink-0 font-mono text-xs text-muted-foreground"
              title={parseUTCDate(output.date).toLocaleString()}
            >
              {humanizeDuration(parseUTCDate(output.date).getTime() - Date.now(), {
                round: true,
                units: ["d", "h", "m"],
              })}{" "}
              ago
            </span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

const RecentEvents = ({ events }: { events: DBEvent[] }) => {
  const renderEventTitle = (eventName: DBEvent["event"]) => {
    switch (eventName) {
      case "appGuildInstall":
        return (
          <>
            <HomeIcon className="size-3.5 shrink-0 translate-y-0.5 text-primary" /> Bot was added to a server
          </>
        );
      case "appUserInstall":
        return (
          <>
            <UserIcon className="size-3.5 shrink-0 translate-y-0.5 text-primary" /> Bot was installed to an account
          </>
        );
      case "appGuildUninstall":
        return (
          <>
            <MinusCircleIcon className="size-3.5 shrink-0 translate-y-0.5 text-muted-foreground" /> Bot was removed from
            a server
          </>
        );
      case "appUserUninstall":
        return (
          <>
            <MinusCircleIcon className="size-3.5 shrink-0 translate-y-0.5 text-muted-foreground" /> Bot was removed from
            an account
          </>
        );
      case "bfAccountLink":
        return (
          <>
            <Link2Icon className="size-3.5 shrink-0 translate-y-0.5 text-primary" /> Someone linked their Battlefield
            account
          </>
        );
      case "bfAccountUnlink":
        return (
          <>
            <Link2OffIcon className="size-3.5 shrink-0 translate-y-0.5 text-muted-foreground" /> Someone unlinked their
            Battlefield account
          </>
        );
      case "apiImageGenerated":
        return (
          <>
            <ImagePlusIcon className="size-3.5 shrink-0 translate-y-0.5 text-primary" /> Image generated via API
          </>
        );
      default:
        return (
          <>
            <CircleHelpIcon className="size-3.5 shrink-0 translate-y-0.5 text-muted-foreground" /> Unknown event
            <span className="font-mono text-xs text-muted-foreground">({eventName})</span>
          </>
        );
    }
  };

  return (
    <ScrollArea type="always" className="h-[370px] pr-4">
      <ul className="divide-y divide-border/60">
        {events.map((event) => (
          <li key={event.date} className="flex flex-wrap items-baseline justify-between gap-x-3 py-2 text-sm">
            <span className="flex items-baseline gap-2">{renderEventTitle(event.event)}</span>
            <span
              className="shrink-0 font-mono text-xs text-muted-foreground"
              title={parseUTCDate(event.date).toLocaleString()}
            >
              {humanizeDuration(parseUTCDate(event.date).getTime() - Date.now(), {
                round: true,
                units: ["d", "h", "m"],
              })}{" "}
              ago
            </span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

const LoadingText = () => (
  <div className="panel clip-notch flex items-center gap-3 p-6 font-mono text-sm uppercase tracking-widest text-muted-foreground">
    <Loader2Icon className="size-5 animate-spin text-primary" /> Fetching data... this might take a while.
  </div>
);

const ErrorFetchingText = () => (
  <div className="panel clip-notch border-destructive/50 p-6 font-mono text-sm uppercase tracking-widest text-destructive">
    Error fetching data.
  </div>
);

const StatCard = ({
  id,
  title,
  description,
  cardClassName,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  cardClassName?: string;
  children: ReactNode;
}) => {
  const currentHash = useLocation({ select: (location) => location.hash });
  const isActive = !!id && currentHash === id;

  return (
    <div
      className={cn(
        "panel clip-notch-sm transition-colors",
        id && "scroll-mt-24",
        isActive && "border-primary bg-primary/5",
        cardClassName,
      )}
      id={id}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 border-b px-5 py-3">
        {id ? (
          <Link
            className="group flex items-center gap-1.5 font-bold transition-colors hover:text-primary"
            hash={id}
            hashScrollIntoView={{ behavior: "smooth", block: "start" }}
            replace
            to="/data"
          >
            {title}
            <HashIcon className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ) : (
          <span className="font-bold">{title}</span>
        )}
        {description && (
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{description}</span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};
