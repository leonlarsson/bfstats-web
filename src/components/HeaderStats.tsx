import { cn } from "@/lib/utils";
import { useQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { HomeIcon, SendIcon, StarIcon, User2Icon } from "lucide-react";
import type { BaseStats, CountsItem } from "types";
import { Icons } from "./icons";

export const HeaderStats = () => {
  const [baseDataQuery, last7DaysQuery] = useQueries({
    queries: [
      {
        queryKey: ["base-data"],
        queryFn: () => fetch("https://api.battlefieldstats.com/base").then((res) => res.json() as unknown as BaseStats),
        refetchInterval: 15_000,
      },
      {
        queryKey: ["header-stats", "last-7-days"],
        queryFn: async () =>
          fetch("https://api.battlefieldstats.com/outputs/counts/last-7-days").then(
            (res) => res.json() as unknown as CountsItem[],
          ),
      },
    ],
  });

  const baseData = baseDataQuery.data;
  const last7Days = last7DaysQuery.data;

  return (
    <div className="my-4">
      {/* Text - Only visible on smaller than sm */}
      <div className="block sm:hidden">
        <h3 className="my-2 text-center text-xl">
          <Link to="/data">
            In{" "}
            <b>
              {baseData?.totalGuilds.toLocaleString("en-US") ?? (
                <Icons.spinner className="inline size-6 animate-spin" />
              )}
            </b>{" "}
            servers, with{" "}
            <b>
              {baseData?.totalMembers.toLocaleString("en-US") ?? (
                <Icons.spinner className="inline size-6 animate-spin" />
              )}
            </b>{" "}
            members, and{" "}
            <b>
              {baseData?.totalStatsSent.total.toLocaleString("en") ?? (
                <Icons.spinner className="inline size-6 animate-spin" />
              )}
            </b>{" "}
            stats sent.
          </Link>
        </h3>
      </div>

      {/* Boxes - Only visible on small or larger */}
      <div className="my-4 hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        <StatsBox
          icon={<HomeIcon className="size-4 opacity-50" />}
          title="Servers"
          value={baseData?.totalGuilds.toLocaleString("en") ?? <Icons.spinner className="size-8 animate-spin" />}
        />
        <StatsBox
          icon={<User2Icon className="size-4 opacity-50" />}
          title="Members"
          value={baseData?.totalMembers.toLocaleString("en") ?? <Icons.spinner className="size-8 animate-spin" />}
        />
        <StatsBox
          icon={<SendIcon className="size-4 opacity-50" />}
          title="Stats Sent"
          value={
            baseData?.totalStatsSent.total.toLocaleString("en") ?? <Icons.spinner className="size-8 animate-spin" />
          }
        />
        <StatsBox
          icon={<StarIcon className="size-4 opacity-50 hover:text-yellow-300 hover:opacity-100" />}
          title="Most Popular Game (7d)"
          value={
            last7Days?.filter((x) => x.category === "game")[0]?.item ?? (
              <Icons.spinner className="size-8 animate-spin" />
            )
          }
        />
      </div>

      <hr />
    </div>
  );
};

const StatsBox = ({
  title,
  value,
  icon,
}: { title: string; value: string | React.ReactNode; icon?: React.ReactNode }) => (
  <Link
    className={cn("group flex flex-col gap-2 rounded border p-4 hover:border-black dark:hover:border-white")}
    to="/data"
  >
    <div className="flex justify-between">
      <span className="text-sm opacity-80">{title}</span>
      {icon}
    </div>
    <span className="text-2xl font-bold">{value}</span>
  </Link>
);
