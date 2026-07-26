import type { DBOutput } from "types";

/** One sort, with the pages viewed under it. `key` is null when nothing was sorted. */
export type ChainSort = { key: string | null; ascending: boolean; pages: number[] };

/** One row: a single output, or one segment of a chain collapsed together. */
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
 * Groups outputs by chain and segment, anchored at each run's newest output.
 * Expects the API's newest-first ordering and preserves it.
 */
export const groupOutputs = (outputs: DBOutput[]): OutputGroup[] => {
  const groups: OutputGroup[] = [];
  const byChain = new Map<string, OutputGroup>();
  const chainKey = (output: DBOutput) => `${output.chainIdentifier}\n${output.segment}`;

  for (const output of outputs) {
    const existing = output.chainIdentifier ? byChain.get(chainKey(output)) : undefined;
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
      groups.push(group);
      if (output.chainIdentifier) byChain.set(chainKey(output), group);
    }
  }

  for (const group of groups) {
    group.pages.sort((a, b) => a - b);
    for (const sort of group.sorts) sort.pages.sort((a, b) => a - b);
  }
  return groups;
};

/** The row's badge: a collapsed run's output count, or a single output's page. */
export const chainChip = (group: OutputGroup): string | null => {
  if (group.count > 1) return `×${group.count}`;
  return group.pages.length === 1 ? `#${group.pages[0]}` : null;
};

/** How deep the user paged under one sort. Counts pages seen, since a run can be cut off by the window we fetch. */
export const pageDepth = (sort: ChainSort) => sort.pages.length;
