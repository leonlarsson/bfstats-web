import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, LockIcon, TerminalIcon } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { BotCommand } from "@/components/BotCommand";
import { CountUp } from "@/components/CountUp";
import { CtaButton } from "@/components/CtaButton";
import type { GalleryImage } from "@/components/Gallery";
import { GALLERY_IMAGES, Lightbox } from "@/components/Gallery";
import { DISCORD_INVITE_URL } from "@/components/Header";
import { HScroll } from "@/components/HScroll";
import { ImageDemo } from "@/components/ImageDemo";
import { Icons } from "@/components/icons";
import { LiveFeed } from "@/components/LiveFeed";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { baseStatsQueryOptions } from "@/queries";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const GAMES = [
  { name: "Battlefield 6", command: "/bf6", segments: ["Stats", "Leaderboard"] },
  {
    name: "Battlefield 2042",
    command: "/bf2042",
    segments: ["Stats", "Leaderboard", "Servers", "Experience", "Playercard"],
  },
  { name: "Battlefield V", command: "/bfv", segments: ["Stats", "Leaderboard"] },
  { name: "Battlefield 1", command: "/bf1", segments: ["Stats"] },
  { name: "Battlefield Hardline", command: "/bfh", segments: ["Stats"] },
  { name: "Battlefield 4", command: "/bf4", segments: ["Stats"] },
  { name: "Battlefield 3", command: "/bf3", segments: ["Stats"] },
  { name: "Battlefield 2", command: "/bf2", segments: ["Stats"] },
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
  "/link",
  "/about",
  "/help",
  "/feedback",
  "/invite",
  "/usage",
];

const STEPS = [
  {
    title: "Add the bot",
    body: (
      <>
        Install it on a server, or on your own account to use it anywhere Discord goes. No configuration, no permissions
        to tune.
      </>
    ),
  },
  {
    title: "Run a command",
    body: (
      <>
        <BotCommand command="/bf6 stats" /> for your own numbers, <BotCommand command="/bf6 leaderboard" /> for the top
        players. <BotCommand command="/help" /> lists everything.
      </>
    ),
  },
  {
    title: "Read your card",
    body: (
      <>
        A rendered image lands in the channel: K/D, W/L, playtime, per-class and per-weapon breakdowns. A few segments,
        like maps and modes, come back as text.
      </>
    ),
  },
];

