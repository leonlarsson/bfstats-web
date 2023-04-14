import { BaseStats } from "@/types";

const StatsText = async () => {

    try {
        const res = await fetch("https://api.battlefieldstats.com", { next: { revalidate: 60 } });
        const data: BaseStats = await res.json();

        return (
            <>
                <h3 className="text-center">
                    In <b>{data.totalGuilds.toLocaleString("en-US")}</b> servers, with <b>{data.totalMembers.toLocaleString("en-US")}</b> members, and <b>{data.totalStatsSent.total.toLocaleString("en-US")}</b> stats sent.
                </h3>
                <hr />
            </>
        );
    } catch (error) {
        return null;
    }
};

export default StatsText;