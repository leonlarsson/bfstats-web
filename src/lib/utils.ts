import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fix for mobile
export const parseUTCDate = (date: string) => new Date(`${date.replace(" ", "T")}Z`);
