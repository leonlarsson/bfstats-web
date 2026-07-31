# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, both of which the site must serve:

- **Individual Battlefield players** who install the bot on their own Discord account and use it anywhere, in any server or DM. This path has overtaken server installs in growth speed because it needs no admin approval — a player can go from landing page to working bot in one step.
- **Discord server admins** running Battlefield or gaming communities, who install once on behalf of everyone else. Still valuable, but a slower and gated path.

The job in both cases is the same: get real Battlefield stats — their own or someone else's — without leaving Discord.

## Product Purpose

Battlefield Stats is a Discord bot that returns real-time stats, leaderboards, and related data for every major Battlefield title, delivered as rendered image stat cards inside Discord. This site is its home on the web.

The site's jobs, in priority order:

1. **Landing page (`/`) — the priority.** Convert a visitor into an install (user install or server install). This is where design investment goes.
2. **Data page (`/data`) — usage transparency.** Started as the developer's own hobby dashboard and still serves that purpose, but has become a public demonstration of interest and usage. It shows the project is alive and honest about its numbers.
3. **Privacy (`/privacy`) and Terms (`/tos`) — informative text.** Mostly reached by direct link. They must be correct and readable; they are not conversion surfaces.

Success is an install. The live feed on the landing page is crucial to that: it is proof-of-life, showing real requests arriving right now.

## Positioning

**The largest and the best Battlefield stats bot on Discord** — largest by both installs and reach, by a wide margin, with a small competitive field. Supporting every major Battlefield title (BF2 through BF6) is a genuine strength but is table stakes, not the differentiator. The developer's own claim, and the one the design should carry: it has the best UX of any bot in the category.

Notably **not** the oldest bot. Do not position on longevity or "first."

## Operating Context

- The product lives inside Discord. Slash commands (`/bf6`, `/bf2042`, `/link`, `/usage`, `/help`, …) return rendered images in a channel.
- Two install paths exist and are materially different: **user install** (individual account, works anywhere, no admin needed) and **server install** (admin-approved, serves a whole community).
- Account linking (`/link add`) lets a player skip re-entering username and platform on every command; linked accounts are private to that user and removable at any time (`/link remove`).
- The site itself is an authenticated-free, read-only marketing and transparency surface. Everything it shows about usage comes from the live public API.

## Capabilities and Constraints

- **Stack:** Vite + React 19 + TanStack Router (file-based routes) + TanStack Query, Tailwind v4, Radix primitives, Recharts, deployed to Cloudflare Workers static assets (`wrangler.jsonc`, SPA fallback).
- **All live numbers come from `https://api.battlefieldstats.com`** — base stats, output counts, recent outputs, user counts, event feeds, daily series. This API is public and documented as such on the site.
- The image demo on the landing page runs the **exact same renderer** as the Discord bot. It is a real demonstration, not a mockup, and must remain truthful about that.
- Theming: light and dark, dark is the default, with a pre-paint theme script in `index.html`. Both themes must stay first-class.
- Games covered: Battlefield 2, 3, 4, Hardline, 1, V, 2042, 6 — with per-game segments (Stats, Leaderboard, Servers, Experience, Playercard) that differ by title.

## Brand Commitments

- Name and wordmark: **Battlefield**Stats — "Battlefield" in foreground, "Stats" in the primary accent.
- Voice: military/field-report register used lightly ("Field report", "Briefing room", "Ready to deploy?"), never at the cost of clarity.
- Developer/social identity: `@mozzyfx` (X), `leonlarsson` (GitHub). Source is public.
- **Standing visual preference: the category standard, executed at full craft.** Offered a set of distinctive alternate visual worlds on 2026-07-31, the owner deliberately chose the conventional dark product-site idiom. This is a durable commitment, not a fallback: future work executes the convention without irony, without smuggled quirk, and without being talked out of it. The distinguishing quality is finish, not novelty.
- **Quality bar: tracker.gg + Faceit for data, Vercel + Resend for finish.** These four set the craft level. From the first pair: dense stat presentation that stays scannable, game-switching treated as a first-class navigation problem, and data as the hero rather than the garnish. From the second: immaculate spacing systems, live interactive demos used as proof, and documentation-grade clarity in every label.

## Evidence on Hand

Real, available, and safe to use:

- Live usage figures from the public API: stats sent, servers, user installs, members reached, per-game and per-day series, recent output feed.
- Real rendered stat card images per game (`/public/images/`), plus a linking demonstration video (`/images/linking.mp4`).
- Community translator credits (real names, already listed on the landing page).

Absent — must never be fabricated:

- **No invented numbers of any kind.** Every count shown must come from the live API. No estimated, rounded-up, or placeholder metrics presented as real.
- No testimonials, reviews, case studies, press quotes, awards, or named customers exist. Do not invent them.
- No benchmark or comparison data against competing bots exists, despite the "best UX" positioning. That claim is the developer's own and must not be dressed as measured fact.

## Product Principles

1. **The install is the goal.** Every landing-page decision is measured against whether it moves a visitor to add the bot — as a user install or a server install.
2. **Proof-of-life over persuasion.** Live, real, moving data (the feed, the counters, the working demo) does more convincing than claims. Never trade a real signal for a decorative one.
3. **Never fabricate a number.** If the API cannot supply it, it does not appear.
4. **Credit the sources, disclaim the affiliation.** Tracker Network and Gametools/Community Network are named by name; non-affiliation with EA/DICE stays visible and unambiguous.
5. **Best-in-category UX is the position, so the surface has to demonstrate it.** Sloppiness on this site directly undercuts the one claim the product makes.

## Accessibility & Inclusion

No product-specific standard was established. General baseline applies: both themes legible, reduced-motion respected (already honored for `fade-up` and the marquee), and the live-updating regions must not fight assistive technology.
