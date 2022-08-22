class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const homeActive = this.getAttribute("page") === "home" ? "active" : "";
        const privacyActive = this.getAttribute("page") === "privacy" ? "active" : "";
        const tosActive = this.getAttribute("page") === "tos" ? "active" : "";
        this.innerHTML = `
        <nav class="navbar navbar-expand-md sticky-top bg-light mb-3">
        <div class="container-fluid">
            <a class="navbar-brand mb-0 h1" href="/">
                <img src="../assets/images/avatar.png" width="30px" height="30px" class="d-inline-block align-text-top">
                Battlefield Stats
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
                aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nav">
                <div class="navbar-nav">
                    <a href="/" class="nav-link ${homeActive}"><i class="fa-solid fa-house"></i> Home</a>
                    <a href="/privacy" class="nav-link ${privacyActive}"><i class="fa-solid fa-lock"></i> Privacy Policy</a>
                    <a href="/tos" class="nav-link ${tosActive}"><i class="fa-solid fa-book"></i> Terms of Service</a>
                    <a href="https://bfstats-api.leonlarsson.com" target="_blank" class="nav-link">
                        <i class="fa-solid fa-code"></i> API</a>
                    <a href="https://top.gg/bot/842768680252997662" target="_blank" class="nav-link">
                        <i class="fa-solid fa-link"></i> Top.gg</a>
                    <a href="https://discord.com/oauth2/authorize?client_id=842768680252997662&scope=bot%20applications.commands"
                        target="_blank" class="nav-link link-primary fw-bold">
                        <i class="fa-solid fa-right-to-bracket"></i> Invite</a>
                </div>
            </div>
        </div>
    </nav>
    `;
    }
}

customElements.define("header-component", Header);