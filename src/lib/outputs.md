# How output grouping works

The bot sends stats images. Every image is one row from the API. `groupOutputs` and `toRows` in
`outputs.ts` turn that flat list into the rows you see in the live feed and on the data page.

## The fields we use

- `chainIdentifier`: the same value on every image that came from one command. Null on older rows.
- `segment`: which part of the stats, like Weapons or Overview.
- `paginationPage`: which page the user was on.
- `sortKey`: how the list was sorted. `kpm` means descending, `kpm-asc` means ascending.

## Two things the bot does

- Changing the sort goes back to page 1.
- Changing the segment goes back to page 1.

Both matter, because it means a page number only makes sense next to the sort it belongs to.

## The two levels

1. **Session.** Every image with the same `chainIdentifier`. This is one command the user ran, plus
   all the paging, sorting and segment switching they did in it.
2. **Run.** Inside a session, a stretch of images in the same segment with nothing else in between.
   If the user leaves a segment and comes back later, that is a second run, not part of the first.

One run is one row on screen. Rows from the same session share a line down the left side.

Runs matter. If we merged a segment across the whole session instead, going Weapons, then Overview,
then Weapons again would collapse into one Weapons row and hide the trip to Overview.

## Order

The API gives us newest first and `groupOutputs` keeps it that way. `toRows` then flips each
session, so its runs read top to bottom in the order the user actually did them. Each row shows the
time its run started.

Sessions themselves are still placed by their newest image. So a session block can sit above rows
that are older than the time printed on its first line. That is a known trade off. We chose it
because the alternative splits a session apart.

## What the badges mean

- `×3` means the run sent 3 images.
- `#2` means the run sent a single image and it was on page 2. In practice you almost always see
  `#1`, because everything resets to page 1.
- Hovering a badge shows the sorts that were used and how many pages under each.

## One gotcha

The API only returns the last 20 images, so a run can be cut off at the edge. That is why page
counts count the pages we actually saw instead of reading the highest page number. If pages 1 and 2
fell off the end, saying "3 pages" would be wrong.
