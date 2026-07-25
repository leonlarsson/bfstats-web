import type { DBOutput } from "types";

/**
 * One sort the chain ran under, with the pages viewed while it was applied.
 * `key` is null for outputs sent before any sort — a segment paginated without sorting.
 */
export type ChainSort = { key: string | null; ascending: boolean; pages: number[] };

/** One activity row: a standalone output, or a whole pagination chain collapsed into a single entry. */
export type OutputGroup = {
  /** Newest output of the chain — supplies the game/segment/language and the row's timestamp. */
  latest: DBOutput;
  date: string;
  /** Date of the chain's oldest output — with `date`, the span the chain ran over. */
  firstDate: string;
  /** How many outputs the chain contributed to the list. */
  count: number;
  /** Every page the chain covered, ascending, across all sorts. */
  pages: number[];
  /** Pages broken down per sort, in the order the sorts were applied. */
  sorts: ChainSort[];
};

/** "accuracy-asc" → ascending accuracy, "kpm" → descending kpm (no suffix means descending). */
export const parseSortKey = (sortKey: string) =>
  sortKey.endsWith("-asc") ? { key: sortKey.slice(0, -4), ascending: true } : { key: sortKey, ascending: false };

/**
 * Collapses outputs sharing a chainIdentifier into one group, anchored at the chain's newest output.
 * Expects the API's newest-first ordering and preserves it.
 */
export const groupOutputs = (outputs: DBOutput[]): OutputGroup[] => {
  const groups: OutputGroup[] = [];
  const byChain = new Map<string, OutputGroup>();

  for (const output of outputs) {
    const existing = output.chainIdentifier ? byChain.get(output.chainIdentifier) : undefined;
    const group: OutputGroup = existing ?? {
      latest: output,
      date: output.date,
      firstDate: output.date,
      count: 0,
      pages: [],
      sorts: [],
    };

    group.count++;
    group.firstDate = output.date;
    if (output.paginationPage && !group.pages.includes(output.paginationPage)) group.pages.push(output.paginationPage);

    // Plain one-off outputs get no breakdown at all — there is nothing to say about them.
    if (output.sortKey || output.paginationPage) {
      const parsed = output.sortKey ? parseSortKey(output.sortKey) : { key: null, ascending: false };
      let sort = group.sorts.find((s) => s.key === parsed.key && s.ascending === parsed.ascending);
      // Iterating newest-first, so unshifting leaves the sorts in the order they were actually applied.
      if (!sort) {
        sort = { ...parsed, pages: [] };
        group.sorts.unshift(sort);
      }
      if (output.paginationPage && !sort.pages.includes(output.paginationPage)) sort.pages.push(output.paginationPage);
    }

    if (!existing) {
      groups.push(group);
      if (output.chainIdentifier) byChain.set(output.chainIdentifier, group);
    }
  }

  for (const group of groups) {
    group.pages.sort((a, b) => a - b);
    for (const sort of group.sorts) sort.pages.sort((a, b) => a - b);
  }
  return groups;
};

/** The one short token on the row: how many outputs a chain collapsed into it, or a lone output's page. */
export const chainChip = (group: OutputGroup): string | null => {
  if (group.count > 1) return `×${group.count}`;
  return group.pages.length === 1 ? `#${group.pages[0]}` : null;
};

/**
 * How deep the user paged under one sort. Counts pages actually seen rather than using the highest
 * page number: changing sort in the bot resets to page 1, but a chain can still be cut off by the
 * end of the window we fetched, and then the run doesn't start at 1.
 */
export const pageDepth = (sort: ChainSort) => sort.pages.length;
