import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { HeaderSheet } from "./HeaderSheet";
import { ThemeToggle } from "./ThemeToggle";
import { Icons } from "./icons";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="flex h-14 items-center justify-between">
        {/* Replaced with minimal header below md */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            activeProps={{ className: "*:!opacity-100" }}
            className={cn("mr-3 flex items-center gap-3 font-semibold text-lg")}
            to="/"
          >
            <img
              alt="Battlefield Stats icon"
              className="size-10 rounded"
              height={100}
              src="/images/avatar.png"
              width={100}
            />
            <span className={cn("opacity-75 transition-opacity")}>Battlefield Stats</span>
          </Link>

          {[
            { name: "Privacy Policy", to: "/privacy" },
            { name: "Terms of Service", to: "/tos" },
            { name: "Data", to: "/data" },
          ].map((navLink) => (
            <Link
              activeProps={{ className: "!opacity-100 font-medium" }}
              className={cn(
                "rounded p-2 opacity-75 transition-[background-color,opacity,font-weight] hover:bg-neutral-200 dark:hover:bg-neutral-800",
              )}
              key={navLink.to}
              to={navLink.to}
            >
              {navLink.name}
            </Link>
          ))}

          {/* First shown at lg */}
          <a
            className={cn(
              "group hidden items-center gap-1 font-semibold rounded p-2 transition-[background-color] hover:bg-neutral-200 lg:flex dark:hover:bg-neutral-800",
            )}
            href="https://discord.com/oauth2/authorize?client_id=842768680252997662"
            rel="noreferrer"
            target="_blank"
          >
            <Icons.discord className="size-6 transition-[color] group-hover:text-[#5865F2]" />
            Add to Discord
          </a>
        </div>

        {/* Replaced with minimal header below md */}
        <div className="hidden items-center gap-1 md:flex">
          <a
            className="rounded p-2 opacity-80 transition-[background-color] hover:bg-neutral-200 dark:hover:bg-neutral-800"
            href="https://x.com/mozzyfx"
            target="_blank"
            rel="noreferrer"
            title="Twitter"
          >
            <Icons.twitterX className="size-6" />
          </a>

          <a
            className="rounded p-2 opacity-80 transition-[background-color] hover:bg-neutral-200 dark:hover:bg-neutral-800"
            href="https://bsky.app/profile/leon.ms"
            target="_blank"
            rel="noreferrer"
            title="Bluesky"
          >
            <Icons.bluesky className="size-6" />
          </a>

          <a
            className="rounded p-2 opacity-80 transition-[background-color] hover:bg-neutral-200 dark:hover:bg-neutral-800"
            href="https://github.com/leonlarsson/bfstats-web"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <Icons.gitHub className="size-6" />
          </a>

          <ThemeToggle />
        </div>

        {/* Minimal header with Sheet. Shown at md */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link className={cn("mr-3 flex items-center gap-3 text-lg font-semibold")} to="/">
            <img
              alt="Battlefield Stats icon"
              className="hidden size-10 rounded min-[330px]:inline"
              height={100}
              src="/images/avatar.png"
              width={100}
            />
            <span>Battlefield Stats</span>
          </Link>

          <HeaderSheet />
        </div>
      </div>
    </header>
  );
};
