import Link from "next/link";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default () => {
  return (
    <div className="container relative">
      <Accordion className="mb-10" type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Supported Games</AccordionTrigger>
          <AccordionContent>
            <b>These are the supported games:</b>
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
          <AccordionTrigger>Commands</AccordionTrigger>
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
          <AccordionTrigger>PSA & Credits</AccordionTrigger>
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

      <div className="mb-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded border p-3 transition-colors hover:border-black dark:hover:border-white">
          <span className="text-xl font-semibold">Faster</span>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi asperiores sequi labore enim, ex est excepturi laboriosam! Eaque nihil explicabo provident sint asperiores! Id, animi?</p>
        </div>
        <div className="rounded border p-3 transition-colors hover:border-black dark:hover:border-white">
          <span className="text-xl font-semibold">Stronger</span>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi asperiores sequi labore enim, ex est excepturi laboriosam! Eaque nihil explicabo provident sint asperiores! Id, animi?</p>
        </div>
        <div className="rounded border p-3 transition-colors hover:border-black dark:hover:border-white md:col-span-2 lg:col-span-1">
          <span className="text-xl font-semibold">Better</span>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi asperiores sequi labore enim, ex est excepturi laboriosam! Eaque nihil explicabo provident sint asperiores! Id, animi?</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">Image Gallery</h2>
      <p>To be more honest, also something new and marketingy.</p>
      <Image src="/images/example_bf2042.png" alt="Product image" className="min-w-full" width={1200} height={750} />
    </div>
  );
};
