const StatsText = async () => {

    const res = await fetch("https://api.battlefieldstats.com", {
        cache: "no-store"
    });

    const data = await res.json();

    return (
        <h3 className="text-center">
            In <b>{data.totalGuilds.toLocaleString("en-US")}</b> servers, with <b>{data.totalMembers.toLocaleString("en-US")}</b> members, and <b>{data.totalStatsSent.total.toLocaleString("en-US")}</b> stats sent.
        </h3>
    );
};

export default StatsText;