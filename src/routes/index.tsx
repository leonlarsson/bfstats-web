import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  HomeIcon,
  ImageIcon,
  LockIcon,
  SendIcon,
  TerminalIcon,
  UsersIcon,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { BotCommand } from "@/components/BotCommand";
import { CountUp } from "@/components/CountUp";
import { CtaButton } from "@/components/CtaButton";
import type { GalleryImage } from "@/components/Gallery";
import { GalleryStrip, imageForGame, Lightbox } from "@/components/Gallery";
import { DISCORD_INVITE_URL } from "@/components/Header";
import { ImageDemo } from "@/components/ImageDemo";
import { Icons } from "@/components/icons";
import { LiveFeed } from "@/components/LiveFeed";
import { Marquee } from "@/components/Marquee";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { baseStatsQueryOptions } from "@/queries";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const GAMES = [
  { name: "Battlefield 6", command: "/bf6", mark: "6", segments: ["Stats", "Leaderboard"] },
  {
    name: "Battlefield 2042",
    command: "/bf2042",
    mark: "2042",
    segments: ["Stats", "Leaderboard", "Servers", "Experience", "Playercard"],
  },
  { name: "Battlefield V", command: "/bfv", mark: "V", segments: ["Stats", "Leaderboard"] },
  { name: "Battlefield 1", command: "/bf1", mark: "1", segments: ["Stats", "Morse"] },
  { name: "Battlefield Hardline", command: "/bfh", mark: "H", segments: ["Stats"] },
  { name: "Battlefield 4", command: "/bf4", mark: "4", segments: ["Stats"] },
  { name: "Battlefield 3", command: "/bf3", mark: "3", segments: ["Stats"] },
  { name: "Battlefield 2", command: "/bf2", mark: "2", segments: ["Stats"] },
];

const COMMANDS = [
  "/bf6",
  "/bf2042",
  "/bfv",
  "/bf1",
  "/bfh",
  "/bf4",
  "/bf3",
  "/bf2",
  "/usage",
  "/about",
  "/help",
  "/feedback",
  "/invite",
  "/link",
];

