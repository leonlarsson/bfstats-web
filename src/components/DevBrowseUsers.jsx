import { useRef, useState } from "react";
import StatsText from "./StatsText";

export default () => {

    const [errorText, setErrorText] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const apiKey = useRef();

    // Get users where the username or ID matches the search
    const filteredUsers = users.filter(user => [user.username, user.user_id].some(x => x.toLowerCase().includes(query.toLowerCase())));

    const handleButtonDisabled = () => setButtonDisabled(!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(apiKey.current.value));

    const fetchUsers = async () => {

        const res = await fetch("https://bfstats-api.leonlarsson.com/d1/users", {
            headers: {
                "API-KEY": apiKey.current.value,
                "D1-Query": "SELECT * FROM users ORDER BY total_stats_sent DESC"
            }
        });

        // If fetch is not okay, return and set data
        if (!res.ok) return setErrorText(res.status === 401 ? "Incorrect API key" : "Failed to fetch");

        // If users are not found, return and set data
        const usersArray = await res.json();
        if (!usersArray.length) return setErrorText("No users found");

        // Set data for when users are found
        setUsers(usersArray);
    }

    return (
        <div className="container">
            <StatsText />
            <hr />

            <h1 className="text-decoration-underline">Browse Users</h1>
            <h5>Press the button to fetch users.</h5>

            <label htmlFor="apiKeyInput">API Key*</label>
            <input type="text" className="form-control" id="apiKeyInput" required ref={apiKey} onInput={handleButtonDisabled} placeholder="API Key" />
            <div style={{ color: "darkred" }}><u>{errorText}</u></div>
            <br />
            <button className="btn btn-secondary" disabled={buttonDisabled} onClick={fetchUsers}>Fetch Users</button>
            <hr />
            <label htmlFor="searchInput">Search:</label>
            <input type="search" className="form-control mb-2" id="searchInput" onInput={e => setQuery(e.target.value)} placeholder="Username or ID" />
            <h3>{filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}:</h3>
            <div className="row">
                {filteredUsers.filter(user => user.username).map(user => <User key={user.user_id} user={user} apiKey={apiKey.current.value} />)}
            </div>
        </div >
    );
};

const User = ({ user, apiKey }) => {

    const showUserOutputs = async () => {
        const res = await fetch("https://bfstats-api.leonlarsson.com/d1/outputs", {
            headers: {
                "API-KEY": apiKey,
                "D1-Query": `SELECT * FROM outputs WHERE user_id = ${user.user_id}`
            }
        });
        const json = await res.json();
        console.log(`Outputs from ${user.username} (${user.user_id})\n`, json);

        return <h1>Hello</h1>
    }

    return (
        <div className="d-flex flex-column browseBox col border border-2 border-primary rounded p-2 m-2">
            <h4>{user.username} ({user.user_id})</h4>
            <h6>Stats sent: {user.total_stats_sent}</h6>
            <h6>Last language: {user.last_language}</h6>
            <h6>Last sent: {new Date(user.last_stats_sent).toUTCString()}</h6>
            <button className="btn btn-primary w-100 mt-auto" onClick={showUserOutputs}>Show Outputs (Console)</button>
        </div>
    );
}