import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BotCommand } from "@/components/BotCommand";
import { CtaButton } from "@/components/CtaButton";
import { DISCORD_INVITE_URL } from "@/components/Header";
import { Icons } from "@/components/icons";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h2 className="text-lg font-semibold">{title}</h2>
    <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
  </section>
);

function AboutComponent() {
  return (
    <div className="container px-4 py-12 lg:px-8">
      <h1 className="display text-4xl sm:text-5xl">About</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        Battlefield Stats is a Discord bot that returns real-time stats, leaderboards, and server information for every
        major Battlefield title, rendered as an image card and delivered straight into a Discord channel.
      </p>

      <div className="mt-12 max-w-3xl space-y-10">
        <Block title="What it does">
          <p>
            It covers Battlefield 2, 3, 4, Hardline, 1, V, 2042, and 6. Each title has its own commands and segments:
            stats and leaderboards everywhere, plus extras like <BotCommand command="/bf2042 servers" /> for live server
            search and <BotCommand command="/bf2042 experience" /> for Portal Experiences. Run{" "}
            <BotCommand command="/help" /> in Discord for the current list.
          </p>
          <p>
            You can install it on a Discord server, or on your own account so it works anywhere you go. Both are free
            and neither needs configuration.
          </p>
        </Block>

        <Block title="Where the data comes from">
          <p>
            Stats are sourced from{" "}
            <a className="link" href="https://tracker.gg/" rel="noreferrer" target="_blank">
              Tracker Network
            </a>{" "}
            and{" "}
            <a className="link" href="https://gametools.network/" rel="noreferrer" target="_blank">
              Community Network
            </a>
            . None of this would be possible without them.
          </p>
          <p>
            The bot's own usage figures are published through a{" "}
            <a className="link" href="https://api.battlefieldstats.com/" rel="noreferrer" target="_blank">
              public API
            </a>
            , and the{" "}
            <Link className="link" to="/data">
              data page
            </Link>{" "}
            renders them live.
          </p>
        </Block>

        <Block title="Who makes it">
          <p>
            Built and maintained by Mozzy, running since 2021. The{" "}
            <a className="link" href="https://github.com/leonlarsson/bfstats-web" rel="noreferrer" target="_blank">
              website
            </a>{" "}
            and{" "}
            <a className="link" href="https://github.com/leonlarsson/bfstats-api" rel="noreferrer" target="_blank">
              API
            </a>{" "}
            are both open source.
          </p>
        </Block>

        <Block title="Affiliation">
          <p>
            This bot is not endorsed by, supported by, or affiliated with EA, DICE, or any EA entity. Battlefield
            imagery shown in the bot and its output is property of EA/DICE.
          </p>
          <p>
            See the{" "}
            <Link className="link" to="/privacy">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link className="link" to="/tos">
              Terms of Service
            </Link>{" "}
            for how data is handled and what the rules are.
          </p>
        </Block>
      </div>

      <div className="mt-12">
        <CtaButton href={DISCORD_INVITE_URL} rel="noreferrer" target="_blank">
          <Icons.discord className="size-5" />
          Add to Discord
        </CtaButton>
      </div>
    </div>
  );
}
