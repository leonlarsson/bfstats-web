import { useRef, useState } from "react";

export default () => {

    const [errorText, setErrorText] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const apiKey = useRef();

    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()) || user.user_id.toLowerCase().includes(query.toLowerCase()));

    const handleButtonDisabled = () => setButtonDisabled(!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(apiKey.current.value));

    const fetchUsers = async () => {

        const res = await fetch("https://bfstats-api.leonlarsson.com/d1/users", { headers: { "API-KEY": apiKey.current.value } });

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
            <h1>Browse Users</h1>
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
                {filteredUsers.filter(user => user.username).map(user => <User key={user.user_id} user={user} />)}
            </div>
        </div >
    );
};

const User = ({ user }) => {
    return (
        <div className="browseBox col border border-2 border-primary rounded m-2">
            <h4>{user.username} ({user.user_id})</h4>
            <h6>Stats sent: {user.total_stats_sent}</h6>
            <h6>Last language: {user.last_language}</h6>
            <h6>Last sent: {new Date(user.last_stats_sent).toUTCString()}</h6>
        </div>
    );
}