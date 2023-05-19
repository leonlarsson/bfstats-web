import { Suspense } from "react";
import { StatsSentPerGameChart, StatsSentPerGameTotalChart, StatsSentPerLanguageChart, StatsSentPerLanguageTotalChart, StatsSentPerSegmentChart } from "../components/Data/Charts";
import LastSentList from "../components/Data/LastSentList";
import type { BaseStats, Output, CountsItem, UserSpecial } from "@/types";

const pageTitle = "Data | Battlefield Stats Discord Bot";
const pageDescription = "Usage data for the Battlefield Stats Discord Bot.";

export const metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        type: "website",
        url: "https://battlefieldstats.com/data",
        title: pageTitle,
        description: pageDescription,
        images: {
            url: "/images/example_bf2042.png",
            width: 1200,
            height: 750
        }
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
        <>
            <h1 className="text-decoration-underline">Data</h1>

            <div>
                <h3>Total (since May 25, 2021)</h3>
                <Suspense fallback={<h4 className="mb-5"><i className="fa-solid fa-spinner fa-spin" /> Fetching data...</h4>}>
                    {/* @ts-expect-error */}
                    <TotalStats />
                </Suspense>

                <hr className="border border-primary border-2 opacity-75 rounded" />

                <h3>Since January 1, 2023</h3>
                <Suspense fallback={<h4 className="mb-5"><i className="fa-solid fa-spinner fa-spin" /> Fetching data... This might take a while.</h4>}>
                    {/* @ts-expect-error */}
                    <SinceJanuary />
                </Suspense>

                <hr className="border border-primary border-2 opacity-75 rounded" />

                <h3>Last 20 stats sent</h3>
                <Suspense fallback={<h4 className="mb-5"><i className="fa-solid fa-spinner fa-spin" /> Fetching data... This might take a while.</h4>}>
                    {/* @ts-expect-error */}
                    <LastStatsSent />
                </Suspense>
            </div>
        </>
    );
};

const TotalStats = async () => {
    const res = await fetch("https://api.battlefieldstats.com", { next: { revalidate: 0 } });
    const baseStats: BaseStats = await res.json();

    return (
        <>
            <div className="mb-3">
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>{baseStats.totalStatsSent.total.toLocaleString("en-US")}</strong> stats sent
                    </li>
                </ul>
            </div>

            <div className="row">
                <div className="col-lg mb-3">
                    <h4>Stats sent per game</h4>
                    <ul className="list-group">
                        {Object.entries(baseStats.totalStatsSent.games).map(game => (
                            <li className="list-group-item" key={game[0]}>
                                {game[0]}: <strong>{game[1].toLocaleString("en-US")}</strong> ({((game[1] / baseStats.totalStatsSent.total) * 100).toFixed(1)}%)
                            </li>
                        ))}

                        <li className="list-group-item">
                            <StatsSentPerGameTotalChart baseStats={baseStats} />
                        </li>
                    </ul>
                </div>

                <div className="col-lg mb-3">
                    <h4>Stats sent per language</h4>
                    <ul className="list-group">
                        {Object.entries(baseStats.totalStatsSent.languages).map(language => (
                            <li className="list-group-item" key={language[0]}>
                                {language[0]}: <strong>{language[1].toLocaleString("en-US")}</strong> ({((language[1] / baseStats.totalStatsSent.total) * 100).toFixed(1)}%)
                            </li>
                        ))}

                        <li className="list-group-item">
                            <StatsSentPerLanguageTotalChart baseStats={baseStats} />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

const SinceJanuary = async () => {
    const [users, data] = await Promise.all(["https://api.battlefieldstats.com/d1/users/special", "https://api.battlefieldstats.com/d1/outputs/counts"].map(url => fetch(url, { next: { revalidate: 0 } }).then(res => res.ok && res.json()))) as [UserSpecial[], CountsItem[]];
    if (!users || !data) return <h5 className="text-danger">Error fetching.</h5>;
    const games = data.filter(x => x.category === "game");
    const segments = data.filter(x => x.category === "segment");
    const languages = data.filter(x => x.category === "language");
    const totalSent = games.reduce((a, b) => a + b.sent, 0);

    return (
        <>
            <div className="mb-3">
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>{totalSent.toLocaleString("en-US")}</strong> stats sent
                    </li>
                    <li className="list-group-item">
                        <strong>{users[0].total_users.toLocaleString("en-US")}</strong> unique users
                    </li>
                </ul>
            </div>

            <div className="row">
                <div className="col-lg mb-3">
                    <h4>Stats sent per game</h4>
                    <ul className="list-group">
                        {games.map(obj => (
                            <li className="list-group-item" key={obj.item}>
                                {obj.item}: <strong>{obj.sent.toLocaleString("en-US")}</strong>
                                {" "}
                                ({((obj.sent / totalSent) * 100).toFixed(1)}%)
                            </li>
                        ))}

                        <li className="list-group-item">
                            <StatsSentPerGameChart games={games} />
                        </li>
                    </ul>
                </div>

                <div className="col-lg mb-3">
                    <h4>Stats sent per segment</h4>
                    <ul className="list-group">
                        {segments.map(obj => (
                            <li className="list-group-item" key={obj.item}>
                                {obj.item}: <strong>{obj.sent.toLocaleString("en-US")}</strong>
                                {" "}
                                ({((obj.sent / totalSent) * 100).toFixed(1)}%)
                            </li>
                        ))}

                        <li className="list-group-item">
                            <StatsSentPerSegmentChart segments={segments} />
                        </li>
                    </ul>
                </div>

                <div className="col-lg mb-3">
                    <h4>Stats sent per language</h4>
                    <ul className="list-group">
                        {languages.map(obj => (
                            <li className="list-group-item" key={obj.item}>
                                {obj.item}: <strong>{obj.sent.toLocaleString("en-US")}</strong>
                                {" "}
                                ({((obj.sent / totalSent) * 100).toFixed(1)}%)
                            </li>
                        ))}

                        <li className="list-group-item">
                            <StatsSentPerLanguageChart languages={languages} />
                        </li>
                    </ul>
                </div>

                <div className="col-lg">
                    <h4>Top users</h4>
                    <ol className="list-group list-group-numbered">
                        {users.slice(0, 20).map((user, index) => (
                            <li className="list-group-item" key={index}>
                                User was sent <strong>{user.total_stats_sent.toLocaleString("en-US")}</strong> stats
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
};

const LastStatsSent = async () => {
    const res = await fetch("https://api.battlefieldstats.com/d1/outputs/limited", { next: { revalidate: 0 } });
    const outputs: Output[] = await res.json();
    return <LastSentList outputs={outputs} />;
};