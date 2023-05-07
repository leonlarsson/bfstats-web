"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { Output, BaseStats, CountsItem } from "@/types";
ChartJS.register(ArcElement, Tooltip, Legend);

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