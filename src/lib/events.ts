import type { DBEvent } from "types";

export const EVENTS = [
  "appGuildInstall",
  "appUserInstall",
  "appGuildUninstall",
  "appUserUninstall",
  "bfAccountLink",
  "bfAccountUnlink",
  "apiImageGenerated",
] satisfies DBEvent["event"][];
