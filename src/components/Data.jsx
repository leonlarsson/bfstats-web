import { useQuery } from "@tanstack/react-query";
import StatsText from "./StatsText";

export default () => {

  // Get data and refetch every 20 seconds
  const { data: users, status: usersStatus } = useQuery({
    refetchOnMount: false,
    refetchInterval: 30_000,
    queryKey: ["usersData"], queryFn: async () => (await fetch("https://bfstats-api.leonlarsson.com/d1/users")).json()
  });

  const { data: outputs, status: outputsStatus } = useQuery({
    refetchOnMount: false,
    refetchInterval: 30_000,
    queryKey: ["outputsData"], queryFn: async () => (await fetch("https://bfstats-api.leonlarsson.com/d1/outputs")).json()
  });

  return (
    <div className="container">
      <StatsText />
      <hr />

      <h1 className="text-decoration-underline">Data Since January 1, 2023</h1>
      <h5>Updates every 30 seconds.</h5>

      {usersStatus === "success" && outputsStatus === "success" ?
        <div className="row">

          <div className="col-lg">
            <h3>Base stats</h3>
            <ul>
              <li><strong>{outputs.length.toLocaleString("en-US")}</strong> stats sent</li>
              <li><strong>{users.length.toLocaleString("en-US")}</strong> unique users</li>
            </ul>
          </div>

          <div className="col-lg">
            <h3>Stats sent per game</h3>
            <ul>
              {Array.from(new Set(outputs.map(x => x.game))).map((game, index) => <li key={index}>{game}: <strong>{outputs.filter(x => x.game === game).length.toLocaleString("en-US")}</strong></li>)}
            </ul>
          </div>

          <div className="col-lg">
            <h3>Stats sent per language</h3>
            <ul>
              {Array.from(new Set(outputs.map(x => x.language))).map((lang, index) => <li key={index}>{lang}: <strong>{outputs.filter(x => x.language === lang).length.toLocaleString("en-US")}</strong></li>)}
            </ul>
          </div>

          <div className="col-lg">
            <h3>Top 10 users were sent stats this many times</h3>
            <ol>
              <li>User was sent <strong>{users[0].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
              <li>User was sent <strong>{users[1].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
              <li>User was sent <strong>{users[2].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
              <li>User was sent <strong>{users[3].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
              <li>User was sent <strong>{users[4].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
              <li>User was sent <strong>{users[5].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
              <li>User was sent <strong>{users[6].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
              <li>User was sent <strong>{users[7].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
              <li>User was sent <strong>{users[8].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
              <li>User was sent <strong>{users[9].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>
            </ol>
          </div>
        </div>
        : usersStatus === "loading" || outputsStatus === "loading" ? <h3>Loading...</h3> : <h3 className="text-danger">Error. Retrying in 30 seconds...</h3>
      }
    </div>
  );
};