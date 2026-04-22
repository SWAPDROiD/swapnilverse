import { useEffect, useMemo, useState } from "react";
import { POPULAR_SEARCH_ITEMS, SEARCH_INDEX, type SearchItem } from "@/data/searchIndex";

const MAX_RESULTS = 8;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function scoreItem(item: SearchItem, query: string) {
  const normalizedTitle = normalize(item.title);
  const normalizedDescription = normalize(item.description ?? "");
  const normalizedKeywords = (item.keywords ?? []).map(normalize);

  let score = 0;

  if (normalizedTitle.includes(query)) score += normalizedTitle.startsWith(query) ? 12 : 8;
  if (normalizedDescription.includes(query)) score += 4;

  for (const keyword of normalizedKeywords) {
    if (keyword.includes(query)) {
      score += keyword.startsWith(query) ? 6 : 3;
    }
  }

  return score;
}

export function useSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 200);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const normalizedQuery = useMemo(() => normalize(debouncedQuery), [debouncedQuery]);
  const index = useMemo(() => SEARCH_INDEX, []);
  const popularItems = useMemo(() => POPULAR_SEARCH_ITEMS, []);

  const results = useMemo(() => {
    if (!normalizedQuery) return popularItems;

    return index
      .map((item) => ({ item, score: scoreItem(item, normalizedQuery) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, MAX_RESULTS)
      .map((entry) => entry.item);
  }, [index, normalizedQuery, popularItems]);

  return {
    debouncedQuery,
    hasQuery: normalizedQuery.length > 0,
    results,
    popularItems,
  };
}
