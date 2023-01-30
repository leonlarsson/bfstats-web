import { useQuery } from "@tanstack/react-query";

export default () => {

    // Fetch data every 60 seconds. Don't refetch when the user switches back to the Home page
    const { data } = useQuery({
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: 60_000,
        queryKey: ["statsData"], queryFn: async () => (await fetch("https://bfstats-api.leonlarsson.com")).json()
    });

    return <h3 className="text-center">
        In <b>{data?.totalGuilds.toLocaleString("en-US") ?? "x"}</b> servers, with <b>{data?.totalMembers.toLocaleString("en-US") ?? "y"}</b> members, and <b>{data?.totalStatsSent.total.toLocaleString("en-US") ?? "z"}</b> stats sent.
    </h3>
}