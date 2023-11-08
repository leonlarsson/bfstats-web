import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Battlefield Stats Discord Bot",
  description: "Read the Privacy Policy for the Battlefield Stats Discord Bot."
};

export default () => {
  return (
    <div className="container relative">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <h5>(Updated January 29, 2023)</h5>

      <br />

      <h3 className="text-2xl font-semibold">User Data handling and usage</h3>
      <p>
        For each direct interaction with the bot, I collect and store a number of properties for the user and the output. This includes user and server IDs and names, language used, game and segment, etc. The full code for the database can be viewed{" "}
        <a className="font-bold hover:underline" target="_blank" href="https://github.com/leonlarsson/bfstats-api">
          here
        </a>
        . Only I can ever access this data*, and is used as described below. This bot can never read any messages you send.
        <br />
        <br />
        The way I use this data is for statistical, analytical, and quality purposes, as well as monitoring for any bad content that breaks the{" "}
        <Link href="/tos" className="font-bold hover:underline">
          Terms of Service
        </Link>
        , such as harmful usernames or server names. It is also used in the{" "}
        <Link href="/data" className="font-bold hover:underline">
          data reporting page
        </Link>
        . I store basic user and server data for the purposes of being able to block users and servers from using the bot if they are found to be abusing the bot. I store the bot output (stats, image or text format) to continously improve the quality of the bot and to correct potential issues. No
        identifying information is ever shared with any parties.
      </p>

      <br />

      <h3 className="text-2xl font-semibold">User Locale, and how I use it</h3>
      <p>
        This bot has access to the language your Discord client currently is set to. It uses this language to <b>publicly</b> display stats and messages in your language**. If you don't want the bot to use your client language, you must specify a language yourself with the "language" option in the
        command.
      </p>

      <br />

      <h3 className="text-2xl font-semibold">Deleting your stats image***</h3>
      <p>
        After every stats output, you have 15 seconds to delete it by clicking the red "Delete" button. Since these images are ONLY hosted on Discord, this will remove the image completely****.
        <br />
        <Image src="/images/StatsDeleteButton.png" width={480} height={362} alt="Delete Button" />
      </p>

      <br />

      <h3 className="text-2xl font-semibold">API information</h3>
      <p>
        This bot gets data from{" "}
        <a className="font-bold hover:underline" target="_blank" href="https://battlefieldtracker.com/">
          Battlefield Tracker
        </a>{" "}
        and{" "}
        <a className="font-bold hover:underline" target="_blank" href="https://gametools.network/">
          Community Network
        </a>{" "}
        and does not alter the data received, and is not responsible for it.
        <br />
        <br />
        If you do not want your stats to be visible, you can disable this. Info in the links below:
        <br />
        <a className="font-bold hover:underline" target="_blank" href="https://help.ea.com/en/help/battlefield/battlefield-2042/battlefield-2042-stats-and-privacy/">
          Battlefield 2042
        </a>
        <br />
        <a className="font-bold hover:underline" target="_blank" href="https://help.ea.com/en/help/battlefield/battlefield-stats-display/">
          Battlefield V/1
        </a>
        <br />
        <br />
        <i>For Battlelog games, you can probably disable this on Battlelog or inside the respective games.</i>
      </p>

      <br />

      <h3 className="text-2xl font-semibold">Viewing your usage statistics</h3>
      <p>To view your usage statistics, you can use the /usage command. This will show you the number of times you've used the bot, grouped by game. This is only visible to you unless specified otherwise.</p>

      <br />

      <h3 className="text-2xl font-semibold">Requesting data redaction</h3>
      <p>
        If you want your data (user ID and username) to be redacted in the private database, you need to reach out to me on Discord. My username is <u className="select-all">mozzy</u>. Since I don't store any emails, emailing me does not work as verification. If you have your data redacted and then
        continue to use the bot, your data will once again be stored. Do not use the bot in this case.
      </p>

      <br />

      <h3 className="text-2xl font-semibold">Disclaimers</h3>
      <p>
        <i>
          *Some non-identifiable information such as game, segment, language, and stats sent is public. Visible in the APIs tab and{" "}
          <Link href="/data" className="font-bold hover:underline">
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
};
