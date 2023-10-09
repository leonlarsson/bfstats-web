import Link from "next/link";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Icons } from "@/components/icons";

export default () => {
  return (
    <div className="container relative">
      <div className="my-4 space-y-4">
        <p>
          <Link href="https://discord.com/application-directory/842768680252997662" target="_blank" className="font-semibold hover:underline">
            Battlefield Stats
          </Link>{" "}
          is the biggest Battlefield bot on Discord, delivering stats to thousands of users in thousands of servers. It was launched in 2021 and has since sent stats to users over 180,000 times.
        </p>

        <p>
          To use the bot yourself, simply{" "}
          <Link href="https://discord.com/oauth2/authorize?client_id=842768680252997662&scope=bot%20applications.commands" target="_blank" className="font-semibold hover:underline">
            <Icons.discord className="inline h-5 w-5" /> invite it to your Discord
          </Link>{" "}
          and run one of the commands. You can also run /help to get a full list of commands. Battlefield Stats supports all recent Battlefield games, including Battlefield 2042.
        </p>

        <p>
          In addition to displaying stats and leaderboards, some games also have extra commands such as <span className="whitespace-nowrap">/bf2042 experience</span> to see information about a Portal Experience or <span className="whitespace-nowrap">/bf2042 servers</span> to search and view
          information on servers.
        </p>
      </div>

      <Accordion className="mb-10" type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg">Supported Games</AccordionTrigger>
          <AccordionContent>
            <b>Battlefield Stats supports all major games:</b>
            <ul className="ml-4 list-inside list-disc">
              <li>Battlefield 2042</li>
              <li>Battlefield V + Firestorm</li>
              <li>Battlefield 1</li>
              <li>Battlefield Hardline</li>
              <li>Battlefield 4</li>
              <li>Battlefield 3</li>
              <li>Battlefield Bad Company 2</li>
              <li>Battlefield 2</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">Commands</AccordionTrigger>
          <AccordionContent>
            <b>These are the available commands:</b>
            <ul className="ml-4 list-inside list-disc">
              <li>/bf2042</li>
              <li>/bfv</li>
              <li>/bf1</li>
              <li>/bfh</li>
              <li>/bf4</li>
              <li>/bf3</li>
              <li>/bfbc2</li>
              <li>/bf2</li>
              <li>/usage</li>
              <li>/about</li>
              <li>/help</li>
              <li>/feedback</li>
              <li>/invite</li>
            </ul>

            <span>
              You can run <b>/help</b> to get a full list.
            </span>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg">PSA & Credits</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <p>
                This bot is not endorsed by, supported by, or affiliated with EA, DICE or any EA entity. All images displayed in this bot and its output are properties of EA/DICE. The bot uses stats from{" "}
                <Link href="https://battlefieldtracker.com/?utm_source=discord&utm_medium=full-stats&utm_campaign=mozzy-bot" target="_blank" className="font-bold hover:underline">
                  Tracker Network
                </Link>{" "}
                and{" "}
                <Link href="https://gametools.network/" target="_blank" className="font-bold hover:underline">
                  Community Network
                </Link>
                . This is not possible without these services.
              </p>

              <p>
                Read the{" "}
                <Link href="/privacy" className="font-bold hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/tos" className="font-bold hover:underline">
                  Terms of Service
                </Link>
                .
              </p>

              <p>Massive thanks to all the community translators: Sephi, PierrotL'Asticot, Matteo 'Forever.exe' Besutti, Navigando, Salty Tenten, Rephii, CaptPerry, TheLetslook, Szymon Olejniczak, Rubinsk, VIP-AHMAD-007, PeterSMK2, TR-BatuhanKara, Arall, Pug, Klikard, Dragory.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <h2 className="text-2xl font-semibold">Image Gallery</h2>
      <Image src="/images/example_bf2042.png" alt="Product image" className="min-w-full" width={1200} height={750} />
    </div>
  );
};
