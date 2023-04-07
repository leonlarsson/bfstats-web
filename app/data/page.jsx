"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import humanizeDuration from "humanize-duration";

ChartJS.register(ArcElement, Tooltip, Legend);

const Data = () => {
    const [showAllOutputs, setShowAllOutputs] = useState(false);
    const [baseStats, setBaseStats] = useState(null);
    const [users, setUsers] = useState(null);
    const [outputs, setOutputs] = useState(null);

    useEffect(() => {
        Promise.all(["https://api.battlefieldstats.com/", "https://api.battlefieldstats.com/d1/users", "https://api.battlefieldstats.com/d1/outputs",].map(url => fetch(url).then(res => res.json())))
            .then(results => {
                setBaseStats(results[0]);
                setUsers(results[1]);
                setOutputs(results[2]);
            });
    }, []);

    return (
        <>
            <h1 className="text-decoration-underline">Data</h1>

            {baseStats && users && outputs ? (
                <div>
                    <h3>Since January 1, 2023</h3>
                    <div className="mb-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>{outputs.length.toLocaleString("en-US")}</strong> stats
                                sent
                            </li>
                            <li className="list-group-item">
                                <strong>{users.length.toLocaleString("en-US")}</strong> unique
                                users
                            </li>
                        </ul>
                    </div>

                    <div className="row">
                        <div className="col-lg mb-3">
                            <h4>Stats sent per game</h4>
                            <ul className="list-group">
                                {Array.from(new Set(outputs.map((output) => output.game))).map(
                                    (game, index) => (
                                        <li className="list-group-item" key={index}>
                                            {game}:{" "}
                                            <strong>
                                                {outputs
                                                    .filter((output) => output.game === game)
                                                    .length.toLocaleString("en-US")}
                                            </strong>{" "}
                                            (
                                            {(
                                                (outputs.filter((output) => output.game === game)
                                                    .length /
                                                    outputs.length) *
                                                100
                                            ).toFixed(1)}
                                            %)
                                        </li>
                                    )
                                )}
                                <li className="list-group-item">
                                    <Doughnut
                                        data={{
                                            labels: Array.from(new Set(outputs.map((x) => x.game))),
                                            datasets: [
                                                {
                                                    label: " # of stats sent",
                                                    data: Array.from(
                                                        new Set(outputs.map((output) => output.game))
                                                    ).map(
                                                        (game) =>
                                                            outputs.filter((output) => output.game === game)
                                                                .length
                                                    ),
                                                    backgroundColor: [
                                                        "#f59b71",
                                                        "#60ff78",
                                                        "#f0e0fb",
                                                        "#cfe2f3",
                                                        "#655925",
                                                        "#85754e",
                                                        "#cd9b1d",
                                                        "#301e4b",
                                                        "#75758f",
                                                        "#416788",
                                                        "#c0c066",
                                                        "#6666c0",
                                                        "#333366",
                                                        "#445577",
                                                        "#883399",
                                                        "#daccad",
                                                        "#accec0",
                                                        "#3c2c7d",
                                                        "#ff800c",
                                                        "#ad9a9d",
                                                    ],
                                                    hoverOffset: 7,
                                                },
                                            ],
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg mb-3">
                            <h4>Stats sent per segment</h4>
                            <ul className="list-group">
                                {Array.from(
                                    new Set(outputs.map((output) => output.segment))
                                ).map((segment, index) => (
                                    <li className="list-group-item" key={index}>
                                        {segment}:{" "}
                                        <strong>
                                            {outputs
                                                .filter((output) => output.segment === segment)
                                                .length.toLocaleString("en-US")}
                                        </strong>{" "}
                                        (
                                        {(
                                            (outputs.filter((output) => output.segment === segment)
                                                .length /
                                                outputs.length) *
                                            100
                                        ).toFixed(1)}
                                        %)
                                    </li>
                                ))}
                                <li className="list-group-item">
                                    <Doughnut
                                        data={{
                                            labels: Array.from(
                                                new Set(outputs.map((output) => output.segment))
                                            ),
                                            datasets: [
                                                {
                                                    label: " # of stats sent",
                                                    data: Array.from(
                                                        new Set(outputs.map((output) => output.segment))
                                                    ).map(
                                                        (segment) =>
                                                            outputs.filter(
                                                                (output) => output.segment === segment
                                                            ).length
                                                    ),
                                                    backgroundColor: [
                                                        "#f59b71",
                                                        "#60ff78",
                                                        "#f0e0fb",
                                                        "#cfe2f3",
                                                        "#655925",
                                                        "#85754e",
                                                        "#cd9b1d",
                                                        "#301e4b",
                                                        "#75758f",
                                                        "#416788",
                                                        "#c0c066",
                                                        "#6666c0",
                                                        "#333366",
                                                        "#445577",
                                                        "#883399",
                                                        "#daccad",
                                                        "#accec0",
                                                        "#3c2c7d",
                                                        "#ff800c",
                                                        "#ad9a9d",
                                                    ],
                                                    hoverOffset: 7,
                                                },
                                            ],
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg mb-3">
                            <h4>Stats sent per language</h4>
                            <ul className="list-group">
                                {Array.from(
                                    new Set(outputs.map((output) => output.language))
                                ).map((language, index) => (
                                    <li className="list-group-item" key={index}>
                                        {language}:{" "}
                                        <strong>
                                            {outputs
                                                .filter((output) => output.language === language)
                                                .length.toLocaleString("en-US")}
                                        </strong>{" "}
                                        (
                                        {(
                                            (outputs.filter((output) => output.language === language)
                                                .length /
                                                outputs.length) *
                                            100
                                        ).toFixed(1)}
                                        %)
                                    </li>
                                ))}
                                <li className="list-group-item">
                                    <Doughnut
                                        data={{
                                            labels: Array.from(
                                                new Set(outputs.map((output) => output.language))
                                            ),
                                            datasets: [
                                                {
                                                    label: " # of stats sent",
                                                    data: Array.from(
                                                        new Set(outputs.map((output) => output.language))
                                                    ).map(
                                                        (language) =>
                                                            outputs.filter(
                                                                (output) => output.language === language
                                                            ).length
                                                    ),
                                                    backgroundColor: [
                                                        "#f59b71",
                                                        "#60ff78",
                                                        "#f0e0fb",
                                                        "#cfe2f3",
                                                        "#655925",
                                                        "#85754e",
                                                        "#cd9b1d",
                                                        "#301e4b",
                                                        "#75758f",
                                                        "#416788",
                                                        "#c0c066",
                                                        "#6666c0",
                                                        "#333366",
                                                        "#445577",
                                                        "#883399",
                                                        "#daccad",
                                                        "#accec0",
                                                        "#3c2c7d",
                                                        "#ff800c",
                                                        "#ad9a9d",
                                                    ],
                                                    hoverOffset: 7,
                                                },
                                            ],
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg">
                            <h4>Top users</h4>
                            <ol className="list-group list-group-numbered">
                                {users.slice(0, 20).map((user, index) => (
                                    <li className="list-group-item" key={index}>
                                        User was sent{" "}
                                        <strong>
                                            {user.total_stats_sent.toLocaleString("en-US")}
                                        </strong>{" "}
                                        stats
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
                                <strong>
                                    {baseStats.totalStatsSent.total.toLocaleString("en-US")}
                                </strong>{" "}
                                stats sent
                            </li>
                        </ul>
                    </div>

                    <div className="row">
                        <div className="col-lg mb-3">
                            <h4>Stats sent per game</h4>
                            <ul className="list-group">
                                {Object.entries(baseStats.totalStatsSent.games).map(
                                    (game, index) => (
                                        <li className="list-group-item" key={index}>
                                            {game[0]}:{" "}
                                            <strong>{game[1].toLocaleString("en-US")}</strong> (
                                            {(
                                                (game[1] / baseStats.totalStatsSent.total) *
                                                100
                                            ).toFixed(1)}
                                            %)
                                        </li>
                                    )
                                )}
                                <li className="list-group-item">
                                    <Doughnut
                                        data={{
                                            labels: Object.entries(
                                                baseStats.totalStatsSent.games
                                            ).map((game) => game[0]),
                                            datasets: [
                                                {
                                                    label: " # of stats sent",
                                                    data: Object.entries(
                                                        baseStats.totalStatsSent.games
                                                    ).map((game) => game[1]),
                                                    backgroundColor: [
                                                        "#f59b71",
                                                        "#60ff78",
                                                        "#f0e0fb",
                                                        "#cfe2f3",
                                                        "#655925",
                                                        "#85754e",
                                                        "#cd9b1d",
                                                        "#301e4b",
                                                        "#75758f",
                                                        "#416788",
                                                        "#c0c066",
                                                        "#6666c0",
                                                        "#333366",
                                                        "#445577",
                                                        "#883399",
                                                        "#daccad",
                                                        "#accec0",
                                                        "#3c2c7d",
                                                        "#ff800c",
                                                        "#ad9a9d",
                                                    ],
                                                    hoverOffset: 7,
                                                },
                                            ],
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg mb-3">
                            <h4>Stats sent per language</h4>
                            <ul className="list-group">
                                {Object.entries(baseStats.totalStatsSent.languages).map(
                                    (language, index) => (
                                        <li className="list-group-item" key={index}>
                                            {language[0]}:{" "}
                                            <strong>{language[1].toLocaleString("en-US")}</strong> (
                                            {(
                                                (language[1] / baseStats.totalStatsSent.total) *
                                                100
                                            ).toFixed(1)}
                                            %)
                                        </li>
                                    )
                                )}
                                <li className="list-group-item">
                                    <Doughnut
                                        data={{
                                            labels: Object.entries(
                                                baseStats.totalStatsSent.languages
                                            ).map((language) => language[0]),
                                            datasets: [
                                                {
                                                    label: " # of stats sent",
                                                    data: Object.entries(
                                                        baseStats.totalStatsSent.languages
                                                    ).map((language) => language[1]),
                                                    backgroundColor: [
                                                        "#f59b71",
                                                        "#60ff78",
                                                        "#f0e0fb",
                                                        "#cfe2f3",
                                                        "#655925",
                                                        "#85754e",
                                                        "#cd9b1d",
                                                        "#301e4b",
                                                        "#75758f",
                                                        "#416788",
                                                        "#c0c066",
                                                        "#6666c0",
                                                        "#333366",
                                                        "#445577",
                                                        "#883399",
                                                        "#daccad",
                                                        "#accec0",
                                                        "#3c2c7d",
                                                        "#ff800c",
                                                        "#ad9a9d",
                                                    ],
                                                    hoverOffset: 7,
                                                },
                                            ],
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr className="border border-primary border-2 opacity-75 rounded" />

                    <h3>Last stats sent</h3>
                    <div className="mb-3">
                        <button
                            className="btn btn-primary mb-2"
                            onClick={() => setShowAllOutputs(!showAllOutputs)}
                        >
                            {showAllOutputs ? "Back to last 20" : "Show all outputs (SLOW)"}
                        </button>
                        <ul className="list-group list-group-numbered">
                            {outputs
                                .sort((a, b) => b.date - a.date)
                                .slice(0, showAllOutputs ? -1 : 20)
                                .map((output, index) => (
                                    <li key={index} className="list-group-item">
                                        <strong>
                                            {output.game} {output.segment}
                                        </strong>{" "}
                                        - <strong>{output.language}</strong> //{" "}
                                        {new Date(output.date).toUTCString()} (
                                        {humanizeDuration(output.date - new Date(), {
                                            round: true,
                                        })}{" "}
                                        ago)
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <h4><i className="fa-solid fa-spinner fa-spin" /> Fetching data... This might take a while.</h4>
            )}
        </>
    );
};

export default Data;