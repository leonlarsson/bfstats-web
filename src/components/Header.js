/* eslint-disable react/jsx-no-target-blank */

import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/avatar.png";

export default () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg sticky-top bg-light mb-3">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand mb-0 h1">
                        <img src={logo} width="30px" height="30px" className="d-inline-block align-text-top" alt="Battlefield Stats Logo" /> Battlefield Stats
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav">
                        <div className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link"><i className="fa-solid fa-house"></i> Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/privacy" className="nav-link"><i className="fa-solid fa-lock"></i> Privacy Policy</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tos" className="nav-link"><i className="fa-solid fa-book"></i> Terms of Service</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-cog"></i> Dev</a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to="/dev-browse-users" className="dropdown-item">Browse Users</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dev-browse-outputs" className="dropdown-item">Browse Outputs</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <a href="https://bfstats-api.leonlarsson.com" target="_blank" className="nav-link"> <i className="fa-solid fa-code"></i> API</a>
                            <a href="https://top.gg/bot/842768680252997662" target="_blank" className="nav-link"> <i className="fa-solid fa-link"></i> Top.gg</a>
                            <a href="https://discord.com/oauth2/authorize?client_id=842768680252997662&scope=bot%20applications.commands" target="_blank" className="nav-link link-primary fw-bold"> <i className="fa-solid fa-right-to-bracket"></i> Invite</a>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}