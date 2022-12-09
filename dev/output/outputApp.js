const app = Vue.createApp({
    data() {
        return {
            output: {
                username: "",
                userId: "",
                guildName: "",
                guildId: "",
                language: "",
                date: "",
                image: ""
            },
            errorText: "",
            loadingText: ""
        }
    },
    methods: {
        handleButtonDisabled() {
            const apiKey = document.getElementById("apiKeyInput").value;
            const button = document.getElementById("button");
            button.disabled = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(apiKey) ? false : true;
        },
        async getOutput() {

            this.loadingText = "Loading...";

            const apiKey = document.getElementById("apiKeyInput").value;
            const userId = document.getElementById("idInput").value;

            const res = await fetch("https://bfstats-api.leonlarsson.com/d1/output", {
                headers: {
                    "API-KEY": apiKey,
                    "D1-Query": userId ? `SELECT * FROM output WHERE user_id = "${userId}"` : "SELECT * FROM output"
                }
            });

            if (!res.ok) return this.fetchNotOK(res.status);
            const outputs = await res.json();
            if (!outputs.length) return this.noOutputsFound(userId);
            const output = outputs[Math.floor(Math.random() * outputs.length)];

            this.output.username = output.username;
            this.output.userId = `(${output.user_id})`;
            this.output.guildName = output.guild_name;
            this.output.guildId = `(${output.guild_id})`;
            this.output.language = output.language;
            this.output.date = new Date(output.date).toUTCString();
            this.output.image = output.image_url;
            this.errorText = "";
            this.loadingText = "";
        },
        fetchNotOK(status) {
            this.errorText = status === 401 ? "Incorrect API key" : "Failed to fetch";
            this.loadingText = "";
            this.emptyOutputData();
        },
        noOutputsFound(userId) {
            this.errorText = userId ? `No user found with ID "${userId}"` : "No outputs found";
            this.loadingText = "";
            this.emptyOutputData();
        },
        emptyOutputData() {
            this.output.username = "";
            this.output.userId = "";
            this.output.guildName = "";
            this.output.guildId = "";
            this.output.language = "";
            this.output.date = "";
            this.output.image = "";
        }
    }
});

app.mount("#app");