function HomeComponent() {
  const query = useQuery({ ...baseStatsQueryOptions, refetchInterval: 15_000 });
  const baseStats = query.data;

  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, hsl(var(--primary) / 0.13), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 100%, hsl(var(--primary) / 0.07), transparent 60%)",
          }}
        />

        <div className="container relative grid gap-12 px-4 py-16 lg:px-8 lg:py-24 xl:grid-cols-[1.2fr_0.85fr] xl:gap-16">
          <div className="flex flex-col justify-center">
            <span className="eyebrow fade-up mb-6">The biggest Battlefield bot on Discord · Est. 2021</span>

            <h1 className="display fade-up text-5xl sm:text-7xl xl:text-8xl" style={{ animationDelay: "80ms" }}>
              Know your
              <br />
              <span className="text-primary">Battlefield.</span>
            </h1>

            <p className="fade-up mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "160ms" }}>
              Real-time stats, leaderboards, and server intel for every major Battlefield title — delivered straight to
              your Discord server. One slash command. Zero friction.
            </p>

            <div className="fade-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "240ms" }}>
              <CtaButton className="w-full sm:w-auto" href={DISCORD_INVITE_URL} rel="noreferrer" target="_blank">
                <Icons.discord className="size-5" />
                Add to Discord
              </CtaButton>

              <CtaButton asChild className="w-full sm:w-auto" variant="outline">
                <Link to="/" hash="demo">
                  Try it
                  <ArrowDownIcon className="size-4" />
                </Link>
              </CtaButton>

              <CtaButton asChild className="w-full sm:w-auto" variant="outline">
                <Link to="/data">
                  Explore live data
                  <ArrowRightIcon className="size-4" />
                </Link>
              </CtaButton>
            </div>

            <dl
              className="fade-up mt-12 grid grid-cols-2 gap-x-6 gap-y-6 xl:grid-cols-4"
              style={{ animationDelay: "320ms" }}
            >
              <HeroStat
                icon={<SendIcon className="size-4" />}
                label="Stats sent"
                value={baseStats?.totalStatsSent.total}
              />
              <HeroStat icon={<HomeIcon className="size-4" />} label="Servers" value={baseStats?.totalGuilds} />
              <HeroStat
                icon={<UsersIcon className="size-4" />}
                label="User installs"
                value={baseStats?.totalUserInstalls}
              />
              <HeroStat
                icon={<UsersIcon className="size-4" />}
                label="Members reached"
                value={baseStats?.totalMembers}
              />
            </dl>
          </div>

          <div className="fade-up min-h-[420px]" style={{ animationDelay: "300ms" }}>
            <LiveFeed />
          </div>
        </div>
      </section>

      {/* ============ GAME MARQUEE ============ */}
      <div className="border-b bg-card py-3">
        <Marquee>
          {GAMES.map((game) => (
            <span
              className="flex items-center gap-8 whitespace-nowrap pr-8 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground"
              key={game.name}
            >
              {game.name}
              <span className="text-primary">✚</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ============ SUPPORTED GAMES ============ */}
      <Section
        eyebrow="Supported games"
        title={
          <>
            Every major title. <span className="text-primary">One bot.</span>
          </>
        }
        description="From Battlefield 2 to Battlefield 6 — run the game's command and pick a segment. Click a card to see that game's output."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GAMES.map((game) => (
            <button
              className="panel clip-notch-sm group relative cursor-pointer overflow-hidden p-5 text-left transition-colors hover:border-primary/60"
              key={game.name}
              onClick={() => {
                const image = imageForGame(game.name);
                if (image) setLightboxImage(image);
              }}
              type="button"
            >
              {/* Ghost mark — the game's numeral bleeding off the corner.
                  Long marks (e.g. "2042") get a smaller size so they stay a corner
                  accent instead of spanning the whole card on narrow screens. */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-2 -bottom-5 max-w-full select-none overflow-hidden font-black italic leading-none tracking-tighter text-foreground/[0.07] transition-[color,transform] duration-300 group-hover:-translate-x-1 group-hover:text-primary/25",
                  game.mark.length > 2 ? "text-6xl -bottom-3" : "text-[7.5rem]",
                )}
              >
                {game.mark}
              </span>

              {/* Corner glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 90% at 100% 100%, hsl(var(--primary) / 0.12), transparent 60%)",
                }}
              />

              <div className="relative">
                <div className="mb-1 flex items-center justify-between font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                  {game.command}
                  <ImageIcon className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="mb-3 text-lg font-bold">{game.name}</div>
                <div className="flex flex-wrap gap-1.5">
                  {game.segments.map((segment) => (
                    <span
                      className="rounded-sm border bg-muted px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                      key={segment}
                    >
                      {segment}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* ============ HOW IT WORKS ============ */}
      <Section
        className="border-y bg-card/50"
        eyebrow="Deployment"
        title="In the fight in under a minute."
        description="No setup, no configuration, no dashboard. Add the bot and start pulling stats immediately."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <StepCard
            index="01"
            title="Add the bot"
            description={
              <>
                <a className="link" href={DISCORD_INVITE_URL} rel="noreferrer" target="_blank">
                  Add Battlefield Stats
                </a>{" "}
                to your Discord server — or install it on your own account and use it anywhere.
              </>
            }
          />
          <StepCard
            index="02"
            title="Run a command"
            description={
              <>
                Type a game command like <BotCommand command="/bf6 stats" /> or <BotCommand command="/bf2042 servers" />
                . Run <BotCommand command="/help" /> for the full arsenal.
              </>
            }
          />
          <StepCard
            index="03"
            title="Get your stats"
            description="A fully rendered stat card drops into the channel in seconds — K/D, W/L, playtime, per-class breakdowns, and more."
          />
        </div>

        <div className="panel clip-notch-sm mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 border-b px-5 py-3">
            <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest">
              <TerminalIcon className="size-4 text-primary" />
              Command index
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Click to copy</span>
          </div>
          <div className="flex flex-wrap gap-2 p-5">
            {COMMANDS.map((command) => (
              <BotCommand command={command} key={command} variant="chip" />
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SHOWCASE / GALLERY ============ */}
      <Section
        eyebrow="Field report"
        title="Stats that look like they belong in the game."
        description="Every response is a rendered image built for the title you asked about — not a wall of text. Browse the gallery; click any card to enlarge."
      >
        <GalleryStrip onSelect={setLightboxImage} />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h3 className="display text-3xl sm:text-4xl">
              Link once. <span className="text-primary">Never type your name again.</span>
            </h3>
            <p className="mt-4 text-muted-foreground">
              Link your Battlefield account and skip the username-and-platform dance on every command. You'll also find
              a <b className="text-foreground">Link Account</b> button on every stats reply.
            </p>
            <ul className="mt-6 space-y-3">
              <LinkFeature icon={<LockIcon className="size-4" />}>
                Private — only you can see or use your linked accounts
              </LinkFeature>
              <LinkFeature icon={<TerminalIcon className="size-4" />}>
                <BotCommand command="/link add" /> links in seconds · <BotCommand command="/link help" /> for details
              </LinkFeature>
              <LinkFeature icon={<TerminalIcon className="size-4" />}>
                <BotCommand command="/link remove" /> unlinks at any time — no questions asked
              </LinkFeature>
            </ul>
          </div>
          <video
            aria-label="Demonstration of linking a Battlefield account."
            className="clip-notch w-full max-w-xl border justify-self-center lg:justify-self-end"
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/images/linking.mp4" type="video/mp4" />
            Your browser does not support embedded videos.
          </video>
        </div>
      </Section>

      {/* ============ LIVE IMAGE DEMO ============ */}
      <Section
        id="demo"
        className="border-t bg-card/50"
        eyebrow="Live bot demo"
        title={
          <>
            See the bot <span className="text-primary">in action.</span>
          </>
        }
        description="This is the exact image renderer behind the Discord bot. Pick a game, segment, and platform, drop in a username, and preview a real stat card — then add the bot to pull your own, plus leaderboards, account linking, and every command."
      >
        <ImageDemo onExpand={setLightboxImage} />

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">Like what you see? Get it in your own server.</p>
          <CtaButton href={DISCORD_INVITE_URL} rel="noreferrer" target="_blank">
            <Icons.discord className="size-5" />
            Add to Discord
          </CtaButton>
        </div>
      </Section>

      {/* ============ INTEL / FAQ ============ */}
      <Section className="border-t bg-card/50" eyebrow="Intel" title="Briefing room.">
        <Accordion className="mx-auto max-w-3xl" collapsible type="single">
          <AccordionItem value="commands">
            <AccordionTrigger className="text-lg font-semibold">What commands are available?</AccordionTrigger>
            <AccordionContent>
              <div className="mb-3 flex flex-wrap gap-2">
                {COMMANDS.map((command) => (
                  <BotCommand command={command} key={command} variant="chip" />
                ))}
              </div>
              Run <BotCommand command="/help" /> in Discord for the full, always-up-to-date list. In addition to stats
              and leaderboards, some games have extras — like <BotCommand command="/bf2042 experience" /> for Portal
              Experiences and <BotCommand command="/bf2042 servers" /> to search live servers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="usage">
            <AccordionTrigger className="text-lg font-semibold">Can I see my own usage?</AccordionTrigger>
            <AccordionContent>
              Yes — run <BotCommand command="/usage" /> to see how many times you've used the bot, grouped by game.
              Global usage is on the{" "}
              <Link className="link" to="/data">
                Data page
              </Link>
              , powered by the{" "}
              <a className="link" href="https://api.battlefieldstats.com/" rel="noreferrer" target="_blank">
                public API
              </a>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="affiliation">
            <AccordionTrigger className="text-lg font-semibold">Is this affiliated with EA or DICE?</AccordionTrigger>
            <AccordionContent>
              No. This bot is not endorsed by, supported by, or affiliated with EA, DICE, or any EA entity. Battlefield
              imagery displayed in the bot and its output is property of EA/DICE. Stats come from{" "}
              <a className="link" href="https://tracker.gg/" rel="noreferrer" target="_blank">
                Tracker Network
              </a>{" "}
              and{" "}
              <a className="link" href="https://gametools.network/" rel="noreferrer" target="_blank">
                Community Network
              </a>{" "}
              — none of this is possible without them. Read the{" "}
              <Link className="link" to="/privacy">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link className="link" to="/tos">
                Terms of Service
              </Link>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="credits">
            <AccordionTrigger className="text-lg font-semibold">Who translated the bot?</AccordionTrigger>
            <AccordionContent>
              Massive thanks to all the community translators: VIP-AHMAD-007, PeterSMK2, Salty Tenten, Rephii, Demz,
              Mozzy, CaptPerry, Dragory, Sephi, PierrotL'Asticot, Matteo 'Forever.exe' Besutti, Navigando, GioNL, Pug,
              Klikard, Szymon Olejniczak, Rubinsk, EIGuimaraes, TheLetslook, TR-BatuhanKara, Arall, chawu.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden border-t">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background: "radial-gradient(ellipse 70% 90% at 50% 100%, hsl(var(--primary) / 0.14), transparent 65%)",
          }}
        />
        <div className="container relative flex flex-col items-center px-4 py-20 text-center lg:px-8">
          <h2 className="display text-4xl sm:text-6xl">
            Ready to <span className="text-primary">deploy?</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Join thousands of servers already using Battlefield Stats.
            {baseStats && (
              <>
                {" "}
                <span className="font-semibold text-foreground tabular-nums">
                  {baseStats.totalStatsSent.total.toLocaleString("en")}
                </span>{" "}
                stats sent and counting.
              </>
            )}
          </p>
          <CtaButton className="mt-8 px-8" href={DISCORD_INVITE_URL} rel="noreferrer" target="_blank">
            <Icons.discord className="size-5" />
            Add to Discord
          </CtaButton>
        </div>
      </section>
    </>
  );
}

const HeroStat = ({ icon, label, value }: { icon: ReactNode; label: string; value: number | undefined }) => (
  <div>
    <dt className="flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
      <span className="text-primary">{icon}</span>
      {label}
    </dt>
    <dd className="mt-1 text-2xl font-black tabular-nums sm:text-3xl">
      {value !== undefined ? <CountUp value={value} /> : <span className="text-muted-foreground">—</span>}
    </dd>
  </div>
);

const Section = ({
  eyebrow,
  title,
  description,
  className,
  id,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  id?: string;
  children: ReactNode;
}) => (
  <section id={id} className={className}>
    <div className="container px-4 py-16 lg:px-8 lg:py-24">
      <span className="eyebrow mb-4">{eyebrow}</span>
      <h2 className="display max-w-3xl text-3xl sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>}
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const StepCard = ({ index, title, description }: { index: string; title: string; description: ReactNode }) => (
  <div className="panel clip-notch-sm relative p-6">
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-3xl font-black text-primary/90">{index}</span>
      <TerminalIcon className="size-4 text-muted-foreground" />
    </div>
    <div className="mb-2 text-lg font-bold">{title}</div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const LinkFeature = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <li className="flex items-baseline gap-3 text-sm text-muted-foreground">
    <span className="translate-y-0.5 text-primary">{icon}</span>
    <span>{children}</span>
  </li>
);
