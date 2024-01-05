import { Suspense } from "react";
import Link from "next/link";
import humanizeDuration from "humanize-duration";
import { Loader2Icon, MinusCircleIcon, PlusCircleIcon, SendIcon } from "lucide-react";
import { Title, BarList } from "@tremor/react";
import { StatsSentPerDayChartWithFilter } from "@/components/Charts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BaseStats, Output, CountsItem, UserSpecial, Event, SentDailyItemGames } from "@/types";

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full rounded-lg border p-2">
          <Title>Per game</Title>
          <ScrollArea type="always" className="mt-2 h-[370px] rounded pr-4">
            <BarList
              data={Object.entries(baseStats.totalStatsSent.games)
                .map(x => ({ name: x[0], value: x[1] }))
                .sort((a, b) => b.value - a.value)}
              valueFormatter={(v: number) => (
                <span>
                  {v.toLocaleString("en")} ({new Intl.NumberFormat("en", { style: "percent", maximumFractionDigits: 1 }).format(v / baseStats.totalStatsSent.total)})
                </span>
              )}
            />
          </ScrollArea>
        </div>

        <div className="w-full rounded-lg border p-2">
          <Title>Per language</Title>
          <ScrollArea type="always" className="mt-2 h-[370px] rounded pr-4">
            <BarList
              data={Object.entries(baseStats.totalStatsSent.languages)
                .map(x => ({ name: x[0], value: x[1] }))
                .sort((a, b) => b.value - a.value)}
              valueFormatter={(v: number) => (
                <span>
                  {v.toLocaleString("en")} ({new Intl.NumberFormat("en", { style: "percent", maximumFractionDigits: 1 }).format(v / baseStats.totalStatsSent.total)})
                </span>
              )}
            />
          </ScrollArea>
        </div>
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

      {/* Bar lists */}
      <div className="space-y-4">
        {/* First 2 bar lists */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="w-full rounded-lg border p-2">
            <Title>Per game</Title>
            <ScrollArea type="always" className="mt-2 h-[370px] rounded pr-4">
              <BarList
                data={games.map(x => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
                valueFormatter={(v: number) => (
                  <span>
                    {v.toLocaleString("en")} ({new Intl.NumberFormat("en", { style: "percent", maximumFractionDigits: 1 }).format(v / totalSent)})
                  </span>
                )}
              />
            </ScrollArea>
          </div>

          <div className="w-full rounded-lg border p-2">
            <Title>Per segment</Title>
            <ScrollArea type="always" className="mt-2 h-[370px] rounded pr-4">
              <BarList
                data={segments.map(x => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
                valueFormatter={(v: number) => (
                  <span>
                    {v.toLocaleString("en")} ({new Intl.NumberFormat("en", { style: "percent", maximumFractionDigits: 1 }).format(v / totalSent)})
                  </span>
                )}
              />
            </ScrollArea>
          </div>
        </div>

        {/* Last 2 bar lists */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="w-full rounded-lg border p-2">
            <Title>Per language</Title>
            <ScrollArea type="always" className="mt-2 h-[370px] rounded pr-4">
              <BarList
                data={languages.map(x => ({ name: x.item, value: x.sent })).sort((a, b) => b.value - a.value)}
                valueFormatter={(v: number) => (
                  <span>
                    {v.toLocaleString("en")} ({new Intl.NumberFormat("en", { style: "percent", maximumFractionDigits: 1 }).format(v / totalSent)})
                  </span>
                )}
              />
            </ScrollArea>
          </div>

          <div className="w-full rounded-lg border p-2">
            <Title>Top users</Title>
            <ScrollArea type="always" className="mt-2 h-[370px] rounded pr-4">
              <BarList
                data={users.map((sent, i) => ({ name: `User #${i + 1}`, value: sent.total_stats_sent }))}
                valueFormatter={(v: number) => (
                  <span>
                    {v.toLocaleString("en")} ({new Intl.NumberFormat("en", { style: "percent", maximumFractionDigits: 1 }).format(v / totalSent)})
                  </span>
                )}
              />
            </ScrollArea>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-1 text-lg font-bold">Stats sent per day</h4>
        <StatsSentPerDayChartWithFilter data={sentDaily} />
      </div>
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
              <SendIcon className="size-4 inline" /> {output.game} {output.segment} - {output.language}
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
        return <PlusCircleIcon className="size-4 inline" />;
      case "guildDelete":
        return <MinusCircleIcon className="size-4 inline" />;
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
  <Link href={url} target="_blank" className="link w-fit">
    {title}
  </Link>
);
