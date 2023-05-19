import humanizeDuration from "humanize-duration";
import type { Output } from "@/types";

const LastSentList = ({ outputs }: { outputs: Output[] }) => {

    return (
        <div className="mb-5">
            <ul className="list-group list-group-numbered">
                {outputs.map(output => (
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