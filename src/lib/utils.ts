import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** The API sends "2026-07-25 14:10:50" with no zone; spelling out UTC keeps mobile Safari from guessing. */
export const parseUTCDate = (date: string) => new Date(`${date.replace(" ", "T")}Z`);
