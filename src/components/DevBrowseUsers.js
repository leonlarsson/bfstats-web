import { useState } from "react";

export default () => {

    const [data, setData] = useState([]);

    const handleButtonDisabled = () => {
        const apiKey = document.getElementById("apiKeyInput").value;
        setData({ ...data, buttonDisabled: !/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(apiKey) });
    }

    const fetchUsers = async () => {

        setData({ ...data, loadingText: "Fetching..." });

        const apiKey = document.getElementById("apiKeyInput").value;

        const res = await fetch("https://bfstats-api.leonlarsson.com/d1/users", { headers: { "API-KEY": apiKey } });

        // If fetch is not okay, return and set data
        if (!res.ok) return setData({ buttonDisabled: data.buttonDisabled, errorText: res.status === 401 ? "Incorrect API key" : "Failed to fetch" });

        // If user is not found, return and set data
        const users = await res.json();
        if (!users.length) return setData({ buttonDisabled: data.buttonDisabled, errorText: "No users found" });

        // Set data for when users are found
        setData({
            ...data,
            errorText: "",
            loadingText: "",
            users
        });
    }

    return (
        <div className="container">
            <h1>Browse Users</h1>
            <h5>Press the button to fetch users.</h5>

            <label htmlFor="apiKeyInput">API Key*</label>
            <input type="text" className="form-control" id="apiKeyInput" required onInput={handleButtonDisabled} placeholder="API Key" />
            <div style={{ color: "darkred" }}><u>{data.errorText}</u></div>
            <br />
            <button className="btn btn-secondary" disabled={data.buttonDisabled ?? true} onClick={fetchUsers} id="button">Fetch Users</button>
            <hr />
            {data.users?.length && <h3>{data.users?.length} users:</h3>}
            <div className="row">
                {data.users?.map(user => <User key={user.user_id} user={user} />)}
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