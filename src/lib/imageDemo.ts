export const IMAGE_API_BASE = "https://api.battlefieldstats.com/images";

export type DemoSegment = { key: string; label: string };
export type DemoPlatform = { value: string; label: string };

export type DemoGame = {
  key: string;
  name: string;
  segments: DemoSegment[];
  platforms: DemoPlatform[];
};

const SEG = {
  overview: { key: "overview", label: "Overview" },
  weapons: { key: "weapons", label: "Weapons" },
  vehicles: { key: "vehicles", label: "Vehicles" },
  gadgets: { key: "gadgets", label: "Gadgets" },
  firestorm: { key: "firestorm", label: "Firestorm" },
  hazardzone: { key: "hazardzone", label: "Hazard Zone" },
} satisfies Record<string, DemoSegment>;

const p = (label: string, value: string): DemoPlatform => ({ label, value });

const PLATFORMS: Record<string, DemoPlatform[]> = {
  bf6: [p("EA", "origin"), p("Steam", "steam"), p("Xbox", "xbl"), p("PlayStation", "psn")],
  bf2042: [p("PC/Origin", "origin"), p("Xbox", "xbl"), p("PlayStation", "psn")],
  bfv: [p("PC/Origin", "origin"), p("Xbox", "xbl"), p("PlayStation", "psn")],
  bf1: [p("PC/Origin", "origin"), p("Xbox", "xbl"), p("PlayStation", "psn")],
  bfh: [
    p("PC/Origin", "pc"),
    p("Xbox 360", "xbox360"),
    p("Xbox One", "xboxone"),
    p("PlayStation 3", "ps3"),
    p("PlayStation 4", "ps4"),
  ],
  bf4: [
    p("PC/Origin", "pc"),
    p("Xbox 360", "xbox360"),
    p("Xbox One", "xboxone"),
    p("PlayStation 3", "ps3"),
    p("PlayStation 4", "ps4"),
  ],
  bf3: [p("PC/Origin", "pc"), p("Xbox 360", "xbox360"), p("PlayStation 3", "ps3")],
  bf2: [p("BF2Hub", "bf2hub"), p("PlayBF2", "playbf2")],
};

export const DEMO_GAMES: DemoGame[] = [
  {
    key: "bf6",
    name: "Battlefield 6",
    segments: [SEG.overview, SEG.weapons, SEG.vehicles, SEG.gadgets],
    platforms: PLATFORMS.bf6,
  },
  {
    key: "bf2042",
    name: "Battlefield 2042",
    segments: [SEG.overview, SEG.weapons, SEG.vehicles, SEG.gadgets, SEG.hazardzone],
    platforms: PLATFORMS.bf2042,
  },
  {
    key: "bfv",
    name: "Battlefield V",
    segments: [SEG.overview, SEG.weapons, SEG.vehicles, SEG.firestorm],
    platforms: PLATFORMS.bfv,
  },
  { key: "bf1", name: "Battlefield 1", segments: [SEG.overview, SEG.weapons, SEG.vehicles], platforms: PLATFORMS.bf1 },
  {
    key: "bfh",
    name: "Battlefield Hardline",
    segments: [SEG.overview, SEG.weapons, SEG.vehicles],
    platforms: PLATFORMS.bfh,
  },
  { key: "bf4", name: "Battlefield 4", segments: [SEG.overview, SEG.weapons, SEG.vehicles], platforms: PLATFORMS.bf4 },
  { key: "bf3", name: "Battlefield 3", segments: [SEG.overview, SEG.weapons, SEG.vehicles], platforms: PLATFORMS.bf3 },
  { key: "bf2", name: "Battlefield 2", segments: [SEG.overview, SEG.weapons], platforms: PLATFORMS.bf2 },
];

export const getDemoGame = (key: string): DemoGame => DEMO_GAMES.find((g) => g.key === key) ?? DEMO_GAMES[0];

export const buildImageUrl = (game: string, segment: string, platform: string, username: string): string => {
  const params = new URLSearchParams({ username, platform });
  return `${IMAGE_API_BASE}/${game}/${segment}?${params.toString()}`;
};

export const friendlyError = (code: string | undefined): string => {
  switch (code) {
    case "PLAYER_NOT_FOUND":
      return "No player found with that username on that platform. Double-check the spelling.";
    case "PRIVATE_PROFILE":
      return "That profile is private, so its stats can't be read.";
    case "RATE_LIMITED":
      return "Rate limited by the stats provider — give it a moment and try again.";
    case "PROVIDER_ERROR":
      return "The stats provider is having issues right now. Try again shortly.";
    case "SEGMENT_NOT_FOUND":
    case "NOT_FOUND":
      return "That game and segment combination isn't available.";
    case "BAD_REQUEST":
      return "A username and platform are both required.";
    default:
      return "Something went wrong generating that image. Please try again.";
  }
};
