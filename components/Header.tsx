"use client";

import Link from "next/link";
import ThemeModeToggle from "./ThemeModeToggle";
import { Icons } from "./icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default () => {
  const pathname = usePathname();

  // TODO: Make this mobile-friendly

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href="/" className={cn("mr-3 text-lg font-semibold opacity-75 transition-all", pathname === "/" && "opacity-100")}>
            Battlefield Stats
          </Link>

          <Link href="/privacy" className={cn("rounded p-2 opacity-75 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800", pathname === "/privacy" && "opacity-100")}>
            Privacy Policy
          </Link>

          <Link href="/tos" className={cn("rounded p-2 opacity-75 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800", pathname === "/tos" && "opacity-100")}>
            Terms of Service
          </Link>

          <Link href="/data" className={cn("rounded p-2 opacity-75 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800", pathname === "/data" && "opacity-100")}>
            Data
          </Link>

          <Link href="https://discord.com/oauth2/authorize?client_id=842768680252997662&scope=bot%20applications.commands" target="_blank" className={cn("flex items-center gap-1 rounded p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800")}>
            <Icons.discord className="h-6 w-6" /> Invite to Discord
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <Link href="https://x.com/MozzyFX" target="_blank" title="X / Twitter" className="rounded p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <Icons.twitterX className="h-6 w-6" />
          </Link>

          <Link href="https://github.com/leonlarsson/bfstats-web" target="_blank" title="GitHub" className="rounded p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <Icons.gitHub className="h-6 w-6" />
          </Link>

          <ThemeModeToggle />
        </div>
      </div>
    </header>
  );
};
