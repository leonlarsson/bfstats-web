import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BotCommand } from "@/components/BotCommand";

export const Route = createFileRoute("/privacy")({
  component: PrivacyComponent,
});

const PolicySection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h3 className="mb-3 border-l-2 border-primary pl-3 text-xl font-bold sm:text-2xl">{title}</h3>
    <div className="space-y-4 text-muted-foreground [&_b]:text-foreground">{children}</div>
  </section>
);

function PrivacyComponent() {
  return (
    <div className="container px-4 py-12 lg:px-8">
      <span className="eyebrow mb-4">Intel handling</span>
      <h1 className="display text-4xl sm:text-6xl">
        Privacy Policy<span className="text-primary">.</span>
      </h1>
      <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">Updated July 4, 2026</div>

      <div className="mt-10 max-w-3xl space-y-10">
        <PolicySection title="User Data handling and usage">
          <p>
            For each direct interaction with the bot, I collect and store a number of properties for the user and the
            output. This includes user and server IDs and names, language used, game and segment, etc. As of February
            12, 2025, I save your stats search options, including game, platform, and username. This data is used to
            show your recent username searches in the command options to make searching faster and easier. The full code
            for the database can be viewed{" "}
            <a className="link" href="https://github.com/leonlarsson/bfstats-api" rel="noreferrer" target="_blank">
              here
            </a>
            . Only I can ever access this data*, and is used as described below. This bot can never read any messages
            you send.
          </p>
          <p>
            The way I use this data is for statistical, analytical, and quality purposes, as well as monitoring for any
            bad content that breaks the{" "}
            <Link className="link" to="/tos">
              Terms of Service
            </Link>
            , such as harmful usernames or server names. It is also used in the{" "}
            <Link className="link" to="/data">
              data reporting page
            </Link>
            . I store basic user and server data for the purposes of being able to block users and servers from using
            the bot if they are found to be abusing the bot. I store the bot output (stats, image or text format) to
            continously improve the quality of the bot and to correct potential issues. No identifying information is
            ever shared with any parties.
          </p>
          <p>
            Starting July 4, 2026, I optionally allow users to "link" their Battlefield account to their Discord
            account. This stores the user's Discord ID along the chosen platform and username. This is used to allow
            users to quickly search for their stats without having to type in their username and platform every time.
            This data is only stored if the user explicitly chooses to link their account, and can be deleted/unlinked
            at any time by running <BotCommand command="/link remove" />.
          </p>
        </PolicySection>

        <PolicySection title="User Locale, and how I use it">
          <p>
            This bot has access to the language your Discord client currently is set to. It uses this language to{" "}
            <b>publicly</b> display stats and messages in your language**. If you don't want the bot to use your client
            language, you must specify a language yourself with the "language" option in the command.
          </p>
        </PolicySection>

        <PolicySection title="API information">
          <p>
            This bot gets data from{" "}
            <a className="link" href="https://tracker.gg/" rel="noreferrer" target="_blank">
              Battlefield Tracker
            </a>{" "}
            and{" "}
            <a className="link" href="https://gametools.network/" rel="noreferrer" target="_blank">
              Community Network
            </a>{" "}
            and does not alter the data received, and is not responsible for it.
          </p>
          <p>
            If you do not want your stats to be visible, you can disable this. Info in the links below:
            <br />
            <a
              className="link"
              href="https://help.ea.com/en/help/battlefield/battlefield-2042/battlefield-2042-stats-and-privacy/"
              rel="noreferrer"
              target="_blank"
            >
              Battlefield 2042
            </a>
            <br />
            <a
              className="link"
              href="https://help.ea.com/en/help/battlefield/battlefield-stats-display/"
              rel="noreferrer"
              target="_blank"
            >
              Battlefield V/1
            </a>
          </p>
          <p>
            <i>For Battlelog games, you can probably disable this on Battlelog or inside the respective games.</i>
          </p>
        </PolicySection>

        <PolicySection title="Viewing your usage statistics">
          <p>
            To view your usage statistics, you can use the <BotCommand command="/usage" /> command. This will show you
            the number of times you've used the bot, grouped by game. This is only visible to you unless specified
            otherwise.
          </p>
        </PolicySection>

        <PolicySection title="Requesting data redaction">
          <p>
            If you want your data (user ID and username) to be redacted in the private database, you need to reach out
            to me on Discord. My username is <q>mozzy</q>. Since I don't store (or have access to) any emails, emailing
            me does not work as verification. If you have your data redacted and then continue to use the bot, your data
            will once again be stored. Do not use the bot in this case.
          </p>
        </PolicySection>

        <PolicySection title="Output identifiers">
          <p>
            Each successful stats output this bot sends (after March 21, 2024) has a unique identifier. For images, in
            the top right corner. For embeds, in the footer. These identifers are randomly generated Nano IDs and can be
            used to look up non-identifiable metadata for that specific output in the API. You can perform a partial
            search in the API and it will return the first match.
          </p>
          <p>
            <a
              className="link"
              href="https://api.battlefieldstats.com/outputs/by-identifier?identifier=FECbLioP"
              rel="noreferrer"
              target="_blank"
            >
              This
            </a>{" "}
            is an example using the identifier in the image below.
          </p>
          <img
            alt="Output identifer example"
            className="clip-notch-sm border"
            height={125}
            src="/images/OutputIdentifierExample.png"
            width={319}
          />
        </PolicySection>

        <PolicySection title="Disclaimers">
          <p className="text-sm italic">
            *Some non-identifiable information such as game, segment, language, output identifier, and # of stats sent
            is public. Visible in the APIs tab and{" "}
            <Link className="link" to="/data">
              here
            </Link>
            .
            <br />
            **Only displays your language if it's one of the supported ones.
          </p>
        </PolicySection>
      </div>
    </div>
  );
}
