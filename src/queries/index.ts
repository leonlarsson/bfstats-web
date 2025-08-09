import { queryOptions } from "@tanstack/react-query";
import type { BaseStats, CountsItem, DBEvent, DBOutput, DBUser, SentDailyItemGames } from "types";

// BASE

export const baseStatsQueryOptions = queryOptions({
  queryKey: ["base"],
  queryFn: () => fetch("https://api.battlefieldstats.com/base").then((res) => res.json() as unknown as BaseStats),
});

// OUTPUTS

export const outputsCountsQueryOptions = queryOptions({
  queryKey: ["outputs", "counts"],
  queryFn: () =>
    fetch("https://api.battlefieldstats.com/outputs/counts").then((res) => res.json() as unknown as CountsItem[]),
});

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

export const outputsCountsLast7DaysQueryOptions = queryOptions({
  queryKey: ["outputs", "counts-last-7-days"],
  queryFn: async () =>
    fetch("https://api.battlefieldstats.com/outputs/counts-last-7-days").then(
      (res) => res.json() as unknown as CountsItem[],
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
