"use client";

import { useState, useTransition } from "react";
import humanizeDuration from "humanize-duration";
import { Outputs } from "./Charts";

const LastSentList = ({ outputs }: { outputs: Outputs }) => {

    const [showAllOutputs, setShowAllOutputs] = useState(false);
    const [isPending, startTransition] = useTransition();

    return (
        <div className="mb-5">
            <button
                className="btn btn-primary mb-2"
                disabled={isPending}
                onClick={() => startTransition(() => setShowAllOutputs(!showAllOutputs))}
            >
                {showAllOutputs ? "Show last 20" : `Show all ${outputs.length.toLocaleString("en-US")} (might freeze your browser)`} {isPending && <i className="fa-solid fa-spinner fa-spin" />}
            </button>
            <ul className="list-group list-group-numbered">
                {outputs
                    .sort((a, b) => b.date - a.date)
                    .slice(0, showAllOutputs ? -1 : 20)
                    .map(output => (
                        <li key={output.date} className="list-group-item">
                            <strong>{output.game} {output.segment}</strong> - <strong>{output.language}</strong> // <span suppressHydrationWarning title={new Date(output.date).toUTCString()}>{humanizeDuration(output.date - new Date().getTime(), { round: true })} ago</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default LastSentList;