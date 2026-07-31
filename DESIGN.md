---
name: Battlefield Stats
description: A near-black instrument panel where the bot's live output is the ornament.
colors:
  background: "hsl(220 14% 4%)"
  foreground: "hsl(210 12% 95%)"
  card: "hsl(220 12% 6.5%)"
  card-foreground: "hsl(210 12% 95%)"
  popover: "hsl(220 12% 8%)"
  popover-foreground: "hsl(210 12% 95%)"
  primary: "hsl(32 100% 59%)"
  primary-foreground: "hsl(220 15% 6%)"
  secondary: "hsl(220 9% 13%)"
  secondary-foreground: "hsl(210 12% 95%)"
  muted: "hsl(220 9% 11%)"
  muted-foreground: "hsl(220 7% 66%)"
  accent: "hsl(220 9% 14%)"
  accent-foreground: "hsl(210 12% 95%)"
  destructive: "hsl(0 70% 58%)"
  destructive-foreground: "hsl(0 0% 98%)"
  border: "hsl(220 10% 14%)"
  input: "hsl(220 10% 20%)"
  ring: "hsl(32 100% 59%)"
  chart-1: "hsl(30 80% 46%)"
  chart-2: "hsl(213 70% 55%)"
  chart-3: "hsl(155 74% 36%)"
  chart-4: "hsl(263 84% 69%)"
  chart-5: "hsl(0 70% 60%)"
  chart-ink: "hsl(220 20% 8%)"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2.25rem, 7vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontFeature: "ss01"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  mono:
    fontFamily: "ui-monospace, 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  figure:
    fontFamily: "Geist, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "tabular-nums"
rounded:
  chamfer: "9px"
  square: "0px"
  inherited-sm: "2px"
  inherited-md: "4px"
  inherited-lg: "6px"
spacing:
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "32px"
  3xl: "40px"
  4xl: "56px"
  section: "64px"
  section-lg: "80px"
components:
  cta-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.chamfer}"
    padding: "0 24px"
    height: "48px"
  cta-primary-sm:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.chamfer}"
    padding: "0 16px"
    height: "36px"
  cta-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.chamfer}"
    padding: "0 24px"
    height: "48px"
  cta-outline-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.foreground}"
  panel:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.chamfer}"
    padding: "20px"
  panel-header:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.title}"
    padding: "12px 16px"
  command-chip:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    typography: "{typography.mono}"
    rounded: "{rounded.inherited-sm}"
    padding: "4px 10px"
  game-tab:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.chamfer}"
    padding: "10px 16px"
  game-tab-selected:
    backgroundColor: "{colors.card}"
    textColor: "{colors.primary}"
    rounded: "{rounded.chamfer}"
    padding: "10px 16px"
  data-tile:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.figure}"
    rounded: "{rounded.chamfer}"
    padding: "16px"
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.inherited-md}"
    padding: "8px 12px"
    height: "40px"
  feed-row:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.label}"
    padding: "8px 0"
---

# Design System: Battlefield Stats

## Overview

**Creative North Star: "The Instrument Panel"**

This is a dark, precise, data-forward product surface where the live data is the ornament. The page does not describe what the bot returns; it shows requests landing in real time, in a bordered panel running the full height of the first viewport, while the headline and the install button sit beside it. Every figure on the site is a real number from the public API and every image is real bot output. Nothing is decorated to look like data — the data is already the decoration, so the chrome around it stays quiet enough to let it read.

The world is the category standard, executed at full craft. That is a deliberate, standing commitment: the conventional dark product-site idiom, taken seriously, without irony and without smuggled quirk. The distinguishing quality here is finish, not novelty. Density comes from tracker.gg and Faceit — dense stat presentation that stays scannable, game-switching treated as first-class navigation, data as the hero rather than the garnish. Spacing discipline comes from Vercel and Resend — immaculate rhythm, live demos used as proof, documentation-grade clarity in every label. Those four set the craft level this surface is measured against.

