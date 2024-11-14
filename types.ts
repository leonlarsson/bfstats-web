export type User = {
  totalStatsSent: number;
};

export type Output = {
  game: string;
  segment: string;
  language: string;
  date: string;
};

export type Event = {
  event: string;
  date: string;
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
    };
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
    };
  };
  lastUpdated: {
    date: string;
    timestampMilliseconds: number;
    timestampSeconds: number;
  };
};

export type CountsItem = {
  category: "game" | "segment" | "language";
  item:
    | "Battlefield 2042"
    | "Battlefield V"
    | "Battlefield 1"
    | "Battlefield Hardline"
    | "Battlefield 4"
    | "Battlefield 3"
    | "Battlefield Bad Company 2"
    | "Battlefield 2"
    | "English"
    | "French"
    | "Italian"
    | "German"
    | "Spanish"
    | "Russian"
    | "Polish"
    | "Brazilian Portuguese"
    | "Turkish"
    | "Swedish"
    | "Norwegian"
    | "Finnish"
    | "Arabic"
    | "Overview"
    | "Weapons"
    | "Classes"
    | "Vehicles"
    | "Gadgets"
    | "Maps"
    | "Modes"
    | "Progression"
    | "Hazard Zone"
    | "Firestorm";
  sent: number;
};

export type SentDailyItem = {
  day: string;
  sent: number;
};

export type SentDailyItemGames = {
  day: string;
  game:
    | "Battlefield 2042"
    | "Battlefield V"
    | "Battlefield 1"
    | "Battlefield Hardline"
    | "Battlefield 4"
    | "Battlefield 3"
    | "Battlefield Bad Company 2"
    | "Battlefield 2";
  sent: number;
  totalSent: number;
};
