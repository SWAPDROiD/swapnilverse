"use client";

import type { SearchItem } from "@/data/searchIndex";

type SearchDropdownProps = {
  activeIndex: number;
  emptyLabel: string;
  listboxId: string;
  onActiveIndexChange: (index: number) => void;
  onSelect: (item: SearchItem) => void;
  query: string;
  results: SearchItem[];
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;

  const pattern = new RegExp(`(${escapeRegExp(query)})`, "ig");
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={`${part}-${index}`} className="rounded bg-accent/20 px-0.5 text-accent">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

export default function SearchDropdown({
  activeIndex,
  emptyLabel,
  listboxId,
  onActiveIndexChange,
  onSelect,
  query,
  results,
}: SearchDropdownProps) {
  return (
    <div
      className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      id={listboxId}
      role="listbox"
      aria-label="Search results"
    >
      <div className="max-h-80 overflow-y-auto p-2">
        {results.length ? (
          results.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.id}
                id={`search-result-${item.id}`}
                type="button"
                role="option"
                aria-selected={isActive}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => onActiveIndexChange(index)}
                onClick={() => onSelect(item)}
                className={`flex w-full flex-col gap-1 rounded-lg px-4 py-3 text-left transition duration-150 ${
                  isActive
                    ? "bg-[rgba(0,212,255,0.1)] text-text-primary"
                    : "text-text-primary hover:bg-[rgba(0,212,255,0.06)]"
                }`}
              >
                <span className="text-sm font-semibold leading-snug">
                  {highlightMatch(item.title, query)}
                </span>
                {item.description ? (
                  <span className="text-sm leading-snug text-text-secondary">
                    {highlightMatch(item.description, query)}
                  </span>
                ) : null}
              </button>
            );
          })
        ) : (
          <div className="px-4 py-6 text-sm text-text-secondary">{emptyLabel}</div>
        )}
      </div>
    </div>
  );
}
