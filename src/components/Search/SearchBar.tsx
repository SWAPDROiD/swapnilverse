"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import SearchDropdown from "@/components/Search/SearchDropdown";
import type { SearchItem } from "@/data/searchIndex";
import { useSearch } from "@/hooks/useSearch";

type SearchBarProps = {
  className?: string;
  compact?: boolean;
  onNavigate?: () => void;
};

function scrollToHash(hash: string) {
  const targetId = hash.replace(/^#/, "");
  const element = document.getElementById(targetId);
  if (!element) return false;

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export default function SearchBar({ className = "", compact = false, onNavigate }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { debouncedQuery, hasQuery, results } = useSearch(query);

  const inputClasses = useMemo(
    () =>
      compact
        ? "flex w-full items-center gap-3 rounded-full border border-border bg-[rgba(13,21,38,0.78)] px-4 py-3 text-sm text-text-secondary shadow-[inset_0_1px_0_rgba(0,212,255,0.06)]"
        : "flex w-full items-center gap-3 rounded-full border border-border bg-[rgba(13,21,38,0.78)] px-4 py-3 text-sm text-text-secondary shadow-[inset_0_1px_0_rgba(0,212,255,0.06)]",
    [compact],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [debouncedQuery]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    if (!window.location.hash) return;

    const rafId = window.requestAnimationFrame(() => {
      scrollToHash(window.location.hash);
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [pathname]);

  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    onNavigate?.();

    if (item.path.startsWith("#")) {
      if (pathname === "/") {
        requestAnimationFrame(() => {
          scrollToHash(item.path);
          window.history.replaceState(null, "", item.path);
        });
      } else {
        router.push(`/${item.path}`);
      }
      return;
    }

    router.push(item.path);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open && ["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) {
      setOpen(true);
    }

    if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!results.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + results.length) % results.length);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      handleSelect(results[activeIndex]);
    }
  };

  const showDropdown = open;
  const emptyLabel = hasQuery ? "No results found" : "Popular sections";

  return (
    <div ref={rootRef} className={`relative w-full max-w-md ${className}`.trim()}>
      <div className={inputClasses}>
        <IoSearchOutline className="text-base text-accent" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search sections"
          className="min-w-0 flex-1 bg-transparent text-left text-sm text-text-primary outline-none placeholder:text-text-secondary"
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={results[activeIndex] ? `search-result-${results[activeIndex].id}` : undefined}
        />
      </div>

      {showDropdown ? (
        <SearchDropdown
          activeIndex={activeIndex}
          emptyLabel={emptyLabel}
          listboxId={listboxId}
          onActiveIndexChange={setActiveIndex}
          onSelect={handleSelect}
          query={debouncedQuery}
          results={results}
        />
      ) : null}
    </div>
  );
}
