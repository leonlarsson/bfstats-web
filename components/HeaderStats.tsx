import Link from "next/link";
import { HomeIcon, SendIcon, StarIcon, User2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseStats } from "@/types";
import { Icons } from "./icons";

export default async () => {
  const res = await fetch("https://api.battlefieldstats.com/base", { next: { revalidate: 60 } });
  const data: BaseStats | null = await res.json().catch(() => null);

  return (
    <div className="my-4">
      {/* Text - Only visible on smaller than sm */}
      <div className="block sm:hidden">
        <h3 className="my-2 text-center text-xl">
          <Link href="/data">
            In <b>{data?.totalGuilds.toLocaleString("en-US") ?? "unknown"}</b> servers, with <b>{data?.totalMembers.toLocaleString("en-US") ?? "unknown"}</b> members, and <b>{data?.totalStatsSent.total.toLocaleString("en") ?? "unknown"}</b> stats sent.
          </Link>
        </h3>
      </div>

      {/* Boxes - Only visible on small or larger */}
      <div className="my-4 hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        <StatsBox title="Servers" value={data?.totalGuilds.toLocaleString("en") ?? "Unknown"} icon={<HomeIcon className="size-4 opacity-50" />} />
        <StatsBox title="Members" value={data?.totalMembers.toLocaleString("en") ?? "Unknown"} icon={<User2Icon className="size-4 opacity-50" />} />
        <StatsBox title="Stats Sent" value={data?.totalStatsSent.total.toLocaleString("en") ?? "Unknown"} icon={<SendIcon className="size-4 opacity-50" />} />
        <StatsBox title="Most Popular Game" value={data ? Object.entries(data.totalStatsSent.games).sort((a, b) => b[1] - a[1])[0][0] : "Unknown"} icon={<StarIcon className="size-4 opacity-50 hover:text-yellow-300 hover:opacity-100" />} />
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
