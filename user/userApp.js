const app = Vue.createApp({
    data() {
        return {
            user: {
                username: "",
                userId: "",
                statsSent: "",
                lastLanguage: "",
                lastSent: ""
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
        async getUser() {

            this.loadingText = "Loading...";

            const apiKey = document.getElementById("apiKeyInput").value;
            const userId = document.getElementById("idInput").value;

            const res = await fetch("https://bfstats-api.leonlarsson.com/d1/users", {
                headers: {
                    "API-KEY": apiKey,
                    "D1-Query": userId ? `SELECT * FROM users WHERE user_id = "${userId}"` : "SELECT * FROM users"
                }
            });

            if (!res.ok) return this.fetchNotOK(res.status);
            const users = await res.json();
            if (!users.length) return this.noUsersFound(userId);
            const user = users[Math.floor(Math.random() * users.length)];

            this.user.username = user.username;
            this.user.userId = `(${user.user_id})`;
            this.user.statsSent = user.total_stats_sent
            this.user.lastLanguage = user.last_language;
            this.user.lastSent = new Date(user.last_stats_sent).toUTCString();
            this.errorText = "";
            this.loadingText = "";
        },
        fetchNotOK(status) {
            this.errorText = status === 401 ? "Incorrect API key" : "Failed to fetch";
            this.loadingText = "";
            this.emptyUserData();
        },
        noUsersFound(userId) {
            this.errorText = userId ? `No user found with ID "${userId}"` : "No users found";
            this.loadingText = "";
            this.emptyUserData();
        },
        emptyUserData() {
            this.user.username = "";
            this.user.userId = "";
            this.user.statsSent = "";
            this.user.lastLanguage = "";
            this.user.lastSent = "";
        }
    }
});

app.mount("#app");