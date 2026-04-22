"use client";

import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import SearchBar from "@/components/Search/SearchBar";
import { RESUME_URL } from "@/constants/links";
import { NAV_LINKS } from "@/constants/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { i18n } from "@/i18n";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const header = document.querySelector("header");
  const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 88;
  const top = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
  window.scrollTo({ top, behavior: "smooth" });
}

function BrandWordmark() {
  return (
    <span className="text-sm font-extrabold uppercase tracking-[0.28em] text-text-primary sm:text-base">
      SWAP
      <span className="text-accent">DROiD</span>
    </span>
  );
}

export default function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(y > 8);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgba(10,14,26,0.8)] backdrop-blur-xl">
      <div className="section-container py-4">
        <div
          className={`grid items-center gap-3 transition-all duration-300 md:grid-cols-[auto_1fr_auto] ${
            isScrolled ? "rounded-[24px] border border-border bg-[rgba(13,21,38,0.78)] px-3 py-2" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3"
            aria-label="Go to home section"
          >
            <BrandWordmark />
          </button>

          <div className="hidden md:flex md:justify-center">
            <SearchBar />
          </div>

          <div className="hidden items-center justify-end gap-2 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition duration-200 ease-out ${
                  active === link.id
                    ? "bg-accent text-background"
                    : "text-text-secondary hover:bg-surface hover:text-text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button ml-2"
            >
              {i18n.navigation.resume}
            </a>
          </div>

          <button
            type="button"
            className="ml-auto rounded-xl border border-border bg-[rgba(13,21,38,0.78)] p-3 text-text-primary transition duration-200 hover:border-accent/50 hover:text-active md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle mobile navigation"
          >
            <HiMenu size={22} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-[rgba(10,14,26,0.96)] px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="section-container">
            <div className="bento-card space-y-3 p-4">
              <SearchBar compact onNavigate={() => setOpen(false)} />
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    scrollToSection(link.id);
                  }}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition duration-200 ${
                    active === link.id
                      ? "bg-accent text-background"
                      : "bg-[rgba(13,21,38,0.78)] text-text-primary hover:border-accent/40 hover:text-active"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button w-full"
              >
                {i18n.navigation.resume}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
