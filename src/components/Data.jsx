import humanizeDuration from "humanize-duration";
import WordArt from "react-wordart";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import StatsText from "./StatsText";

ChartJS.register(ArcElement, Tooltip, Legend);

export default () => {

  const [showAllOutputs, setShowAllOutputs] = useState(false);

  // Get data and refetch every 60 seconds
  const { data: baseStats, status: baseStatus } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 60_000,
    queryKey: ["baseData"], queryFn: async () => (await fetch("https://bfstats-api.leonlarsson.com/")).json()
  });

  const { data: users, status: usersStatus } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 60_000,
    queryKey: ["usersData"], queryFn: async () => (await fetch("https://bfstats-api.leonlarsson.com/d1/users")).json()
  });

  const { data: outputs, status: outputsStatus } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 60_000,
    queryKey: ["outputsData"], queryFn: async () => (await fetch("https://bfstats-api.leonlarsson.com/d1/outputs")).json()
  });

  return (
    <div className="container pb-5">
      <StatsText />
      <hr />

      {/* <h1 className="text-decoration-underline">Data</h1> */}
      <WordArt text='Data' theme="blues" fontSize={50} />
      <h5>All data updates every 60 seconds.</h5>

      {baseStatus === "success" && usersStatus === "success" && outputsStatus === "success" ?
        <div>
          <h3>Since January 1, 2023</h3>
          <div className="mb-3">
            <ul className="list-group">
              <li className="list-group-item"><strong>{outputs.length.toLocaleString("en-US")}</strong> stats sent</li>
              <li className="list-group-item"><strong>{users.length.toLocaleString("en-US")}</strong> unique users</li>
            </ul>
          </div>

          <div className="row">
            <div className="col-lg mb-3">
              <h4>Stats sent per game</h4>
              <ul className="list-group">
                {Array.from(new Set(outputs.map(output => output.game))).map((game, index) => <li className="list-group-item" key={index}>{game}: <strong>{outputs.filter(output => output.game === game).length.toLocaleString("en-US")}</strong> ({(outputs.filter(output => output.game === game).length / outputs.length * 100).toFixed(1)}%)</li>)}
                <li className="list-group-item">
                  <Doughnut data={{
                    labels: Array.from(new Set(outputs.map(x => x.game))),
                    datasets: [
                      {
                        label: " # of stats sent",
                        data: Array.from(new Set(outputs.map(output => output.game))).map(game => outputs.filter(output => output.game === game).length),
                        hoverBackgroundColor: "grey",
                        hoverOffset: 7
                      }
                    ]
                  }} />
                </li>
              </ul>
            </div>

            <div className="col-lg mb-3">
              <h4>Stats sent per segment</h4>
              <ul className="list-group">
                {Array.from(new Set(outputs.map(output => output.segment))).map((segment, index) => <li className="list-group-item" key={index}>{segment}: <strong>{outputs.filter(output => output.segment === segment).length.toLocaleString("en-US")}</strong> ({(outputs.filter(output => output.segment === segment).length / outputs.length * 100).toFixed(1)}%)</li>)}
                <li className="list-group-item">
                  <Doughnut data={{
                    labels: Array.from(new Set(outputs.map(output => output.segment))),
                    datasets: [
                      {
                        label: " # of stats sent",
                        data: Array.from(new Set(outputs.map(output => output.segment))).map(segment => outputs.filter(output => output.segment === segment).length),
                        hoverBackgroundColor: "grey",
                        hoverOffset: 7
                      }
                    ]
                  }} />
                </li>
              </ul>
            </div>

            <div className="col-lg mb-3">
              <h4>Stats sent per language</h4>
              <ul className="list-group">
                {Array.from(new Set(outputs.map(output => output.language))).map((language, index) => <li className="list-group-item" key={index}>{language}: <strong>{outputs.filter(output => output.language === language).length.toLocaleString("en-US")}</strong> ({(outputs.filter(output => output.language === language).length / outputs.length * 100).toFixed(1)}%)</li>)}
                <li className="list-group-item">
                  <Doughnut data={{
                    labels: Array.from(new Set(outputs.map(output => output.language))),
                    datasets: [
                      {
                        label: " # of stats sent",
                        data: Array.from(new Set(outputs.map(output => output.language))).map(language => outputs.filter(output => output.language === language).length),
                        hoverBackgroundColor: "grey",
                        hoverOffset: 7
                      }
                    ]
                  }} />
                </li>
              </ul>
            </div>

            <div className="col-lg">
              <h4>Top users</h4>
              <ol className="list-group list-group-numbered">
                {users.slice(0, 20).map((user, index) => <li className="list-group-item" key={index}>User was sent <strong>{user.total_stats_sent.toLocaleString("en-US")}</strong> stats</li>)}
              </ol>
            </div>
          </div>

          <hr className="border border-primary border-2 opacity-75 rounded" />

          <h3>Total</h3>
          <div className="mb-3">
            <ul className="list-group">
              <li className="list-group-item"><strong>{baseStats.totalStatsSent.total.toLocaleString("en-US")}</strong> stats sent</li>
            </ul>
          </div>

          <div className="row">
            <div className="col-lg mb-3">
              <h4>Stats sent per game</h4>
              <ul className="list-group">
                {Object.entries(baseStats.totalStatsSent.games).map((game, index) => <li className="list-group-item" key={index}>{game[0]}: <strong>{game[1].toLocaleString("en-US")}</strong> ({(game[1] / baseStats.totalStatsSent.total * 100).toFixed(1)}%)</li>)}
                <li className="list-group-item">
                  <Doughnut data={{
                    labels: Object.entries(baseStats.totalStatsSent.games).map(game => game[0]),
                    datasets: [
                      {
                        label: " # of stats sent",
                        data: Object.entries(baseStats.totalStatsSent.games).map(game => game[1]),
                        hoverBackgroundColor: "grey",
                        hoverOffset: 7
                      }
                    ]
                  }} />
                </li>
              </ul>
            </div>

            <div className="col-lg mb-3">
              <h4>Stats sent per language</h4>
              <ul className="list-group">
                {Object.entries(baseStats.totalStatsSent.languages).map((language, index) => <li className="list-group-item" key={index}>{language[0]}: <strong>{language[1].toLocaleString("en-US")}</strong> ({(language[1] / baseStats.totalStatsSent.total * 100).toFixed(1)}%)</li>)}
                <li className="list-group-item">
                  <Doughnut data={{
                    labels: Object.entries(baseStats.totalStatsSent.languages).map(language => language[0]),
                    datasets: [
                      {
                        label: " # of stats sent",
                        data: Object.entries(baseStats.totalStatsSent.languages).map(language => language[1]),
                        hoverBackgroundColor: "grey",
                        hoverOffset: 7
                      }
                    ]
                  }} />
                </li>
              </ul>
            </div>
          </div>

          <hr className="border border-primary border-2 opacity-75 rounded" />

          <h3>Last stats sent</h3>
          <div className="mb-3">
            <button className="btn btn-primary mb-2" onClick={() => setShowAllOutputs(!showAllOutputs)}>{showAllOutputs ? "Back to top 20" : "Show all outputs (SLOW)"}</button>
            <ul className="list-group list-group-numbered">
              {outputs.sort((a, b) => b.date - a.date).slice(0, showAllOutputs ? -1 : 20).map((output, index) => <li key={index} className="list-group-item"><strong>{output.game} {output.segment}</strong> - <strong>{output.language}</strong> // {new Date(output.date).toUTCString()} ({humanizeDuration(output.date - new Date(), { round: true })} ago)</li>)}
            </ul>
          </div>
        </div>
        : baseStatus === "loading" || usersStatus === "loading" || outputsStatus === "loading" ? <h4>Loading...</h4> : <h4 className="text-danger">Error. Retrying in 30 seconds...</h4>
      }
    </div>
  );
};