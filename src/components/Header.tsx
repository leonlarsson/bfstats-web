import { Link } from "@tanstack/react-router";
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
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-3" to="/">
            <img
              alt="Battlefield Stats icon"
              className="clip-notch-sm size-9"
              height={100}
              src="/images/avatar.png"
              width={100}
            />
            <Wordmark className="text-lg" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((navLink) => (
              <Link
                activeProps={{ className: "!text-foreground after:!scale-x-100" }}
                className="relative px-3 py-2 font-mono text-[13px] font-medium uppercase tracking-widest text-muted-foreground transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:text-foreground hover:after:scale-x-100"
                key={navLink.to}
                to={navLink.to}
              >
                {navLink.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <a
            className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            href="https://x.com/mozzyfx"
            target="_blank"
            rel="noreferrer"
            title="Twitter"
          >
            <Icons.twitterX className="size-5" />
          </a>

          <a
            className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            href="https://github.com/leonlarsson/bfstats-web"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <Icons.gitHub className="size-5" />
          </a>

          <ThemeToggle />

          <a
            className="clip-btn ml-2 inline-flex h-9 items-center gap-2 bg-primary px-4 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            href={DISCORD_INVITE_URL}
            rel="noreferrer"
            target="_blank"
          >
            <Icons.discord className="size-4" />
            Add to Discord
          </a>
        </div>

        <div className="md:hidden">
          <HeaderSheet />
        </div>
      </div>
    </header>
  );
};