The material is thin: near-black ground, one amber accent, hairline borders, no shadows at all, and a single 9px corner chamfer as the only ornament in the system. Confirmed rejections, all of them devices this build removed rather than never had: grid backdrops, radial accent glows, eyebrow labels above headings, the repeated eyebrow→display→description section template, hero stat-metric grids, two-clause antithesis headlines, em-dash body rhythm, marquees, and monospace worn as costume. The register is Persuade on `/` and Operate/Read on `/data` and the policy pages; the same tokens serve both, and only the density changes.

**Key Characteristics:**
- Near-black ground with a three-step tonal ladder: background → card → muted.
- Exactly one accent hue, amber, reserved for live signal, active state, and the single primary action.
- Geist at two working weights — 500/600 for interface, 800 for headings.
- Hairline 1px borders carry every edge, every separation, and all elevation.
- One 9px chamfer: top-right on surfaces, two opposite corners on controls.
- Zero shadows on designed surfaces.
- Motion only marks arrival; it never decorates, and it is fully suppressed under `prefers-reduced-motion`.
- Dark is canonical; light is complete and first-class.

## Colors

A near-black neutral ladder with a single warm amber accent — cold ground, one warm signal, and nothing else competing for the eye.

Dark is the canonical theme: `<html class="dark">` ships in the markup, `ThemeProvider` defaults to `dark`, and a pre-paint script in `index.html` removes the class only when the visitor has stored `light`. Light is a complete, supported counterpart, not an afterthought — every token carries a light value and both themes must stay legible. Tokens are declared as bare HSL channel triplets on `:root` and `.dark` and consumed as `hsl(var(--token))`, which is what lets opacity modifiers like `hsl(var(--primary) / 0.3)` work throughout the system.

### Primary
- **Signal Amber** (`{colors.primary}`): The one accent. It marks the live feed's transmitting dot, the primary install button, the active nav underline, the selected game tab, the send and event glyphs in every feed row, the chain rail tying a session's rows together, the deep-linked card highlight on `/data`, link underlines, and the focus ring. It never fills a surface, and it never appears twice in the same role on one screen.

### Neutral
- **Near-Black Ground** (`{colors.background}`): The page. The lowest step of the tonal ladder.
- **Panel Slate** (`{colors.card}`): Every panel, the footer, and — at 40% opacity — the alternating section bands that give the long landing page its rhythm.
- **Recessed Slate** (`{colors.muted}`): Chart tracks, command chips, skeleton rows, and the demo preview well. The third and last step of the ladder.
- **Bright Ink** (`{colors.foreground}`): Primary text, figures, and any chart label sitting on an empty track.
- **Quiet Ink** (`{colors.muted-foreground}`): Supporting prose, feed chrome, timestamps, and field labels. The workhorse — most text on `/data` is this color.
- **Hairline** (`{colors.border}`): Every border in the system. It is also the divider, the section separator, and the elevation.
- **Field Edge** (`{colors.input}`): The stroke on inputs, selects, and the outline button — one step brighter than the hairline, so a control reads as touchable.
- **Alert Red** (`{colors.destructive}`): Offline feed status, demo render failures, and the `/data` fetch-error panel. Failure only; never a decorative red.

### Tertiary
- **Categorical Chart Set** (`{colors.chart-1}` … `{colors.chart-5}`): A contrast-validated categorical set, defined per theme, used only for series color inside charts on `/data`.
- **Chart Ink** (`{colors.chart-ink}`): A single dark ink for a label sitting on top of a chart fill. Identical in both themes, because `chart-1` holds L≈46% in both, so one ink clears 4.5:1 on the bar in light and dark alike.

### Named Rules

**The One Amber Rule.** There is exactly one accent hue in this system. Amber marks live signal, active state, and the single primary action; it never fills a surface and never becomes a background wash. If something needs a second hue to be readable, the hierarchy is wrong — fix the weight, the tone step, or the border instead.