function HomeComponent() {
  const query = useQuery({ ...baseStatsQueryOptions, refetchInterval: 15_000 });
  const baseStats = query.data;

  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [activeGame, setActiveGame] = useState(GAMES[0].name);

  const activeImages = GALLERY_IMAGES.filter((image) => image.game === activeGame);
  const activeMeta = GAMES.find((game) => game.name === activeGame);

  // Warm a game's examples on pointer or keyboard intent, so switching tabs doesn't
  // sit on an empty panel. Fetching all of them upfront would cost megabytes nobody asked for.
  const prefetched = useRef(new Set<string>());
  const prefetchGame = (gameName: string) => {
    for (const image of GALLERY_IMAGES) {
      if (image.game !== gameName || prefetched.current.has(image.src)) continue;
      prefetched.current.add(image.src);
      new Image().src = image.src;
    }
  };

  return (
    <>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />

      {/* ============ HERO ============ */}
      <section className="border-b">
        {/* Below xl the feed sits directly under the primary action, so the lead proof
            still lands in the first screenful; the figures follow it. */}
        {/* Rows are sized explicitly so the feed's row-span cannot inflate row 1 and
            strand the figures line below a gap. */}
        <div className="container grid gap-8 px-4 py-10 lg:px-8 lg:py-16 xl:grid-cols-[1.05fr_0.95fr] xl:grid-rows-[auto_1fr] xl:gap-x-14 xl:gap-y-5">
          <div className="flex flex-col xl:col-start-1 xl:row-start-1">
            <h1 className="display fade-up text-[clamp(2.25rem,7vw,4rem)]">
              Battlefield stats,
              <br />
              in <span className="text-primary">Discord</span>.
            </h1>

            <p
              className="fade-up mt-5 max-w-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "70ms" }}
            >
              Real-time stats and leaderboards for every major Battlefield title, from Battlefield 2 to Battlefield 6.
              Rendered as an image card and delivered in seconds.
            </p>

            <div className="fade-up mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: "140ms" }}>
              <CtaButton className="w-full sm:w-auto" href={DISCORD_INVITE_URL} rel="noreferrer" target="_blank">
                <Icons.discord className="size-5" />
                Add to Discord
              </CtaButton>

              <CtaButton asChild className="w-full sm:w-auto" variant="outline">
                <Link hash="demo" hashScrollIntoView={{ behavior: "instant", block: "start" }} to="/">
                  Try the renderer
                  <ArrowRightIcon className="size-4" />
                </Link>
              </CtaButton>
            </div>
          </div>

          <div
            className="fade-up min-w-0 xl:col-start-2 xl:row-span-2 xl:row-start-1"
            style={{ animationDelay: "180ms" }}
          >
            <LiveFeed />
          </div>

          <p
            className="fade-up max-w-lg text-sm leading-relaxed text-muted-foreground xl:col-start-1 xl:row-start-2 xl:self-start"
            style={{ animationDelay: "210ms" }}
          >
            Running in <HeroFigure value={baseStats?.totalGuilds} /> servers and{" "}
            <HeroFigure value={baseStats?.totalUserInstalls} /> personal installs, reaching{" "}
            <HeroFigure value={baseStats?.totalMembers} /> Discord members. Delivered{" "}
            <HeroFigure value={baseStats?.totalStatsSent.total} /> stat cards since 2021.
          </p>
        </div>
      </section>

      {/* ============ OUTPUT BROWSER ============ */}
      <Section
        title="Pick your game"
        description="Every major Battlefield title is supported. Choose one to see exactly what the bot returns for it, as real unedited output."
      >
        <HScroll trackProps={{ "aria-label": "Select a game", className: "gap-2", role: "tablist" }}>
          {GAMES.map((game) => {
            const selected = game.name === activeGame;
            return (
              <button
                aria-selected={selected}
                className={cn(
                  "clip-notch shrink-0 snap-start cursor-pointer border px-4 py-2.5 text-left transition-colors",
                  selected
                    ? "border-primary/70 bg-primary/10"
                    : "border-border bg-card hover:border-muted-foreground/40",
                )}
                key={game.name}
                onClick={() => setActiveGame(game.name)}
                onFocus={() => prefetchGame(game.name)}
                onMouseEnter={() => prefetchGame(game.name)}
                role="tab"
                type="button"
              >
                <span
                  className={cn(
                    "block font-mono text-xs transition-colors",
                    selected ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {game.command}
                </span>
                <span className="mt-0.5 block whitespace-nowrap text-sm font-semibold">{game.name}</span>
              </button>
            );
          })}
        </HScroll>

        {activeMeta && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>
              Available for {activeMeta.name}: <span className="text-foreground">{activeMeta.segments.join(", ")}</span>
            </span>
          </div>
        )}

        {/* Cards keep one width and scroll, however many a title has, so switching
            games never reflows the row into a different shape. */}
        <HScroll className="mt-5">
          {activeImages.map((image) => (
            <button
              className="panel clip-notch group w-[300px] shrink-0 snap-start cursor-zoom-in overflow-hidden text-left transition-colors hover:border-primary/60 sm:w-[360px] lg:w-[420px]"
              key={image.src}
              onClick={() => setLightboxImage(image)}
              type="button"
            >
              <img
                alt={`${image.game} ${image.segment} example output`}
                // Inert so a drag across the card scrolls the row instead of
                // starting a native image drag.
                className="pointer-events-none aspect-[1200/750] w-full object-cover"
                draggable={false}
                height={750}
                loading="lazy"
                src={image.src}
                width={1200}
              />
              <span className="flex items-baseline justify-between gap-2 border-t px-3.5 py-2.5">
                <span className="truncate text-sm font-medium">{image.segment}</span>
                <span className="shrink-0 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                  Enlarge
                </span>
              </span>
            </button>
          ))}
        </HScroll>
      </Section>

      {/* ============ HOW IT WORKS ============ */}
      <Section
        className="border-t bg-card/40"
        title="Nothing to configure"
        description="There are no settings, permissions, or setup steps. Add the bot and start pulling stats immediately."
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <ol className="flex flex-col gap-7">
            {STEPS.map((step, i) => (
              <li className="flex gap-4" key={step.title}>
                <span className="figure mt-0.5 w-5 shrink-0 text-sm font-semibold text-primary">{i + 1}</span>
                <div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="panel clip-notch self-start">
            <div className="flex items-center gap-2 border-b px-4 py-3 text-sm font-medium">
              <TerminalIcon className="size-4 text-primary" />
              Command index
              <span className="ml-auto text-xs font-normal text-muted-foreground">Click to copy</span>
            </div>
            <div className="flex flex-wrap gap-2 p-4">
              {COMMANDS.map((command) => (
                <BotCommand command={command} key={command} variant="chip" />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ============ ACCOUNT LINKING ============ */}
      {/* Deliberately not the shared Section. Its heading spans the full width, which
          strands the space beside it and forces the video to begin below the header.
          Here the heading sits inside the left column so the video spans the whole block. */}
      <section className="border-t">
        <div className="container px-4 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:items-center lg:gap-14">
            <div>
              <h2 className="display text-3xl sm:text-4xl">Stop typing your username</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Link your Battlefield account once and the bot remembers your username and platform on every command
                after that.
              </p>

              <ul className="mt-9 space-y-4">
                <LinkFeature icon={<LockIcon className="size-4" />}>
                  Private. Only you can see or use your linked accounts.
                </LinkFeature>
                <LinkFeature icon={<TerminalIcon className="size-4" />}>
                  <BotCommand command="/link add" /> links in seconds, <BotCommand command="/link help" /> explains the
                  details.
                </LinkFeature>
                <LinkFeature icon={<TerminalIcon className="size-4" />}>
                  <BotCommand command="/link remove" /> unlinks at any time, no questions asked.
                </LinkFeature>
                <LinkFeature icon={<TerminalIcon className="size-4" />}>
                  <BotCommand command="/<game> mystats" /> pulls the linked account straight away.
                </LinkFeature>
              </ul>

              <p className="mt-6 text-sm text-muted-foreground">
                There is also a <span className="font-medium text-foreground">Link Account</span> button on every stats
                reply.
              </p>
            </div>

            <video
              aria-label="Demonstration of linking a Battlefield account."
              className="clip-notch aspect-[794/696] w-full border justify-self-center lg:justify-self-end"
              controls
              autoPlay
              height={696}
              loop
              muted
              playsInline
              preload="metadata"
              width={794}
            >
              <source src="/images/linking.mp4" type="video/mp4" />
              Your browser does not support embedded videos.
            </video>
          </div>
        </div>
      </section>

      {/* ============ LIVE DEMO ============ */}
      <Section
        className="border-t bg-card/40"
        id="demo"
        title="This is the real renderer"
        description="The same image renderer the Discord bot uses, running here. Pick a game, drop in a username, and get a real stat card back."
      >
        <ImageDemo onExpand={setLightboxImage} />

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">Want this in your own server?</p>
          <CtaButton href={DISCORD_INVITE_URL} rel="noreferrer" target="_blank">
            <Icons.discord className="size-5" />
            Add to Discord
          </CtaButton>
        </div>
      </Section>

      {/* ============ FAQ ============ */}
      <section className="border-t">
        <div className="container px-4 py-16 lg:px-8 lg:py-20">
          {/* Heading pinned left against the list rather than stacked above it, so the
              section uses the full row instead of stranding half of it. */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
            <div>
              <h2 className="display text-3xl sm:text-4xl">Common questions</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Anything not covered here, <BotCommand command="/feedback" /> in Discord reaches me directly.
              </p>
            </div>

            <Accordion collapsible type="single">
              <AccordionItem value="commands">
                <AccordionTrigger className="text-base font-semibold">What commands are available?</AccordionTrigger>
                <AccordionContent>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {COMMANDS.map((command) => (
                      <BotCommand command={command} key={command} variant="chip" />
                    ))}
                  </div>
                  Run <BotCommand command="/help" /> in Discord for the full, always-current list. Beyond stats and
                  leaderboards, some titles have extras: <BotCommand command="/bf2042 experience" /> for Portal
                  Experiences and <BotCommand command="/bf2042 servers" /> to search live servers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage">
                <AccordionTrigger className="text-base font-semibold">Can I see my own usage?</AccordionTrigger>
                <AccordionContent>
                  Yes. Run <BotCommand command="/usage" /> to see how many times you've used the bot, grouped by game.
                  Global usage lives on the{" "}
                  <Link className="link" to="/data">
                    data page
                  </Link>
                  , powered by the{" "}
                  <a className="link" href="https://api.battlefieldstats.com/" rel="noreferrer" target="_blank">
                    public API
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="affiliation">
                <AccordionTrigger className="text-base font-semibold">
                  Is this affiliated with EA or DICE?
                </AccordionTrigger>
                <AccordionContent>
                  No. This bot is not endorsed by, supported by, or affiliated with EA, DICE, or any EA entity.
                  Battlefield imagery shown in the bot and its output is property of EA/DICE. Stats come from{" "}
                  <a className="link" href="https://tracker.gg/" rel="noreferrer" target="_blank">
                    Tracker Network
                  </a>{" "}
                  and{" "}
                  <a className="link" href="https://gametools.network/" rel="noreferrer" target="_blank">
                    Community Network
                  </a>
                  , and none of this is possible without them. Read the{" "}
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
                <AccordionTrigger className="text-base font-semibold">Who translated the bot?</AccordionTrigger>
                <AccordionContent>
                  Massive thanks to all the community translators: VIP-AHMAD-007, PeterSMK2, Salty Tenten, Rephii, Demz,
                  Mozzy, CaptPerry, Dragory, Sephi, PierrotL'Asticot, Matteo 'Forever.exe' Besutti, Navigando, GioNL,
                  Pug, Klikard, Szymon Olejniczak, Rubinsk, EIGuimaraes, TheLetslook, TR-BatuhanKara, Arall, chawu.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="border-t bg-card/40">
        <div className="container flex flex-col items-center px-4 py-20 text-center lg:px-8">
          <h2 className="display max-w-2xl text-3xl sm:text-4xl">Get your Battlefield stats in Discord.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Free, no setup, and it works on your own account or across an entire server.
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

/** A live figure inside running prose. Falls back to a dash until the API answers. */
const HeroFigure = ({ value }: { value: number | undefined }) =>
  value !== undefined ? (
    <span className="figure font-semibold text-foreground">
      <CountUp value={value} />
    </span>
  ) : (
    <span className="text-muted-foreground">—</span>
  );

const Section = ({
  title,
  description,
  className,
  id,
  children,
}: {
  title: ReactNode;
  description?: string;
  className?: string;
  id?: string;
  children: ReactNode;
}) => (
  <section className={className} id={id}>
    <div className="container px-4 py-16 lg:px-8 lg:py-20">
      <h2 className="display max-w-3xl text-3xl sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{description}</p>}
      <div className="mt-9">{children}</div>
    </div>
  </section>
);

const LinkFeature = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <li className="flex items-baseline gap-3 text-sm leading-relaxed text-muted-foreground">
    <span className="translate-y-0.5 text-primary">{icon}</span>
    <span>{children}</span>
  </li>
);
