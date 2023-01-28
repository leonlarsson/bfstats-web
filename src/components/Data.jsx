import { useQuery } from "@tanstack/react-query";
import StatsText from "./StatsText";

export default () => {

  // Get data and refetch every 60 seconds
  const { data: baseStats, status: baseStatus } = useQuery({
    refetchOnMount: false,
    refetchInterval: 60_000,
    queryKey: ["baseData"], queryFn: async () => (await fetch("https://bfstats-api.leonlarsson.com/")).json()
  });

  const { data: users, status: usersStatus } = useQuery({
    refetchOnMount: false,
    refetchInterval: 60_000,
    queryKey: ["usersData"], queryFn: async () => (await fetch("https://bfstats-api.leonlarsson.com/d1/users")).json()
  });

  const { data: outputs, status: outputsStatus } = useQuery({
    refetchOnMount: false,
    refetchInterval: 60_000,
    queryKey: ["outputsData"], queryFn: async () => (await fetch("https://bfstats-api.leonlarsson.com/d1/outputs")).json()
  });

  return (
    <div className="container pb-5">
      <StatsText />
      <hr />

      <h1 className="text-decoration-underline">Data</h1>
      <h5>Updates every 60 seconds.</h5>

      {baseStatus === "success" && usersStatus === "success" && outputsStatus === "success" ?
        <div>
          <h3>Since January 1, 2023</h3>
          <div className="row">

            <div className="col-lg">
              <h4>Base stats</h4>
              <ul className="list-group">
                <li className="list-group-item"><strong>{outputs.length.toLocaleString("en-US")}</strong> stats sent</li>
                <li className="list-group-item"><strong>{users.length.toLocaleString("en-US")}</strong> unique users</li>
              </ul>
            </div>

            <div className="col-lg">
              <h4>Stats sent per game</h4>
              <ul className="list-group">
                {Array.from(new Set(outputs.map(x => x.game))).map((game, index) => <li className="list-group-item" key={index}>{game}: <strong>{outputs.filter(x => x.game === game).length.toLocaleString("en-US")}</strong></li>)}
              </ul>
            </div>

            <div className="col-lg">
              <h4>Stats sent per language</h4>
              <ul className="list-group">
                {Array.from(new Set(outputs.map(x => x.language))).map((lang, index) => <li className="list-group-item" key={index}>{lang}: <strong>{outputs.filter(x => x.language === lang).length.toLocaleString("en-US")}</strong></li>)}
              </ul>
            </div>

            <div className="col-lg">
              <h4>Top 10 users</h4>
              <ol className="list-group list-group-numbered">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x, index) => <li className="list-group-item" key={index}>User was sent <strong>{users[x].total_stats_sent.toLocaleString("en-US")}</strong> stats</li>)}
              </ol>
            </div>
          </div>

          <hr />

          <h3>Total</h3>
          <div className="row">

            <div className="col-lg">
              <h4>Base stats</h4>
              <ul className="list-group">
                <li className="list-group-item"><strong>{baseStats.totalStatsSent.total.toLocaleString("en-US")}</strong> stats sent</li>
              </ul>
            </div>

            <div className="col-lg">
              <h4>Stats sent per game</h4>
              <ul className="list-group">
                {Object.entries(baseStats.totalStatsSent.games).map((game, index) => <li className="list-group-item" key={index}>{game[0]}: <strong>{game[1].toLocaleString("en-US")}</strong></li>)}
              </ul>
            </div>

            <div className="col-lg">
              <h4>Stats sent per language</h4>
              <ul className="list-group">
                {Object.entries(baseStats.totalStatsSent.languages).map((lang, index) => <li className="list-group-item" key={index}>{lang[0]}: <strong>{lang[1].toLocaleString("en-US")}</strong></li>)}
              </ul>
            </div>
          </div>
        </div>
        : baseStatus === "loading" || usersStatus === "loading" || outputsStatus === "loading" ? <h4>Loading...</h4> : <h4 className="text-danger">Error. Retrying in 30 seconds...</h4>
      }
    </div>
  );
};