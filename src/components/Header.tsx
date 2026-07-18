import { Link } from "@tanstack/react-router";
import { CtaButton } from "./CtaButton";
import { HeaderSheet } from "./HeaderSheet";
import { Icons } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

export const NAV_LINKS = [
  { name: "Data", to: "/data" },
  { name: "Privacy", to: "/privacy" },
  { name: "Terms", to: "/tos" },
] as const;

export const DISCORD_INVITE_URL = "https://discord.com/oauth2/authorize?client_id=842768680252997662";

export const Wordmark = ({ className }: { className?: string }) => (
  <span className={className}>
    <span className="font-black uppercase tracking-tight">Battlefield</span>
    <span className="font-black uppercase tracking-tight text-primary">Stats</span>
  </span>
);

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 lg:gap-8">
          <Link
            className="flex shrink-0 items-center gap-3"
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
            to="/"
          >
            <img
              alt="Battlefield Stats icon"
              className="clip-notch-sm size-9"
              height={100}
              src="/images/avatar.png"
              width={100}
            />
            <Wordmark className="text-lg" />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex lg:gap-1">
            {NAV_LINKS.map((navLink) => (
              <Link
                activeProps={{ className: "!text-foreground after:!scale-x-100" }}
                className="relative px-2.5 py-2 font-mono text-[13px] font-medium uppercase tracking-widest text-muted-foreground transition-colors after:absolute after:inset-x-2.5 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:text-foreground hover:after:scale-x-100 lg:px-3 lg:after:inset-x-3"
                key={navLink.to}
                to={navLink.to}
              >
                {navLink.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden shrink-0 items-center gap-1 md:flex">
          {/* Social icons only get room at lg+ */}
          <a
            className="hidden rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:block"
            href="https://x.com/mozzyfx"
            target="_blank"
            rel="noreferrer"
            title="Twitter"
          >
            <Icons.twitterX className="size-5" />
          </a>

          <a
            className="hidden rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:block"
            href="https://github.com/leonlarsson/bfstats-web"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <Icons.gitHub className="size-5" />
          </a>

          <ThemeToggle />

          <CtaButton className="ml-2 shrink-0" href={DISCORD_INVITE_URL} rel="noreferrer" size="sm" target="_blank">
            <Icons.discord className="size-4" />
            Add to Discord
          </CtaButton>
        </div>

        <div className="md:hidden">
          <HeaderSheet />
        </div>
      </div>
    </header>
  );
};
