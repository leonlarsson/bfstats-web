import { Link } from "@tanstack/react-router";
import { DISCORD_INVITE_URL, Wordmark } from "./Header";
import { Icons } from "./icons";

export const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-4">
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
            <p className="max-w-sm text-sm text-muted-foreground">
              The biggest Battlefield bot on Discord. Real-time stats, leaderboards, and more for every major
              Battlefield title — since 2021.
            </p>
            <div className="flex items-center gap-1">
              <a
                className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                href={DISCORD_INVITE_URL}
                rel="noreferrer"
                target="_blank"
                title="Add to Discord"
              >
                <Icons.discord className="size-5" />
              </a>
              <a
                className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                href="https://x.com/mozzyfx"
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
            </div>
          </div>

          <div>
            <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Site
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/data">
                  Data
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/tos">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Resources
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="https://api.battlefieldstats.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Public API
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="https://discord.com/application-directory/842768680252997662"
                  rel="noreferrer"
                  target="_blank"
                >
                  App Directory
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="https://tracker.gg/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Tracker Network
                </a>
              </li>
              <li>
                <a
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="https://gametools.network/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Community Network
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>
            Not endorsed by or affiliated with EA or DICE. Battlefield imagery is property of EA/DICE. Stats powered by
            Tracker Network and Community Network.
          </span>
          <span className="shrink-0 font-mono uppercase tracking-widest">Built by Mozzy</span>
        </div>
      </div>
    </footer>
  );
};