**The Avatar Exception.** `/images/avatar.png` is the product's real, pre-existing brand avatar, and it renders mint-teal. It is the single sanctioned second hue in this system, it is confined to the wordmark lockup in the header and the footer, and it is a permanent brand asset — not a build choice and not a defect. No other element may introduce a second hue on its precedent, and the avatar's teal is never sampled, extended, or echoed into UI color.

**The Chart Quarantine Rule.** `chart-1` through `chart-5` exist only inside charts on `/data`. They are a data-encoding palette, not a UI palette; they never appear on a button, a border, a badge, or a piece of running text.

## Typography

**Display Font:** Geist Variable (self-hosted at `/fonts/Geist-Variable.ttf`, weight axis 1–999, `font-display: swap`, preloaded in `index.html`)
**Body Font:** Geist Variable — the same face at a different weight
**Label/Mono Font:** System monospace stack (`ui-monospace`, Cascadia Code, Segoe UI Mono, Roboto Mono)

**Character:** One neutral, engineered grotesk doing all the work, distinguished only by weight and size. Geist is deliberate here and is not up for revision: it is the incumbent face, and it is Vercel's own typeface — Vercel being one of the four named quality bars this surface is built to. A generic design detector will flag Geist as an "overused font"; that warning is a knowing, brief-sanctioned override and must not be "fixed" by a later pass.

