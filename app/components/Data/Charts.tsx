"use client";

import { useState } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import type { BaseStats, CountsItem, SentDailyItem, SentDailyItemGames } from "@/types";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const backgroundColor = [
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
    "#ad9a9d"
];

export const StatsSentPerGameChart = ({ games }: { games: CountsItem[] }) => {
    return (
        <Doughnut
            data={{
                labels: games.map(obj => obj.item),
                datasets: [
                    {
                        label: " # of stats sent",
                        data: games.map(x => x.sent),
                        backgroundColor,
                        hoverOffset: 7
                    }
                ]
            }}
        />
    );
};

export const StatsSentPerSegmentChart = ({ segments }: { segments: CountsItem[] }) => {
    return (
        <Doughnut
            data={{
                labels: segments.map(obj => obj.item),
                datasets: [
                    {
                        label: " # of stats sent",
                        data: segments.map(x => x.sent),
                        backgroundColor,
                        hoverOffset: 7
                    }
                ]
            }}
        />
    );
};

export const StatsSentPerLanguageChart = ({ languages }: { languages: CountsItem[] }) => {
    return (
        <Doughnut
            data={{
                labels: languages.map(obj => obj.item),
                datasets: [
                    {
                        label: " # of stats sent",
                        data: languages.map(x => x.sent),
                        backgroundColor,
                        hoverOffset: 7
                    }
                ]
            }}
        />
    );
};

// Uses /d1/outputs/daily/games
export const StatsSentPerDayChartWithFilter = ({ data }: { data: SentDailyItemGames[] }) => {

    const totalData = data.filter((v, i, a) => a.findIndex(v2 => (v2.day === v.day)) === i)

    const [showAll, setShowAll] = useState(true);
    const [selectedGame, setSelectedGame] = useState("All games");
    const [selectedData, setSelectedData] = useState(totalData);

    // On select change:
    // If the selection is All games, show all
    // Set selected game
    // Set selected data:
    // If All games, get each day.
    // If not All games, get selected data from that game
    const handleGameChange = (selectValue: string) => {
        if (selectValue !== "All games") setShowAll(true);
        setSelectedGame(selectValue);
        setSelectedData(selectValue === "All games" ? totalData : data.filter(x => x.game === selectValue));
    };

    return (
        <>
            {selectedGame === "All games" &&
                <>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="radio1" value="yes" defaultChecked onChange={e => setShowAll(e.target.value === "yes")} />
                        <label className="form-check-label user-select-none" htmlFor="radio1">Since Jan 1st, 2023</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="radio2" value="no" onChange={e => setShowAll(e.target.value === "yes")} />
                        <label className="form-check-label user-select-none" htmlFor="radio2">Last 30 days</label>
                    </div>
                </>
            }
            Select game:
            <select className="form-select" onChange={e => handleGameChange(e.target.value)}>
                <option value="All games">All games</option>
                {["Battlefield 2042", "Battlefield V", "Battlefield 1", "Battlefield Hardline", "Battlefield 4", "Battlefield 3", "Battlefield Bad Company 2", "Battlefield 2"].map(game => <option key={game} value={game}>{game}</option>)}
            </select>
            <Bar
            redraw={false}
                key={selectedGame}
                data={{
                    labels: selectedData.slice(showAll ? 0 : -30).map(x => x.day),
                    datasets: [
                        {
                            label: " # of stats sent",
                            data: selectedData.slice(showAll ? 0 : -30).map(x => selectedGame === "All games" ? x.total_sent : x.sent),
                            backgroundColor
                        }
                    ]
                }}
            />
        </>
    );
};

// Uses /d1/outputs/daily
export const StatsSentPerDayChart = ({ data }: { data: SentDailyItem[] }) => {

    const [showAll, setShowAll] = useState(true);

    return (
        <>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="radio1" value="yes" defaultChecked onChange={e => setShowAll(e.target.value === "yes")} />
                <label className="form-check-label user-select-none" htmlFor="radio1">Since Jan 1st, 2023</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="radio2" value="no" onChange={e => setShowAll(e.target.value === "yes")} />
                <label className="form-check-label user-select-none" htmlFor="radio2">Last 30 days</label>
            </div>
            <Bar
                data={{
                    labels: data.slice(showAll ? 0 : -30).map(x => x.day),
                    datasets: [
                        {
                            label: " # of stats sent",
                            data: data.slice(showAll ? 0 : -30).map(x => x.sent),
                            backgroundColor
                        }
                    ]
                }}
            />
        </>
    );
};

export const StatsSentPerGameTotalChart = ({ baseStats }: { baseStats: BaseStats }) => {
    return (
        <Doughnut
            data={{
                labels: Object.entries(baseStats.totalStatsSent.games).map(game => game[0]),
                datasets: [
                    {
                        label: " # of stats sent",
                        data: Object.entries(baseStats.totalStatsSent.games).map(game => game[1]),
                        backgroundColor,
                        hoverOffset: 7
                    }
                ]
            }}
        />
    );
};

export const StatsSentPerLanguageTotalChart = ({ baseStats }: { baseStats: BaseStats }) => {
    return (
        <Doughnut
            data={{
                labels: Object.entries(baseStats.totalStatsSent.languages).map(language => language[0]),
                datasets: [
                    {
                        label: " # of stats sent",
                        data: Object.entries(baseStats.totalStatsSent.languages).map(language => language[1]),
                        backgroundColor,
                        hoverOffset: 7
                    }
                ]
            }}
        />
    );
};