"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
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

export const StatsSentPerGameChart = ({ outputs }: { outputs: Outputs }) => {
    return (
        <Doughnut
            data={{
                labels: Array.from(new Set(outputs.map(output => output.game))),
                datasets: [
                    {
                        label: " # of stats sent",
                        data: Array.from(new Set(outputs.map(output => output.game))).map(game => outputs.filter(output => output.game === game).length),
                        backgroundColor,
                        hoverOffset: 7
                    }
                ]
            }}
        />
    );
};

export const StatsSentPerSegmentChart = ({ outputs }: { outputs: Outputs }) => {
    return (
        <Doughnut
            data={{
                labels: Array.from(new Set(outputs.map(output => output.segment))),
                datasets: [
                    {
                        label: " # of stats sent",
                        data: Array.from(new Set(outputs.map(output => output.segment))).map(segment => outputs.filter(output => output.segment === segment).length),
                        backgroundColor,
                        hoverOffset: 7
                    }
                ]
            }}
        />
    );
};

export const StatsSentPerLanguageChart = ({ outputs }: { outputs: Outputs }) => {
    return (
        <Doughnut
            data={{
                labels: Array.from(new Set(outputs.map(output => output.language))),
                datasets: [
                    {
                        label: " # of stats sent",
                        data: Array.from(new Set(outputs.map(output => output.language))).map(language => outputs.filter(output => output.language === language).length),
                        backgroundColor,
                        hoverOffset: 7
                    }
                ]
            }}
        />
    );
};

export const StatsSentPerGameTotalChart = ({ baseStats }: { baseStats: any }) => {
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

export type Users = {
    total_stats_sent: number;
}[];

export type Outputs = {
    game: string;
    segment: string;
    language: string;
    date: number;
}[];

export type BaseStats = {
    totalGuilds: number;
    totalChannels: number;
    totalMembers: number;
    totalStatsSent: {
        total: number;
        games: {
            "Battlefield 2042": number;
            "Battlefield V": number;
            "Battlefield 1": number;
            "Battlefield Hardline": number;
            "Battlefield 4": number;
            "Battlefield 3": number;
            "Battlefield Bad Company 2": number;
            "Battlefield 2": number;
        },
        languages: {
            English: number;
            French: number;
            Italian: number;
            German: number;
            Spanish: number;
            Russian: number;
            Polish: number;
            "Brazilian Portuguese": number;
            Turkish: number;
            Swedish: number;
            Norwegian: number;
            Finnish: number;
            Arabic: number;
        }
    },
    lastUpdated: {
        date: string;
        timestampMilliseconds: number;
        timestampSeconds: number;
    }
};