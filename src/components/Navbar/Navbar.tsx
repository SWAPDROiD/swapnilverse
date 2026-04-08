"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import { RESUME_URL } from "@/constants/links";
import { NAV_LINKS } from "@/constants/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { i18n } from "@/i18n";

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
    ? "bg-slate-950/35 shadow-sm backdrop-blur-md"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${headerClass}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3"
          aria-label="Go to home section"
        >
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image src="/favicon.png" alt={i18n.branding.brandName} width={40} height={40} />
          </div>
          <div className="font-semibold text-white">{i18n.branding.brandName}</div>
        </button>

        <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className={`transition-all duration-300 ease-in-out hover:text-white ${
                active === link.id ? "font-medium text-white" : ""
              }`}
            >
              {link.label}
            </button>
          ))}

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            {i18n.navigation.resume}
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-white transition-colors duration-300 hover:text-indigo-300 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle mobile navigation"
        >
          <HiMenu size={22} />
        </button>
      </div>

      {open ? (
        <div className="border-b border-white/10 bg-slate-950/45 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setOpen(false);
                  scrollToSection(link.id);
                }}
                className="text-base text-white transition-colors duration-300 hover:text-indigo-300"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
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
