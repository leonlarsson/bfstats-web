import { queryOptions } from "@tanstack/react-query";
import type { BaseStats, CountsItem, DBEvent, DBOutput, DBUser, EventDailyItem, SentDailyItemGames } from "types";

// BASE

export const baseStatsQueryOptions = queryOptions({
  queryKey: ["base"],
  queryFn: () => fetch("https://api.battlefieldstats.com/base").then((res) => res.json() as unknown as BaseStats),
});

// OUTPUTS

/** Counts per game, segment, and language. Covers all time unless days/offset narrow it to a window. */
export const outputsCountsQueryOptions = ({ days, offset }: { days?: number; offset?: number } = {}) => {
  const params = new URLSearchParams();
  if (days !== undefined) params.set("days", String(days));
  if (offset !== undefined) params.set("offset", String(offset));
  const search = params.toString();

  return queryOptions({
    queryKey: ["outputs", "counts", { days, offset }],
    queryFn: () =>
      fetch(`https://api.battlefieldstats.com/outputs/counts${search ? `?${search}` : ""}`).then(
        (res) => res.json() as unknown as CountsItem[],
      ),
  });
};

export const outputsRecentQueryOptions = queryOptions({
  queryKey: ["outputs", "recent"],
  queryFn: () =>
    fetch("https://api.battlefieldstats.com/outputs/recent").then((res) => res.json() as unknown as DBOutput[]),
});

export const outputsDailyGamesNoGapsQueryOptions = queryOptions({
  queryKey: ["outputs", "daily-games-no-gaps"],
  queryFn: () =>
    fetch("https://api.battlefieldstats.com/outputs/daily-games-no-gaps").then(
      (res) => res.json() as unknown as SentDailyItemGames[],
    ),
});

// USERS

export const usersCountQueryOptions = queryOptions({
  queryKey: ["users", "count"],
  queryFn: () =>
    fetch("https://api.battlefieldstats.com/users/count").then(
      (res) => res.json() as unknown as { totalUsers: number },
    ),
});

export const usersTopQueryOptions = queryOptions({
  queryKey: ["users", "top"],
  queryFn: () => fetch("https://api.battlefieldstats.com/users/top").then((res) => res.json() as unknown as DBUser[]),
});

// EVENTS

export const eventsRecentQueryOptions = queryOptions({
  queryKey: ["events", "recent"],
  queryFn: () =>
    fetch("https://api.battlefieldstats.com/events/recent").then((res) => res.json() as unknown as DBEvent[]),
});

export const eventsDailyNoGapsQueryOptions = queryOptions({
  queryKey: ["events", "daily-no-gaps"],
  queryFn: () =>
    fetch("https://api.battlefieldstats.com/events/daily-no-gaps").then(
      (res) => res.json() as unknown as EventDailyItem[],
    ),
});
