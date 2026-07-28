import type { DBOutput } from "types";

/** One sort, with the pages viewed under it. `key` is null when nothing was sorted. */
export type ChainSort = { key: string | null; ascending: boolean; pages: number[] };

/** One command session: everything sharing a chain identifier, split into runs. */
export type OutputSession = {
  latest: DBOutput;
  date: string;
  firstDate: string;
  /** Total outputs across every run. */
  count: number;
  /** One entry per uninterrupted stay in a segment, newest first. Revisiting a segment starts a new run. */
  segments: OutputGroup[];
};

/** One uninterrupted run in a segment: its pages and sorts collapsed together. */
export type OutputGroup = {
  /** Newest output — supplies the game/segment/language shown on the row. */
  latest: DBOutput;
  date: string;
  /** Oldest output's date, for the span. */
  firstDate: string;
  count: number;
  /** All pages seen, ascending. */
  pages: number[];
  /** Pages per sort, in the order the sorts were applied. */
  sorts: ChainSort[];
};

/** "accuracy-asc" → ascending accuracy, "kpm" → descending kpm. */
export const parseSortKey = (sortKey: string) =>
  sortKey.endsWith("-asc") ? { key: sortKey.slice(0, -4), ascending: true } : { key: sortKey, ascending: false };

/**
 * Groups outputs into sessions by chain, and each session into runs of one segment.
 * Expects the API's newest-first ordering and preserves it.
 */
export const groupOutputs = (outputs: DBOutput[]): OutputSession[] => {
  const sessions: OutputSession[] = [];
  const byChain = new Map<string, OutputSession>();

  for (const output of outputs) {
    const existing = output.chainIdentifier ? byChain.get(output.chainIdentifier) : undefined;
    const session: OutputSession = existing ?? {
      latest: output,
      date: output.date,
      firstDate: output.date,
      count: 0,
      segments: [],
    };

    session.count++;
    session.firstDate = output.date;

    // Only the run being extended can absorb this output — going back to a segment later is a new run.
    const open = session.segments.at(-1);
    let group = open?.latest.segment === output.segment ? open : undefined;
    if (!group) {
      group = { latest: output, date: output.date, firstDate: output.date, count: 0, pages: [], sorts: [] };
      session.segments.push(group);
    }

    group.count++;
    group.firstDate = output.date;
    if (output.paginationPage && !group.pages.includes(output.paginationPage)) group.pages.push(output.paginationPage);

    // Nothing to break down for a plain unsorted, unpaginated output.
    if (output.sortKey || output.paginationPage) {
      const parsed = output.sortKey ? parseSortKey(output.sortKey) : { key: null, ascending: false };
      let sort = group.sorts.find((s) => s.key === parsed.key && s.ascending === parsed.ascending);
      // We iterate newest-first, so unshift to get the order the sorts were applied.
      if (!sort) {
        sort = { ...parsed, pages: [] };
        group.sorts.unshift(sort);
      }
      if (output.paginationPage && !sort.pages.includes(output.paginationPage)) sort.pages.push(output.paginationPage);
    }

    if (!existing) {
      sessions.push(session);
      if (output.chainIdentifier) byChain.set(output.chainIdentifier, session);
    }
  }

  for (const session of sessions) {
    for (const group of session.segments) {
      group.pages.sort((a, b) => a - b);
      for (const sort of group.sorts) sort.pages.sort((a, b) => a - b);
    }
  }
  return sessions;
};

/** One rendered row: a session's segment, plus where it sits in the session. */
export type OutputRow = {
  group: OutputGroup;
  date: string;
  /** True when the session has more than one segment, so the row gets a connector rail. */
  chained: boolean;
  first: boolean;
  last: boolean;
};

/** Flattens sessions to rows, keeping each session's segments adjacent. */
export const toRows = (sessions: OutputSession[]): OutputRow[] =>
  sessions.flatMap((session) => {
    // Oldest first within a session, so a chain reads top-down in the order the user ran it.
    const segments = [...session.segments].reverse();

    return segments.map((group, i) => ({
      group,
      // When the run started, so timestamps move forward down the block like the rows do.
      date: group.firstDate,
      chained: segments.length > 1,
      first: i === 0,
      last: i === segments.length - 1,
    }));
  });

/** The row's badge: a run's output count, or a page number when it isn't the default page 1. */
export const chainChip = (group: OutputGroup): string | null => {
  if (group.count > 1) return `×${group.count}`;
  const page = group.pages[0];
  return page > 1 ? `#${page}` : null;
};

/** How deep the user paged under one sort. Counts pages seen, since a run can be cut off by the window we fetch. */
export const pageDepth = (sort: ChainSort) => sort.pages.length;
