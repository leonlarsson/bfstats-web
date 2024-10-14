import Link from "next/link";
import { HomeIcon, SendIcon, StarIcon, User2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseStats, CountsItem } from "@/types";
import { Icons } from "./icons";

export default async () => {
  const [baseData, last7Days] = await Promise.all([fetch("https://api.battlefieldstats.com/base").then(res => res.json() as unknown as BaseStats), fetch("https://api.battlefieldstats.com/outputs/counts/last-7-days").then(res => res.json() as unknown as CountsItem[])]);

  return (
    <div className="my-4">
      {/* Text - Only visible on smaller than sm */}
      <div className="block sm:hidden">
        <h3 className="my-2 text-center text-xl">
          <Link href="/data">
            In <b>{baseData?.totalGuilds.toLocaleString("en-US") ?? "unknown"}</b> servers, with <b>{baseData?.totalMembers.toLocaleString("en-US") ?? "unknown"}</b> members, and <b>{baseData?.totalStatsSent.total.toLocaleString("en") ?? "unknown"}</b> stats sent.
          </Link>
        </h3>
      </div>

      {/* Boxes - Only visible on small or larger */}
      <div className="my-4 hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        <StatsBox title="Servers" value={baseData?.totalGuilds.toLocaleString("en") ?? "Unknown"} icon={<HomeIcon className="size-4 opacity-50" />} />
        <StatsBox title="Members" value={baseData?.totalMembers.toLocaleString("en") ?? "Unknown"} icon={<User2Icon className="size-4 opacity-50" />} />
        <StatsBox title="Stats Sent" value={baseData?.totalStatsSent.total.toLocaleString("en") ?? "Unknown"} icon={<SendIcon className="size-4 opacity-50" />} />
        <StatsBox title="Most Popular Game (7d)" value={last7Days.filter(x => x.category === "game")[0]?.item ?? "Unknown"} icon={<StarIcon className="size-4 opacity-50 hover:text-yellow-300 hover:opacity-100" />} />
      </div>

      <hr />
    </div>
  );
};

export const HeaderStatsSkeleton = () => (
  <div className="my-4">
    <div className="block sm:hidden">
      <h3 className="my-2 text-center text-xl">
        In{" "}
        <b>
          <Icons.spinner className="inline animate-spin" />
        </b>{" "}
        servers, with{" "}
        <b>
          <Icons.spinner className="inline animate-spin" />
        </b>{" "}
        members, and{" "}
        <b>
          <Icons.spinner className="inline animate-spin" />
        </b>{" "}
        stats sent.
      </h3>
    </div>

    <div className="my-4 hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
      <StatsBox title="Servers" value={<Icons.spinner className="size-8 animate-spin" />} icon={<HomeIcon className="size-4 opacity-50" />} />
      <StatsBox title="Members" value={<Icons.spinner className="size-8 animate-spin" />} icon={<User2Icon className="size-4 opacity-50" />} />
      <StatsBox title="Stats Sent" value={<Icons.spinner className="size-8 animate-spin" />} icon={<SendIcon className="size-4 opacity-50" />} />
      <StatsBox title="Most Popular Game" value={<Icons.spinner className="size-8 animate-spin" />} icon={<StarIcon className="size-4 opacity-50" />} />
    </div>

    <hr />
  </div>
);

const StatsBox = ({ title, value, icon }: { title: string; value: string | React.ReactNode; icon?: React.ReactNode }) => (
  <Link href="/data" className={cn("group flex flex-col gap-2 rounded border p-4 transition-colors hover:border-black dark:hover:border-white")}>
    <div className="flex justify-between">
      <span className="text-sm opacity-80">{title}</span>
      {icon}
    </div>
    <span className="text-2xl font-bold">{value}</span>
  </Link>
);
