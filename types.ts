export type DBUser = {
  totalStatsSent: number;
};

export type DBOutput = {
  game: string;
  segment: string;
  language: string;
  date: string;
};

export type DBEvent = {
  event: "appGuildInstall" | "appUserInstall" | "appGuildUninstall" | "appUserUninstall";
  date: string;
};

export type BaseStats = {
  totalGuilds: number;
  totalUserInstalls: number;
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
  item: Game | Language | Segment;
  sent: number;
};

export type SentDailyItem = {
  day: string;
  sent: number;
};

export type SentDailyItemGames = {
  day: string;
  game: Game;
  sent: number;
  totalSent: number;
};

export type EventDailyItem = {
  day: string;
  event: DBEvent["event"];
  count: number;
  dailyTotal: number;
};

export type Game =
  | "Battlefield 2042"
  | "Battlefield V"
  | "Battlefield 1"
  | "Battlefield Hardline"
  | "Battlefield 4"
  | "Battlefield 3"
  | "Battlefield Bad Company 2"
  | "Battlefield 2";

export type Segment =
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

export type Language =
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
  | "Arabic";