The body sets `font-feature-settings: "ss01"` globally, and figures use `.figure` (tabular numerals, -0.01em) so counters and stat columns never reflow as they tick.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 7vw, 4rem)`, 1.02, -0.03em): `.display`. The hero headline. Sentence case, balanced wrap. The old uppercase-900 treatment is gone.
- **Headline** (800, 1.875rem → 2.25rem, 1.02, -0.03em): `.display` at a smaller size. Section headings on `/`, and the page `h1` on `/data`, `/about`, `/privacy`, `/tos`. Sentence case.
- **Title** (600, 1rem–1.125rem, 1.4): Panel header rows, step titles, FAQ triggers, footer column headings.
- **Body** (400, 1rem, 1.625): Running prose in quiet ink, capped at `max-w-2xl` for section descriptions and `max-w-3xl` for policy text.
- **Label** (500, 0.75rem, 1.4): Field labels, tile captions, feed chrome, "Click to copy" hints. Sentence case, quiet ink. Never uppercase, never letterspaced.
- **Mono** (500, 0.6875rem–0.75rem): Bot commands, timestamps, chart and data badges, and the command line on a game tab.
- **Figure** (600, 1.5rem–1.875rem, tabular): `.figure`. Data tile values and the inline hero counters.

### Named Rules

**The Two Weights Rule.** Geist works at two weights: 500/600 for interface text, 800 for `.display` headings. Emphasis comes from weight and size and nothing else — no third face, no italics for emphasis, no letterspaced small caps, no uppercase display type. The wordmark's `font-black uppercase` is the one standing exception, and it is a logotype, not a heading style.

**The Mono Is Data Rule.** Monospace is only for things a person could type or copy: bot commands, timestamps, chart and data badges, and the game-tab command line. Navigation, section labels, footer headings, feed chrome, and form labels are all sans. Mono is never used to make ordinary interface text look technical.

**The Sentence Case Rule.** Every heading is sentence case. Uppercase belongs to the wordmark alone.

## Layout

One centered container (`.container`, `margin-inline: auto`, capped at 1360px above 1400px) with 16px gutters that open to 32px at `lg`. Every page sits inside it; there is no full-bleed content and no second container width.

The landing page is a vertical stack of full-width sections separated by a single 1px border, alternating between the page ground and `card` at 40% so the rhythm reads as a tonal step rather than a gap. Section vertical padding is 64px, opening to 80px at `lg`; the hero runs tighter (40px → 64px) so the feed lands inside the first screenful. Within a section, heading, description, and content stack at 16px / 36px.

The first viewport is a two-column grid at `xl` (`1.05fr 0.95fr`, 56px column gap) with explicitly declared rows (`auto 1fr`): headline and primary action top-left, the live feed spanning both rows on the right at full height, and the supporting figures as one sentence of running prose below the headline — not a stat grid. Below `xl` the grid collapses to a single column and the feed sits directly under the primary action, so the lead proof still lands first and the figures follow it.

`/data` is denser by design: a 2/3/5-column tile row at the top, then paired `md:grid-cols-2` chart cards, fixed-height scroll areas (330px for bar charts, 370px for activity lists), and 64px between sections. Charts and lists get fixed heights rather than growing, so page length stays stable while the data changes.

Spacing runs on a 4px base. The steps in active use are 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56, plus the 64/80 section rhythm. Inside a panel: 12–16px for header and footer rows, 16–20px for body content, 8px per feed or list row.

### Named Rules

**The One Container Rule.** Everything lives in the single centered container at 16px / 32px gutters. Nothing bleeds to the viewport edge except a section's own background and its 1px border.

**The Border Between Sections Rule.** Adjacent sections are separated by a 1px border and a tone step, never by empty space and never by a decorative divider, rule graphic, or gradient fade.

## Elevation & Depth

This system has **no shadows**. There is no shadow vocabulary and no elevation scale. Depth is a tonal step plus a hairline: `background` → `card` → `muted`, each step a couple of points of lightness, with a 1px `border` drawing the edge. `.panel` is the single surface primitive and it declares both at once — flat card fill, 1px border, nothing else. The earlier `.panel` gradient wash was removed; a panel is flat.

The sticky header is the one place anything sits over content, and it does so with `background` at 85% plus a backdrop blur rather than a shadow. The lightbox uses a black-at-85% scrim with a blur for the same reason. Hovering a surface shifts its border toward amber; it never lifts, scales, or casts.

A residue of `shadow-*` survives inside inherited shadcn overlay primitives (`ui/popover`, `ui/select`, `ui/tooltip`, `ui/sheet`, the chart tooltip, and the unused `ui/card`). That is vendor scaffolding, not this system's depth language, and it must not be copied onto a designed surface.

### Shadow Vocabulary

None. The system defines no shadow tokens.

### Named Rules

**The No Shadow Rule.** No designed surface in this project casts a shadow. If a thing needs to separate from what is behind it, it gets a tone step and a 1px border — in that order.

**The Elevation Is A Border Rule.** `.panel` declares elevation exactly once: `card` fill plus `1px solid border`. Do not add a ring, a second border, an inset highlight, or a gradient on top of it.

## Shapes

Square corners everywhere, cut once. Panels, tiles, buttons, tabs, images, and video all sit at 0px radius; the only geometry in the system is a single 9px 45° chamfer.

- `.clip-notch` cuts the **top-right** corner. Surfaces: panels, data tiles, stat cards, game tabs, gallery thumbnails, the linking video, the lightbox image, and the avatar tile.
- `.clip-btn` cuts the **top-left and bottom-right** corners. Controls only: `CtaButton` in both variants, and the demo's submit button. Two opposite corners is what keeps a control from reading as a panel.

There is one chamfer size. `.clip-notch-sm` no longer exists and must not be reintroduced.

A residual shadcn radius scale survives from `--radius: 0.375rem` (2px / 4px / 6px) on inputs, select triggers, popovers, tooltips, and small chips like `BotCommand` and the data `Badge`. Treat it as inherited scaffolding — it is what those vendor primitives ship with, not the form language. New surfaces get the chamfer or nothing.

Borders are always 1px and always the `border` token: full strength on structure, 60% on list dividers. Icons are Lucide line icons at 12–20px, drawn in `currentColor` or amber; there are no filled glyphs and no icon backplates.

### Named Rules

**The One Chamfer Rule.** 9px, and only 9px. Never a second radius, never a rounded corner on a designed surface, never both clip utilities on one element.

**The Surfaces Cut One, Controls Cut Two Rule.** A surface cuts its top-right corner; a control cuts top-left and bottom-right. The silhouette alone should tell you whether a thing is a panel or something you can press.

## Components

Buttons and panels are plain and load-bearing: rectangles with one corner sliced, a hairline edge, and no ornament. Nothing is playful; nothing is heavy. The character is instrument-grade — a control looks like a control and a readout looks like a readout.

### Buttons
- **Shape:** Square with the control chamfer (`.clip-btn`, 9px top-left + bottom-right).
- **Primary:** Amber fill, near-black label, weight 700. Large is 48px tall with 24px side padding; small (header) is 36px tall with 16px side padding. Icon sits left at 16–20px with an 8px gap.
- **Outline:** Transparent over the page ground, 1px `input` border, weight 600, the same two sizes.
- **Hover / Focus:** Primary drops to 90% opacity; outline fills with `accent`. Both transition `opacity, background-color, border-color`. Focus is the global 2px amber outline at 2px offset — never a custom ring.
- **Legacy:** `ui/button.tsx` is inherited shadcn, kept for in-form controls (the demo's submit, which is passed `.clip-btn` to bring it in line). It is not the site's button. `CtaButton` is.

### Chips
- **Bot command chip** (`BotCommand`): Monospace, `muted` fill, 1px border, 2px radius. Two variants — `inline` sits inside prose at 0.85em, `chip` is a standalone button with a 12px copy icon. Hover shifts the border toward amber; a successful copy flips border and text to amber for 1.5s and swaps the copy glyph for a check.
- **Data badge** (`Badge` in `OutputEntry`): Monospace 11px, `muted` fill, quiet ink, 2px radius. Carries a session's page depth or sort indicator and opens a monospace tooltip.

### Cards / Containers
- **Corner Style:** `.clip-notch` (9px top-right).
- **Background:** `card`.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** 1px `border` on the panel, and again on each internal header or footer strip.
- **Internal Padding:** 12–16px for header and footer rows, 16–20px for body content. A `/data` StatCard deep-linked by hash swaps to an amber border and a 5% amber tint.

### Inputs / Fields
- **Style:** 40px tall, `background` fill, 1px `input` border, 4px radius (inherited), 12px side padding, quiet-ink placeholder. Selects match the input silhouette exactly.
- **Label:** A 12px sans label sits 6px above the field, in quiet ink. Not uppercase, not mono.
- **Focus:** The global 2px amber `ring` outline at 2px offset.
- **Disabled:** `muted` fill with quiet ink at full opacity — a disabled control reads as inert, not faded out.

### Navigation
- **Header:** Sticky, 64px tall, `background` at 85% with a backdrop blur, 1px bottom border. Avatar tile (36px, `.clip-notch`) plus wordmark on the left, three text links, then social icon buttons, the theme toggle, and the small primary CTA on the right. Collapses to a sheet below `md`.
- **Links:** 14px sans, weight 500, quiet ink. A 2px amber underline scales in from the left on hover and holds at full width when active, where the label also goes to bright ink. Social icons are 20px, quiet ink, with an `accent` hover background.
- **Footer:** `card` ground, 1px top border, a `2fr 1fr 1fr` column grid, sans column headings, quiet-ink link lists, and a bordered legal strip at the bottom.

### Live Feed (signature)
The landing page's lead proof, and the component the first viewport is built around. A full-height `.panel` in three parts: a header row carrying an amber radio glyph, the title, and a right-aligned status pair (a 6px dot plus a label — amber and blinking when transmitting, quiet and pulsing while connecting, red when both queries have failed); a body of at most 12 rows, hairline-divided at 60% border opacity; and a footer strip linking through to `/data`.

Each row is one delivery or install event: an amber glyph, the game in medium weight, the segment and language in quiet ink, an optional monospace badge, and a right-aligned relative timestamp. Sessions from one user are grouped and tied together by a 1px amber-at-30% chain rail down the left with an 8px elbow into each continuation row; continuation rows drop the game and language because the rail already says they share a command. Rows are keyed per delivery, so only genuinely new rows mount — and only those animate. Before data arrives, 12 pulsing `muted` skeleton bars hold the exact same height, so the panel never resizes.

### Charts (`/data`)
Horizontal bars on a `muted` track, 32px tall with an 8px gap, 2px radius on the right end only. The x-domain is capped at `dataMax * 1.7`, so the longest bar reaches roughly 59% of the track and can never run under the fixed, right-aligned value column. Each row's name label picks its ink per row: `chart-ink` when the label sits wholly inside the fill, `foreground` when it sits wholly on the track. The value column is always `foreground`, on the track.

### Motion
Four animations exist, and every one is guarded by `prefers-reduced-motion`. `fade-up` (0.6s, `cubic-bezier(0.16, 1, 0.3, 1)`, 12px rise) staggers the hero in at 0 / 70 / 140 / 180 / 210ms. `feed-in` (0.45s, the same exponential ease-out, 6px drop) runs only on newly-mounted live-feed rows. `blink` (2s) is the feed's live status dot. The accordion opens and closes in 0.2s. Hover and state transitions run at 150ms on color properties only. The marquee that used to run here was deleted.

### Named Rules

**The One Button Rule.** `CtaButton` is the site's button. `ui/button.tsx` is inherited shadcn kept for in-form controls; do not reach for it to build a call to action, and do not add variants to it.

**The Label Never Straddles Rule.** A chart bar label is either wholly inside the fill or wholly on the track, and its ink is chosen to match. A label spanning the fill edge is a defect, not a styling choice — never solve it with a halo, a stroke, or a drop shadow.

**The Arrival-Only Motion Rule.** Motion marks something arriving — the hero on load, a new row in the feed, the live dot. Nothing loops for decoration, nothing parallaxes, nothing moves on scroll, and every animation has a `prefers-reduced-motion` off switch.

## Do's and Don'ts

### Do:
- **Do** build every surface from `.panel` + `.clip-notch`: `card` fill, 1px `border`, 9px top-right chamfer.
- **Do** use `.clip-btn` for controls and `.clip-notch` for surfaces, so the silhouette tells you what a thing is.
- **Do** keep amber for live signal, active state, and the one primary action per screen.
- **Do** treat `/images/avatar.png` as the single sanctioned second hue, and only inside the wordmark lockup.
- **Do** set headings in `.display` — weight 800, -0.03em, 1.02 line-height, sentence case.
- **Do** reserve monospace for bot commands, timestamps, chart and data badges, and the game-tab command line.
- **Do** keep figures on `.figure` (tabular numerals) so counters don't reflow as they tick.
- **Do** separate sections with a 1px border and a `card`-at-40% tone step.
- **Do** keep both themes first-class: every new token needs a light value, and dark stays the default.
- **Do** wrap any new animation in `prefers-reduced-motion: reduce`.
- **Do** show real bot output and real API numbers. Every image on this site is genuine output; every figure comes from the public API.

### Don't:
- **Don't** add a box-shadow to a designed surface. Depth is a tone step plus a 1px border.
- **Don't** introduce a second chamfer size, put a rounded corner on a panel, or reintroduce `.clip-notch-sm`.
- **Don't** treat the inherited 2/4/6px shadcn radius scale as the form language — it stays on the vendor primitives it came with.
- **Don't** introduce a second accent hue anywhere in the UI, and don't cite the mint-teal avatar as precedent.
- **Don't** use `chart-1`…`chart-5` outside a chart on `/data`.
- **Don't** add a grid backdrop, a radial accent glow, a gradient wash, or a decorative divider.
- **Don't** put an eyebrow or kicker label above a heading, and don't rebuild the eyebrow→display→description section template.
- **Don't** open a page with a stat-metric grid; supporting figures belong inline in a sentence.
- **Don't** write two-clause antithesis headlines ("Not X. Just Y.") or use em-dashes as body rhythm.
- **Don't** set navigation, section labels, footer headings, feed chrome, or form labels in monospace.
- **Don't** set headings in uppercase — the wordmark is the only uppercase in the system.
- **Don't** add a marquee, a scroll-triggered reveal, or any looping decorative motion.
- **Don't** "fix" Geist because a detector calls it overused. The face is chosen deliberately and confirmed.
