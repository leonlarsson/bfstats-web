import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export const HeaderSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Icons.bars className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="transition-none">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <img
              alt="Battlefield Stats icon"
              className="size-10 rounded"
              height={100}
              src="/images/avatar.png"
              width={100}
            />
            <span>Battlefield Stats</span>
          </SheetTitle>
        </SheetHeader>

        <div className="my-3 flex flex-col">
          {[
            {
              name: "Home",
              to: "/",
            },
            {
              name: "Privacy Policy",
              to: "/privacy",
            },
            {
              name: "Terms of Service",
              to: "/tos",
            },
            {
              name: "Data",
              to: "/data",
            },
          ].map((navLink) => (
            <SheetClose asChild key={navLink.to}>
              <Link className={cn("p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800")} to={navLink.to}>
                {navLink.name}
              </Link>
            </SheetClose>
          ))}

          <a
            className={cn("group flex items-center gap-1 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800")}
            href="https://discord.com/oauth2/authorize?client_id=842768680252997662"
            rel="noreferrer"
            target="_blank"
          >
            <Icons.discord className="size-6 group-hover:text-[#5865F2]" /> Add to Discord
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <a
              className="rounded p-2 opacity-80 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              href="https://x.com/MozzyFX"
              rel="noreferrer"
              target="_blank"
              title="Twitter"
            >
              <Icons.twitterX className="size-6" />
            </a>

            <a
              className="rounded p-2 opacity-80 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              href="https://bsky.app/profile/leon.ms"
              rel="noreferrer"
              target="_blank"
              title="Bluesky"
            >
              <Icons.bluesky className="size-6" />
            </a>

            <a
              className="rounded p-2 opacity-80 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              href="https://github.com/leonlarsson/bfstats-web"
              rel="noreferrer"
              target="_blank"
              title="GitHub"
            >
              <Icons.gitHub className="size-6" />
            </a>
          </div>

          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};
