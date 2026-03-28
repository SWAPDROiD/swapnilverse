"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import { NAV_LINKS } from "@/constants/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const header = document.querySelector("header");
  const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 72;
  const top = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const active = useActiveSection();
  const { theme, mounted, toggleTheme } = useTheme();
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

  const headerClass = isScrolled
    ? "bg-white/60 shadow-sm backdrop-blur-md dark:bg-slate-950/35"
    : "bg-transparent";

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerClass}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3"
          aria-label="Go to home section"
        >
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image src="/favicon.png" alt="SwapnilVerse logo" width={40} height={40} />
          </div>
          <div className="font-semibold text-slate-900 dark:text-white">swapnilverse</div>
        </button>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-400 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className={`transition hover:text-slate-950 dark:hover:text-white ${
                active === link.id ? "font-medium text-slate-950 dark:text-white" : ""
              }`}
            >
              {link.label}
            </button>
          ))}

          <a
            href="/resume.pdf"
            className="ml-4 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm text-white"
          >
            Resume
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-sm transition-transform duration-300 hover:scale-105"
          >
            {mounted && theme === "dark" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-300"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" />
                <path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M4.93 19.07l1.41-1.41" />
                <path d="M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-900 dark:text-white"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </nav>

        <button
          type="button"
          className="p-2 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle mobile navigation"
        >
          <HiMenu size={22} />
        </button>
      </div>

      {open ? (
        <div className="bg-white/70 py-4 backdrop-blur-md dark:bg-slate-950/45 md:hidden">
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setOpen(false);
                  scrollToSection(link.id);
                }}
                className="text-base text-slate-900 dark:text-white"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="/resume.pdf"
                className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm text-white"
              >
                Resume
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-sm transition-transform duration-300 hover:scale-105"
              >
                {mounted && theme === "dark" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M4.93 4.93l1.41 1.41" />
                    <path d="M17.66 17.66l1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M4.93 19.07l1.41-1.41" />
                    <path d="M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900 dark:text-white">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
