import { Link } from "@tanstack/react-router";
import { CtaButton } from "./CtaButton";
import { DISCORD_INVITE_URL, Wordmark } from "./Header";
import { Icons } from "./icons";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "Data", to: "/data" },
  { name: "Privacy Policy", to: "/privacy" },
  { name: "Terms of Service", to: "/tos" },
] as const;

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
              className="clip-notch-sm size-9"
              height={100}
              src="/images/avatar.png"
              width={100}
            />
            <Wordmark />
          </SheetTitle>
        </SheetHeader>

        <nav className="my-6 flex flex-col gap-1">
          {NAV_LINKS.map((navLink) => (
            <SheetClose asChild key={navLink.to}>
              <Link
                activeProps={{ className: "!text-foreground !border-primary" }}
                className="border-l-2 border-transparent px-3 py-2 font-mono text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                to={navLink.to}
              >
                {navLink.name}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <CtaButton className="w-full" href={DISCORD_INVITE_URL} rel="noreferrer" size="sm" target="_blank">
          <Icons.discord className="size-4" />
          Add to Discord
        </CtaButton>

        <div className="mt-6 flex items-center gap-1">
          <a
            className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            href="https://x.com/MozzyFX"
            rel="noreferrer"
            target="_blank"
            title="Twitter"
          >
            <Icons.twitterX className="size-5" />
          </a>

          <a
            className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            href="https://github.com/leonlarsson/bfstats-web"
            rel="noreferrer"
            target="_blank"
            title="GitHub"
          >
            <Icons.gitHub className="size-5" />
          </a>

          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};
