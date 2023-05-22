"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
    const pathname = usePathname();
    const navLinkClass = (url: string) => pathname === url ? "nav-link active" : "nav-link";

    return (
        <nav className="navbar navbar-expand-xl sticky-top bg-light mb-3 border-bottom">
            <div className="container-fluid">
                <Link href="/" className="navbar-brand mb-0 h1">
                    <img src="/images/avatar.png" width="30px" height="30px" className="d-inline-block align-text-top" alt="Battlefield Stats Logo" /> Battlefield Stats
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="nav">
                    <div className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/" className={navLinkClass("/")}><i className="fa-solid fa-house fa-fw"></i> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/privacy" className={navLinkClass("/privacy")}><i className="fa-solid fa-lock fa-fw"></i> Privacy Policy</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/tos" className={navLinkClass("/tos")}><i className="fa-solid fa-book fa-fw"></i> Terms of Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/data" className={navLinkClass("/data")}><i className="fa-solid fa-chart-simple fa-fw"></i> Data</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-code fa-fw"></i> API</a>
                            <ul className="dropdown-menu">
                                <APILink url="https://api.battlefieldstats.com" title="Base" />
                                <APILink url="https://api.battlefieldstats.com/d1/users/top" title="Users (top 20)" />
                                <APILink url="https://api.battlefieldstats.com/d1/users/counts" title="Users (total)" />
                                <APILink url="https://api.battlefieldstats.com/d1/users/special" title="Users (top 20 + total)" />
                                <APILink url="https://api.battlefieldstats.com/d1/outputs/counts" title="Outputs (counts)" />
                                <APILink url="https://api.battlefieldstats.com/d1/outputs/last" title="Outputs (last 20)" />
                            </ul>
                        </li>
                        <a href="https://twitter.com/mozzyfx" target="_blank" className="nav-link"> <i className="fa-brands fa-twitter fa-fw"></i> Twitter</a>
                        <a href="https://discord.com/oauth2/authorize?client_id=842768680252997662&scope=bot%20applications.commands" target="_blank" className="nav-link link-primary fw-bold"> <i className="fa-brands fa-discord fa-fw"></i> Add to Discord</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;

const APILink = ({ url, title }: { url: string, title: string }) => <a href={url} target="_blank" className="dropdown-item">{title} <i className="fa-solid fa-up-right-from-square fa-fw"></i></a>;