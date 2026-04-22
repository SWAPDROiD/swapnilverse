"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { COLORS } from "@/constants/colors";
import { RESUME_URL } from "@/constants/links";
import { i18n } from "@/i18n";

const float = {
  animate: { y: [0, -10, 0], rotate: [0, 1.5, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const header = document.querySelector("header");
  const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 88;
  const top = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
  window.scrollTo({ top, behavior: "smooth" });
}

function highlightTitle(title: string) {
  const [start, end] = title.split("Swapnil Nandapure");

  if (!end) {
    return title;
  }

  return (
    <>
      {start}
      <span className="text-accent">Swapnil Nandapure</span>
      {end}
    </>
  );
}

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingLines = i18n.hero.typingLines;

  useEffect(() => {
    const currentLine = typingLines[lineIndex];
    const isLineComplete = typedText === currentLine;
    const isLineCleared = typedText.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          if (isLineComplete) {
            setIsDeleting(true);
            return;
          }

          setTypedText(currentLine.slice(0, typedText.length + 1));
          return;
        }

        if (isLineCleared) {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % typingLines.length);
          return;
        }

        setTypedText(currentLine.slice(0, typedText.length - 1));
      },
      !isDeleting ? (isLineComplete ? 1100 : 80) : 45,
    );

    return () => window.clearTimeout(timeout);
  }, [isDeleting, lineIndex, typedText, typingLines]);

  return (
    <section id="home" className="section-shell relative flex min-h-[calc(100svh-88px)] items-center overflow-hidden pt-6 md:pt-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
        }}
      />
      <div className="section-container">
        <div className="bento-grid items-stretch">
          <motion.div
            className="bento-card interactive-card col-span-1 flex min-h-[420px] flex-col justify-between xl:col-span-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute -left-20 top-0 h-[320px] w-[320px] rounded-full bg-accent/10 blur-[120px]" />
            <div className="relative space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="token-pill">{i18n.hero.location}</span>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl text-6xl font-extrabold leading-[0.92] tracking-[-0.08em] text-text-primary md:text-7xl xl:text-8xl">
                  {highlightTitle(i18n.hero.title)}
                </h1>
                <p className="min-h-[2.75rem] text-2xl font-semibold tracking-[-0.04em] text-text-primary md:text-3xl">
                  <span className="text-accent">{typedText}</span>
                  <span className="ml-1 inline-block text-accent">|</span>
                </p>
                <p className="max-w-2xl text-lg leading-8 text-text-secondary">
                  {i18n.hero.description}
                </p>
              </div>
            </div>

            <div className="relative mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="primary-button"
              >
                {i18n.hero.hireMe}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="secondary-button"
              >
                View Projects
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            className="bento-card interactive-card col-span-1 flex min-h-[420px] flex-col justify-between xl:col-span-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-label">System Profile</p>
                <p className="mt-3 max-w-[15rem] text-sm leading-6 text-text-secondary">
                  Product-minded engineering with AI, platform scale, and delivery ownership.
                </p>
              </div>
              <span className="whitespace-nowrap rounded-full border border-active/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-active">
                Online
              </span>
            </div>

            <motion.div {...float} className="relative mx-auto my-8 w-full max-w-[18rem]">
              <div className="absolute inset-0 rounded-[32px] bg-accent/10 blur-[60px]" />
              <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface-high p-3">
                <Image
                  src="/profile.webp"
                  alt="Swapnil Nandapure"
                  width={384}
                  height={420}
                  priority
                  className="image-kinetic h-auto w-full rounded-[24px] object-cover"
                />
              </div>
            </motion.div>

            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
              <div className="flex min-w-0 min-h-[120px] flex-col items-start justify-center gap-2 rounded-[20px] border border-border bg-[rgba(13,21,38,0.68)] p-4 sm:p-5 text-left">
                <p className="whitespace-nowrap text-[10px] uppercase leading-snug tracking-[0.24em] text-text-secondary sm:text-xs">
                  Experi
                </p>
                <p className="whitespace-nowrap text-[10px] uppercase leading-snug tracking-[0.24em] text-text-secondary sm:text-xs">
                  ence
                </p>
                <p className="break-words whitespace-normal text-xl font-extrabold leading-snug text-text-primary md:text-2xl">
                  10+
                </p>
              </div>
              <div className="flex min-w-0 min-h-[120px] flex-col items-start justify-center gap-2 rounded-[20px] border border-border bg-[rgba(13,21,38,0.68)] p-4 sm:p-5 text-left">
                <p className="whitespace-nowrap text-[10px] uppercase leading-snug tracking-[0.24em] text-text-secondary sm:text-xs">
                  Deliv
                </p>
                <p className="whitespace-nowrap text-[10px] uppercase leading-snug tracking-[0.24em] text-text-secondary sm:text-xs">
                  ered
                </p>
                <p className="break-words whitespace-normal text-xl font-extrabold leading-snug text-text-primary md:text-2xl">
                  20+
                </p>
              </div>
              <div className="flex min-w-0 min-h-[120px] flex-col items-start justify-center gap-2 rounded-[20px] border border-border bg-[rgba(13,21,38,0.68)] p-4 sm:p-5 text-left">
                <p className="whitespace-nowrap text-[10px] uppercase leading-snug tracking-[0.24em] text-text-secondary sm:text-xs">
                  Focus
                </p>
                <p className="break-words whitespace-normal text-sm font-semibold leading-snug text-accent md:text-base">
                  AI, Frontend, Scale
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
