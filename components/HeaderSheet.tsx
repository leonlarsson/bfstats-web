import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "./icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeModeToggle from "./ThemeModeToggle";

export default () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Icons.bars className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Battlefield Stats</SheetTitle>
        </SheetHeader>
        <div className="mb-3 flex flex-col">
          <SheetClose asChild>
            <Link href="/" className={cn("rounded p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800")}>
              Home
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/privacy" className={cn("rounded p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800")}>
              Privacy Policy
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/tos" className={cn("rounded p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800")}>
              Terms of Service
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/data" className={cn("rounded p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800")}>
              Data
            </Link>
          </SheetClose>

          <Link href="https://discord.com/oauth2/authorize?client_id=842768680252997662&scope=bot%20applications.commands" target="_blank" className={cn("flex items-center gap-1 rounded p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800")}>
            <Icons.discord className="h-6 w-6" /> Invite to Discord
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <Link href="https://x.com/MozzyFX" target="_blank" title="X / Twitter" className="rounded p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
              <Icons.twitterX className="h-6 w-6" />
            </Link>

            <Link href="https://github.com/leonlarsson/bfstats-web" target="_blank" title="GitHub" className="rounded p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
              <Icons.gitHub className="h-6 w-6" />
            </Link>
          </div>

          <ThemeModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};
