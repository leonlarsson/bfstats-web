export type User = {
    total_stats_sent: number;
};

export type Output = {
    game: string;
    segment: string;
    language: string;
    date: number;
};

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