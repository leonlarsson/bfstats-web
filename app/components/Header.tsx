import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Icons } from "./icons";

export const Header = (props) => {
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
            />{" "}
            <span className={cn("opacity-75 transition-opacity")}>Battlefield Stats</span>
          </Link>

          <Link
            activeProps={{ className: "!opacity-100" }}
            className={cn("rounded p-2 opacity-75 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800")}
            to="/privacy"
          >
            Privacy Policy
          </Link>

          <Link
            activeProps={{ className: "!opacity-100" }}
            className={cn("rounded p-2 opacity-75 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800")}
            to="/tos"
          >
            Terms of Service
          </Link>

          <Link
            activeProps={{ className: "!opacity-100" }}
            className={cn("rounded p-2 opacity-75 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800")}
            to="/data"
          >
            Data
          </Link>

          {/* First shown at lg */}
          <a
            className={cn(
              "hidden items-center gap-1 rounded p-2 transition-colors hover:bg-neutral-200 lg:flex dark:hover:bg-neutral-800",
            )}
            href="https://discord.com/oauth2/authorize?client_id=842768680252997662"
            rel="noreferrer"
            target="_blank"
          >
            <Icons.discord className="size-6 font-bold" /> Add to Discord
          </a>
        </div>

        {/* Replaced with minimal header below md */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            className="rounded p-2 opacity-80 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
            href="https://x.com/MozzyFX"
            target="_blank"
            title="X / Twitter"
          >
            <Icons.twitterX className="size-6" />
          </Link>

          <Link
            className="rounded p-2 opacity-80 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
            href="https://github.com/leonlarsson/bfstats-web"
            target="_blank"
            title="GitHub"
          >
            <Icons.gitHub className="size-6" />
          </Link>

          {/* <ThemeModeToggle /> */}
        </div>

        {/* Minimal header with Sheet. Shown at md */}
        {/* <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/" className={cn("mr-3 flex items-center gap-3 text-lg font-semibold")}>
            <Image src="/images/avatar.png" alt="Battlefield Stats icon" className="hidden size-10 rounded min-[330px]:inline" width={100} height={100} /> <span className={cn("opacity-75 transition-opacity", pathname === "/" && "opacity-100")}>Battlefield Stats</span>
          </Link>

          <HeaderSheet />
        </div> */}
      </div>
    </header>
  );
};
