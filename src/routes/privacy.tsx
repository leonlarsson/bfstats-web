import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyComponent,
});

function PrivacyComponent() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <h5>(Updated March 21, 2024)</h5>

      <br />

      <h3 className="text-2xl font-semibold">User Data handling and usage</h3>
      <p>
        For each direct interaction with the bot, I collect and store a number of properties for the user and the
        output. This includes user and server IDs and names, language used, game and segment, etc. The full code for the
        database can be viewed{" "}
        <a className="link" href="https://github.com/leonlarsson/bfstats-api" rel="noreferrer" target="_blank">
          here
        </a>
        . Only I can ever access this data*, and is used as described below. This bot can never read any messages you
        send.
        <br />
        <br />
        The way I use this data is for statistical, analytical, and quality purposes, as well as monitoring for any bad
        content that breaks the{" "}
        <Link className="link" to="/tos">
          Terms of Service
        </Link>
        , such as harmful usernames or server names. It is also used in the{" "}
        <Link className="link" to="/data">
          data reporting page
        </Link>
        . I store basic user and server data for the purposes of being able to block users and servers from using the
        bot if they are found to be abusing the bot. I store the bot output (stats, image or text format) to continously
        improve the quality of the bot and to correct potential issues. No identifying information is ever shared with
        any parties.
      </p>

      <br />

      <h3 className="text-2xl font-semibold">User Locale, and how I use it</h3>
      <p>
        This bot has access to the language your Discord client currently is set to. It uses this language to{" "}
        <b>publicly</b> display stats and messages in your language**. If you don't want the bot to use your client
        language, you must specify a language yourself with the "language" option in the command.
      </p>

      <br />

      <h3 className="text-2xl font-semibold">Deleting your stats image***</h3>
      <p>
        After every stats output, you have 15 seconds to delete it by clicking the red "Delete" button. Since these
        images are ONLY hosted on Discord, this will remove the image completely****.
        <br />
        <img alt="Delete Button" height={362} src="/images/StatsDeleteButton.png" width={480} />
      </p>

      <br />

      <h3 className="text-2xl font-semibold">API information</h3>
      <p>
        This bot gets data from{" "}
        <a className="link" href="https://battlefieldtracker.com/" rel="noreferrer" target="_blank">
          Battlefield Tracker
        </a>{" "}
        and{" "}
        <a className="link" href="https://gametools.network/" rel="noreferrer" target="_blank">
          Community Network
        </a>{" "}
        and does not alter the data received, and is not responsible for it.
        <br />
        <br />
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
        <br />
        <br />
        <i>For Battlelog games, you can probably disable this on Battlelog or inside the respective games.</i>
      </p>

      <br />

      <h3 className="text-2xl font-semibold">Viewing your usage statistics</h3>
      <p>
        To view your usage statistics, you can use the /usage command. This will show you the number of times you've
        used the bot, grouped by game. This is only visible to you unless specified otherwise.
      </p>

      <br />

      <h3 className="text-2xl font-semibold">Requesting data redaction</h3>
      <p>
        If you want your data (user ID and username) to be redacted in the private database, you need to reach out to me
        on Discord. My username is <q>mozzy</q>. Since I don't store any emails, emailing me does not work as
        verification. If you have your data redacted and then continue to use the bot, your data will once again be
        stored. Do not use the bot in this case.
      </p>

      <br />

      <h3 className="text-2xl font-semibold">Output identifiers</h3>
      <p>
        Each successful stats output this bot sends (after March 21, 2024) has a unique identifier. For images, in the
        top right corner. For embeds, in the footer. These identifers are randomly generated Nano IDs and can be used to
        look up non-identifiable metadata for that specific output in the API. You can perform a partial search in the
        API and it will return the first match.
        <br />
        <a
          className="link"
          href="https://api.battlefieldstats.com/outputs/by-identifier?identifier=FECbLioP"
          rel="noreferrer"
          target="_blank"
        >
          This
        </a>{" "}
        is an example using the identifier in the image below.
        <img
          alt="Output identifer example"
          className="mt-1"
          height={125}
          src="/images/OutputIdentifierExample.png"
          width={319}
        />
      </p>

      <br />

      <h3 className="text-2xl font-semibold">Disclaimers</h3>
      <p>
        <i>
          *Some non-identifiable information such as game, segment, language, output identifier, and # of stats sent is
          public. Visible in the APIs tab and{" "}
          <Link className="link" to="/data">
            here
          </Link>
          .
          <br />
          **Only displays your language if it's one of the supported ones.
          <br />
          ***Not available in threads where the bot can't see the main channel.
          <br />
          ****Unless the image was saved elsewhere.
        </i>
      </p>
    </div>
  );
}
