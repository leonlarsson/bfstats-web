import { BaseStats, Outputs, StatsSentPerGameChart, StatsSentPerGameTotalChart, StatsSentPerLanguageChart, StatsSentPerLanguageTotalChart, StatsSentPerSegmentChart, Users } from "../components/Data/Charts";
import LastSentList from "../components/Data/LastSentList";

const Data = async () => {
    const [baseStats, users, outputs] = await Promise.all(["https://api.battlefieldstats.com/", "https://api.battlefieldstats.com/d1/users", "https://api.battlefieldstats.com/d1/outputs"].map(url => fetch(url, { next: { revalidate: 0 } }).then(res => res.json()))) as [BaseStats, Users, Outputs];

    return (
        <>
            <h1 className="text-decoration-underline">Data</h1>

            <div>
                <h3>Since January 1, 2023</h3>
                <div className="mb-3">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>{outputs.length.toLocaleString("en-US")}</strong> stats sent
                        </li>
                        <li className="list-group-item">
                            <strong>{users.length.toLocaleString("en-US")}</strong> unique users
                        </li>
                    </ul>
                </div>

                <div className="row">
                    <div className="col-lg mb-3">
                        <h4>Stats sent per game</h4>
                        <ul className="list-group">
                            {Array.from(new Set(outputs.map(output => output.game))).map(game => (
                                <li className="list-group-item" key={game}>
                                    {game}: <strong>{outputs.filter(output => output.game === game).length.toLocaleString("en-US")}</strong>
                                    {" "}
                                    ({((outputs.filter(output => output.game === game).length / outputs.length) * 100).toFixed(1)}%)
                                </li>
                            ))}

                            <li className="list-group-item">
                                <StatsSentPerGameChart outputs={outputs} />
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg mb-3">
                        <h4>Stats sent per segment</h4>
                        <ul className="list-group">
                            {Array.from(new Set(outputs.map(output => output.segment))).map(segment => (
                                <li className="list-group-item" key={segment}>
                                    {segment}: <strong>{outputs.filter(output => output.segment === segment).length.toLocaleString("en-US")}</strong>
                                    {" "}
                                    ({((outputs.filter(output => output.segment === segment).length / outputs.length) * 100).toFixed(1)}%)
                                </li>
                            ))}

                            <li className="list-group-item">
                                <StatsSentPerSegmentChart outputs={outputs} />
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg mb-3">
                        <h4>Stats sent per language</h4>
                        <ul className="list-group">
                            {Array.from(new Set(outputs.map(output => output.language))).map(language => (
                                <li className="list-group-item" key={language}>
                                    {language}: <strong>{outputs.filter(output => output.language === language).length.toLocaleString("en-US")}</strong>
                                    {" "}
                                    ({((outputs.filter(output => output.language === language).length / outputs.length) * 100).toFixed(1)}%)
                                </li>
                            ))}

                            <li className="list-group-item">
                                <StatsSentPerLanguageChart outputs={outputs} />
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

                <hr className="border border-primary border-2 opacity-75 rounded" />

                <h3>Total</h3>
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

                <hr className="border border-primary border-2 opacity-75 rounded" />

                <h3>Last stats sent</h3>
                <LastSentList outputs={outputs} />
            </div>
        </>
    );
};

export default Data;
