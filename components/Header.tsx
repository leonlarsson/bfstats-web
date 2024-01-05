"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderSheet from "./HeaderSheet";
import ThemeModeToggle from "./ThemeModeToggle";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

export default () => {
  const pathname = usePathname();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between">
        {/* Replaced with minimal header below md */}
        <div className="hidden items-center gap-1 md:flex">
          <Link href="/" className={cn("mr-3 flex items-center gap-3 text-lg font-semibold")}>
            <Image src="/images/avatar.png" alt="Battlefield Stats icon" className="h-10 w-10 rounded" width={100} height={100} /> <span className={cn("opacity-75 transition-opacity", pathname === "/" && "opacity-100")}>Battlefield Stats</span>
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

          {/* First shown at lg */}
          <Link href="https://discord.com/oauth2/authorize?client_id=842768680252997662&scope=bot%20applications.commands" target="_blank" className={cn("hidden items-center gap-1 rounded p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 lg:flex")}>
            <Icons.discord className="h-6 w-6" /> Invite to Discord
          </Link>
        </div>

        {/* Replaced with minimal header below md */}
        <div className="hidden items-center gap-1 md:flex">
          <Link href="https://x.com/MozzyFX" target="_blank" title="X / Twitter" className="rounded p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <Icons.twitterX className="h-6 w-6" />
          </Link>

          <Link href="https://github.com/leonlarsson/bfstats-web" target="_blank" title="GitHub" className="rounded p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <Icons.gitHub className="h-6 w-6" />
          </Link>

          <ThemeModeToggle />
        </div>

        {/* Minimal header with Sheet. Shown at md */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/" className={cn("mr-3 flex items-center gap-3 text-lg font-semibold")}>
            <Image src="/images/avatar.png" alt="Battlefield Stats icon" className="hidden h-10 w-10 rounded min-[330px]:inline" width={100} height={100} /> <span className={cn("opacity-75 transition-opacity", pathname === "/" && "opacity-100")}>Battlefield Stats</span>
          </Link>

          <HeaderSheet />
        </div>
      </div>
    </header>
  );
};
