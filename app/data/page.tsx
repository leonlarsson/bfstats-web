import { Suspense } from "react";
import humanizeDuration from "humanize-duration";
import { StatsSentPerDayChartWithFilter, StatsSentPerGameChart, StatsSentPerGameTotalChart, StatsSentPerLanguageChart, StatsSentPerLanguageTotalChart, StatsSentPerSegmentChart } from "@/components/Charts";
import { Icons } from "@/components/icons";
import type { BaseStats, Output, CountsItem, UserSpecial, Event, SentDailyItemGames } from "@/types";

const pageTitle = "Data | Battlefield Stats Discord Bot";
const pageDescription = "Dive into the usage data for the Battlefield Stats Discord Bot.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    type: "website",
    url: "https://battlefieldstats.com/data",
    title: pageTitle,
    description: pageDescription
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    creator: "@mozzyfx",
    images: "/images/example_bf2042.png"
  }
};

export default () => {
  return (
    <div className="container relative">
      <span className="text-3xl font-bold">Data</span>

      <br />
      <br />

      <div>
        <div>
          <h2 className="text-2xl font-bold">Total (since May 25, 2021)</h2>
          <Suspense fallback={<LoadingText />}>
            <TotalStats />
          </Suspense>
        </div>

        <hr className="my-6 border-2" />

        <div>
          <h2 className="text-2xl font-bold">Since January 1, 2023</h2>
          <Suspense fallback={<LoadingText />}>
            <SinceJanuary />
          </Suspense>
        </div>

        <hr className="my-6 border-2" />

        <div>
          <h2 className="text-2xl font-bold">Last 20 stats sent</h2>
          <Suspense fallback={<LoadingText />}>
            <LastStatsSent />
          </Suspense>
        </div>

        <hr className="my-6 border-2" />

        <div>
          <h2 className="text-2xl font-bold">Last 20 events</h2>
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
        <div className="mb-3">
          <h4 className="text-lg font-bold">Stats sent per game</h4>
          <div className="flex flex-col gap-1 rounded border p-2">
            {Object.entries(baseStats.totalStatsSent.games).map(game => (
              <span key={game[0]}>
                {game[0]}: <strong>{game[1].toLocaleString("en")}</strong> ({((game[1] / baseStats.totalStatsSent.total) * 100).toFixed(1)}%)
                <hr className="my-1" />
              </span>
            ))}

            <StatsSentPerGameTotalChart baseStats={baseStats} />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold">Stats sent per language</h4>
          <div className="flex flex-col gap-1 rounded border p-2">
            {Object.entries(baseStats.totalStatsSent.languages).map(language => (
              <span key={language[0]}>
                {language[0]}: <strong>{language[1].toLocaleString("en-US")}</strong> ({((language[1] / baseStats.totalStatsSent.total) * 100).toFixed(1)}%)
                <hr className="my-1" />
              </span>
            ))}

            <StatsSentPerLanguageTotalChart baseStats={baseStats} />
          </div>
        </div>
      </div>
    </>
  );
};

const SinceJanuary = async () => {
  const [users, data, sentDaily] = (await Promise.all(
    ["https://api.battlefieldstats.com/users/special", "https://api.battlefieldstats.com/outputs/counts", "https://api.battlefieldstats.com/outputs/daily/games"].map(url => fetch(url, { next: { revalidate: 0 } }).then(res => res.ok && res.json()))
  )) as [UserSpecial[], CountsItem[], SentDailyItemGames[]];
  if (!users || !data || !sentDaily) return <ErrorFetchingText />;
  const games = data.filter(x => x.category === "game");
  const segments = data.filter(x => x.category === "segment");
  const languages = data.filter(x => x.category === "language");
  const totalSent = games.reduce((a, b) => a + b.sent, 0);

  return (
    <>
      <div className="mb-3">
        <ul>
          <li>
            <b>{totalSent.toLocaleString("en")}</b> stats sent
          </li>
          <li>
            <b>{users[0].total_users.toLocaleString("en")}</b> unique users
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="mb-3">
          <h4 className="text-lg font-bold">Stats sent per game</h4>
          <div className="flex flex-col gap-1 rounded border p-2">
            {games.map(obj => (
              <span key={obj.item}>
                {obj.item}: <strong>{obj.sent.toLocaleString("en")}</strong> ({((obj.sent / totalSent) * 100).toFixed(1)}%)
                <hr className="my-1" />
              </span>
            ))}

            <StatsSentPerGameChart games={games} />
          </div>
        </div>

        <div className="mb-3">
          <h4 className="text-lg font-bold">Stats sent per segment</h4>
          <div className="flex flex-col gap-1 rounded border p-2">
            {segments.map(obj => (
              <span key={obj.item}>
                {obj.item}: <strong>{obj.sent.toLocaleString("en-US")}</strong> ({((obj.sent / totalSent) * 100).toFixed(1)}%)
                <hr className="my-1" />
              </span>
            ))}

            <StatsSentPerSegmentChart segments={segments} />
          </div>
        </div>

        <div className="mb-3">
          <h4 className="text-lg font-bold">Stats sent per language</h4>
          <div className="flex flex-col gap-1 rounded border p-2">
            {languages.map(obj => (
              <span key={obj.item}>
                {obj.item}: <strong>{obj.sent.toLocaleString("en-US")}</strong> ({((obj.sent / totalSent) * 100).toFixed(1)}%)
                <hr className="my-1" />
              </span>
            ))}

            <StatsSentPerLanguageChart languages={languages} />
          </div>
        </div>

        <div className="mb-3">
          <h4 className="text-lg font-bold">Top users</h4>
          <div className="flex flex-col gap-1 rounded border p-2">
            {users.slice(0, 20).map((user, index) => (
              <span key={index}>
                User was sent <strong>{user.total_stats_sent.toLocaleString("en-US")}</strong> stats
                <hr className="my-1" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold">Stats sent per day</h4>
        <StatsSentPerDayChartWithFilter data={sentDaily} />
      </div>
    </>
  );
};

const LastStatsSent = async () => {
  const res = await fetch("https://api.battlefieldstats.com/outputs/last", { next: { revalidate: 0 } });
  if (!res.ok) return <ErrorFetchingText />;
  const outputs: Output[] = await res.json();
  return (
    <div className="flex flex-col gap-1 rounded border p-2">
      {outputs.map(output => (
        <span key={output.date}>
          <b>
            {output.game} {output.segment}
          </b>{" "}
          - <b>{output.language}</b> // <span title={new Date(output.date).toUTCString()}>{humanizeDuration(output.date - new Date().getTime(), { round: true })} ago</span>
          <hr className="my-1" />
        </span>
      ))}
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
        return <Icons.arrowRight className="mb-1 inline h-5 w-5" />;
      case "guildDelete":
        return <Icons.arrowRight className="mb-1 inline h-5 w-5 rotate-180" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-1 rounded border p-2">
      {events.map(eventObj => (
        <span key={eventObj.date}>
          <b>
            {eventToIcon(eventObj.event)} Bot {eventObj.event === "guildCreate" ? "joined" : "left"} a guild
          </b>{" "}
          // <span title={new Date(eventObj.date).toUTCString()}>{humanizeDuration(eventObj.date - new Date().getTime(), { round: true })} ago</span>
          <hr className="my-1" />
        </span>
      ))}
    </div>
  );
};

const LoadingText = () => (
  <span className="text-xl font-semibold">
    <Icons.spinner className="inline animate-spin" /> Fetching data... This might take a while.
  </span>
);

const ErrorFetchingText = () => <span className="text-lg font-semibold text-red-600 dark:text-red-500">Error fetching.</span>;
