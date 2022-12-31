import { useState } from "react";

export default () => {

    const [data, setData] = useState([]);

    const handleButtonDisabled = () => {
        const apiKey = document.getElementById("apiKeyInput").value;
        setData({ ...data, buttonDisabled: !/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(apiKey) });
    }

    const fetchUser = async () => {

        setData({ ...data, loadingText: "Fetching..." });

        const apiKey = document.getElementById("apiKeyInput").value;
        const userId = document.getElementById("idInput").value;

        const res = await fetch("https://bfstats-api.leonlarsson.com/d1/users", {
            headers: {
                "API-KEY": apiKey,
                "D1-Query": userId ? `SELECT * FROM users WHERE user_id = "${userId}"` : "SELECT * FROM users"
            }
        });

        // If fetch is not okay, return and set data
        if (!res.ok) return setData({ buttonDisabled: data.buttonDisabled, errorText: res.status === 401 ? "Incorrect API key" : "Failed to fetch" });

        // If user is not found, return and set data
        const users = await res.json();
        if (!users.length) return setData({ buttonDisabled: data.buttonDisabled, errorText: userId ? `No user found with ID "${userId}"` : "No users found" });

        // Set user
        const user = users[Math.floor(Math.random() * users.length)];

        // Set data for when a valid user is found
        setData({
            ...data,
            errorText: "",
            loadingText: "",
            username: user.username,
            userId: user.user_id,
            statsSent: user.total_stats_sent,
            lastLanguage: user.last_language,
            lastSent: new Date(user.last_stats_sent).toUTCString()
        });
    }

    return (
        <div className="container-md">
            <h1>Fetch User</h1>
            <h5>Leave User ID blank to fetch a random user.</h5>

            <label htmlFor="apiKeyInput">API Key*</label>
            <input type="text" className="form-control" id="apiKeyInput" required onInput={handleButtonDisabled} placeholder="API Key" />
            <label htmlFor="idInput">Discord User ID</label>
            <input type="text" className="form-control" id="idInput" required placeholder="Discord User ID" />
            <div style={{ color: "darkred" }}><u>{data.errorText}</u></div>
            <br />
            <button className="btn btn-secondary" disabled={data.buttonDisabled ?? true} onClick={fetchUser} id="button">Fetch User</button>
            <hr />
            <span>{data.loadingText}</span>
            <h3>User: {data.username} {data.userId ? `(${data.userId})` : ""}</h3>
            <h3>Stats sent: {data.statsSent}</h3>
            <h3>Last language: {data.lastLanguage}</h3>
            <h3>Last sent: {data.lastSent}</h3>
        </div>
    );
};