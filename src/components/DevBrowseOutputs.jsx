import { useRef, useState } from "react";

export default () => {

    const [errorText, setErrorText] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [outputs, setOutputs] = useState([]);
    const [query, setQuery] = useState("");
    const apiKey = useRef();

    // Get outputs where the username/guild name or IDs match the search
    const filteredOutputs = outputs.filter(output => [output.username, output.user_id, output.guild_name, output.guild_id].some(x => x?.toLowerCase().includes(query.toLowerCase())));

    const handleButtonDisabled = () => setButtonDisabled(!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(apiKey.current.value));

    const fetchOutputs = async () => {

        const res = await fetch("https://bfstats-api.leonlarsson.com/d1/outputs", { headers: { "API-KEY": apiKey.current.value } });

        // If fetch is not okay, return and set data
        if (!res.ok) return setErrorText(res.status === 401 ? "Incorrect API key" : "Failed to fetch");

        // If outputs are not found, return and set data
        const outputsArray = await res.json();
        if (!outputsArray.length) return setErrorText("No outputs found");

        // Set data for when outputs are found
        setOutputs(outputsArray);
    }

    return (
        <div className="container">
            <h1>Browse Outputs</h1>
            <h5>Press the button to fetch outputs.</h5>

            <label htmlFor="apiKeyInput">API Key*</label>
            <input type="text" className="form-control" id="apiKeyInput" required ref={apiKey} onInput={handleButtonDisabled} placeholder="API Key" />
            <div style={{ color: "darkred" }}><u>{errorText}</u></div>
            <br />
            <button className="btn btn-secondary" disabled={buttonDisabled} onClick={fetchOutputs}>Fetch Outputs</button>
            <hr />
            <label htmlFor="searchInput">Search:</label>
            <input type="search" className="form-control mb-2" id="searchInput" onInput={e => setQuery(e.target.value)} placeholder="Username, Guild name or IDs" />
            <h3>{filteredOutputs.length} {filteredOutputs.length === 1 ? "output" : "outputs"}:</h3>
            <div className="row">
                {filteredOutputs.map(output => <Output key={output.date} output={output} />)}
            </div>
        </div >
    );
};

const Output = ({ output }) => {
    return (
        <div className="browseBox col border border-2 border-primary rounded m-2">
            <h5>User: {output.username} ({output.user_id})</h5>
            <h5>Guild: {output.guild_id ? `${output.guild_name} (${output.guild_id})` : "DM"}</h5>
            <h5>Language: {output.language}</h5>
            <h5>Date: {new Date(output.date).toUTCString()}</h5>
            {output.image_url ? <img src={output.image_url} alt="Stats Image" className="w-100 mb-1" loading="lazy" /> : <h5>Text variant: {output.game} {output.segment}</h5>}
        </div>
    );
}