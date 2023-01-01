import { useState } from "react";

export default () => {

    const [data, setData] = useState([]);

    const handleButtonDisabled = () => {
        const apiKey = document.getElementById("apiKeyInput").value;
        setData({ ...data, buttonDisabled: !/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(apiKey) });
    }

    const fetchOutput = async () => {

        setData({ ...data, loadingText: "Fetching..." });

        const apiKey = document.getElementById("apiKeyInput").value;
        const userId = document.getElementById("idInput").value;

        const res = await fetch("https://bfstats-api.leonlarsson.com/d1/outputs", {
            headers: {
                "API-KEY": apiKey,
                "D1-Query": userId ? `SELECT * FROM outputs WHERE user_id = "${userId}"` : "SELECT * FROM outputs"
            }
        });

        // If fetch is not okay, return and set data
        if (!res.ok) return setData({ buttonDisabled: data.buttonDisabled, errorText: res.status === 401 ? "Incorrect API key" : "Failed to fetch" });

        // If output is not found, return and set data
        const outputs = await res.json();
        if (!outputs.length) return setData({ buttonDisabled: data.buttonDisabled, errorText: userId ? `No user found with ID "${userId}"` : "No outputs found" });

        // Set output
        const output = outputs[Math.floor(Math.random() * outputs.length)];

        // Set data for when a valid output is found
        setData({
            ...data,
            errorText: "",
            loadingText: "",
            username: output.username,
            userId: output.user_id,
            guildName: output.guild_name,
            guildId: output.guild_id,
            language: output.language,
            date: new Date(output.date).toUTCString(),
            image: output.image_url
        });
    }

    return (
        <div className="container">
            <h1>Fetch Output</h1>
            <h5>Leave User ID blank to fetch a random output from any user. Fill it in to get a random output from from that user.</h5>

            <label htmlFor="apiKeyInput">API Key*</label>
            <input type="text" className="form-control" id="apiKeyInput" required onInput={handleButtonDisabled} placeholder="API Key" />
            <label htmlFor="idInput">Discord User ID</label>
            <input type="text" className="form-control" id="idInput" required placeholder="Discord User ID" />
            <div style={{ color: "darkred" }}><u>{data.errorText}</u></div>
            <br />
            <button className="btn btn-secondary" disabled={data.buttonDisabled ?? true} onClick={fetchOutput} id="button">Fetch Output</button>
            <hr />
            <span>{data.loadingText}</span>
            <h3>User: {data.username} {data.userId ? `(${data.userId})` : ""}</h3>
            <h3>Guild: {data.guildName} {data.guildId ? `(${data.guildId})` : ""}</h3>
            <h3>Language: {data.language}</h3>
            <h3>Date: {data.date}</h3>
            <img src={data.image} alt="Stats Image" className="w-100 mb-5" />
        </div>
    );
};