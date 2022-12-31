import { useState } from "react";

export default () => {

    const [data, setData] = useState([]);

    const handleButtonDisabled = () => {
        const apiKey = document.getElementById("apiKeyInput").value;
        setData({ ...data, buttonDisabled: !/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(apiKey) });
    }

    const fetchOutputs = async () => {

        setData({ ...data, loadingText: "Fetching..." });

        const apiKey = document.getElementById("apiKeyInput").value;

        const res = await fetch("https://bfstats-api.leonlarsson.com/d1/output", { headers: { "API-KEY": apiKey } });

        // If fetch is not okay, return and set data
        if (!res.ok) return setData({ buttonDisabled: data.buttonDisabled, errorText: res.status === 401 ? "Incorrect API key" : "Failed to fetch" });

        // If user is not found, return and set data
        const outputs = await res.json();
        if (!outputs.length) return setData({ buttonDisabled: data.buttonDisabled, errorText: "No outputs found" });

        // Set data for when outputs are found
        setData({
            ...data,
            errorText: "",
            loadingText: "",
            outputs
        });
    }

    return (
        <div className="container">
            <h1>Browse Outputs</h1>
            <h5>Press the button to fetch outputs.</h5>

            <label htmlFor="apiKeyInput">API Key*</label>
            <input type="text" className="form-control" id="apiKeyInput" required onInput={handleButtonDisabled} placeholder="API Key" />
            <div style={{ color: "darkred" }}><u>{data.errorText}</u></div>
            <br />
            <button className="btn btn-secondary" disabled={data.buttonDisabled ?? true} onClick={fetchOutputs} id="button">Fetch Outputs</button>
            <hr />
            {data.outputs?.length && <h3>{data.outputs?.length} outputs:</h3>}
            <div className="row">
                {data.outputs?.map(output => <Output key={output.date} output={output} />)}
            </div>
        </div >
    );
};

const Output = ({ output }) => {
    return (
        <div className="browseBox col border border-2 border-primary rounded m-2">
            <h5>User: {output.username} ({output.user_id})</h5>
            <h5>Guild: {output.guildName} ({output.guild_id})</h5>
            <h5>Language: {output.language}</h5>
            <h5>Date: {output.date}</h5>
            <img src={output.image_url} alt="Stats Image" className="w-100 mb-1" />
        </div>
    );
}