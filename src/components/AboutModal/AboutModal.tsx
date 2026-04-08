"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMapPin, FiUser, FiX } from "react-icons/fi";
import BarGraph, { type BarGraphDatum } from "@/components/BarGraph";
import { i18n } from "@/i18n";
import {
  NAGPUR_LOCATION,
  PUNE_LOCATION,
  AMS_WORLD,
  SMART_DATA,
  PERSISTENT,
  ZENDESK,
} from "@/constants/links";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
};

type AboutModalLinkProps = {
  href: string;
  text: string;
};

const codeClass =
  "rounded bg-gray-100 px-1 py-0.5 text-sm text-purple-600 dark:bg-gray-800 dark:text-purple-300";

const chartData: BarGraphDatum[] = [
  { name: "Coding", value: 90, color: "#3B82F6" },
  { name: "Mentoring", value: 60, color: "#9ecae1" },
  { name: "Dancing", value: 40, color: "#deebf7" },
  { name: "Learning", value: 50, color: "#3182bd" },
  { name: "AI Exploration", value: 70, color: "#9ecae1" },
  { name: "DIY projects", value: 60, color: "#deebf7" },
];

function AboutModalLink({ href, text }: AboutModalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-indigo-600 underline decoration-indigo-400/50 underline-offset-4 transition hover:text-purple-600 dark:text-indigo-200 dark:decoration-indigo-300/50 dark:hover:text-white"
    >
      {text}
    </a>
  );
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            className="glass relative z-10 mx-auto flex max-h-[90vh] w-[92%] max-w-3xl flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-2xl dark:border-white/10 md:max-h-[80vh]"
            initial={{ scale: 0.98, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 8 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl"
              style={{
                background:
                  "linear-gradient(120deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))",
                filter: "blur(30px)",
              }}
            />

            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 p-5 dark:border-white/10">
                <div>
                  <h2
                    id="about-modal-title"
                    className="mt-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl"
                  >
                    {i18n.aboutModal.title}
                  </h2>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {i18n.aboutModal.subtitle}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close about modal"
                  className="rounded-md p-2 transition-all duration-150 hover:scale-105"
                >
                  <FiX className="h-5 w-5 text-slate-500 dark:text-slate-300" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth p-6">
                <div className="space-y-8 text-gray-700 dark:text-slate-300">
                  <section className="space-y-5">
                    <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                      👋🏻 {i18n.aboutModal.section1Intro}{" "}
                      <AboutModalLink
                        href={NAGPUR_LOCATION}
                        text={i18n.aboutModal.nagpur}
                      />
                      .
                    </p>

                    <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                      {i18n.aboutModal.childhood}
                    </p>

                    <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                      {i18n.aboutModal.education}{" "}
                      <AboutModalLink
                        href={PUNE_LOCATION}
                        text={i18n.aboutModal.pune}
                      />
                      .
                    </p>
                  </section>

                  <div className="border-t border-gray-200 dark:border-white/10" />

                  <section className="space-y-5">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {i18n.aboutModal.occupiedTitle}
                      </h3>
                    </div>
                    <p className="max-w-3xl leading-8 text-gray-500 dark:text-slate-400">
                      {i18n.aboutModal.occupiedDescription}
                    </p>
                    <BarGraph data={chartData} />
                  </section>

                  <div className="border-t border-gray-200 dark:border-white/10" />

                  <section className="space-y-4">
                    <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                      {i18n.aboutModal.journeyPart1}
                    </p>

                    <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                      {i18n.aboutModal.journeyPart2}{" "}
                      <AboutModalLink
                        href={AMS_WORLD}
                        text={i18n.aboutModal.amsPvtLtd}
                      />
                      {i18n.aboutModal.amsPart2}
                    </p>

                    <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                      {i18n.aboutModal.convictionPart1}{" "}
                      <AboutModalLink
                        href={SMART_DATA}
                        text={i18n.aboutModal.smartData}
                      />
                      {i18n.aboutModal.smartDataPart2}
                    </p>

                    <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                      {i18n.aboutModal.persistentPart1}{" "}
                      <AboutModalLink
                        href={PERSISTENT}
                        text={i18n.aboutModal.persistent}
                      />
                      {i18n.aboutModal.persistentPart2}{" "}
                      <AboutModalLink
                        href={ZENDESK}
                        text={i18n.aboutModal.zendesk}
                      />{" "}
                      {i18n.aboutModal.zendeskBotPart1}
                    </p>

                    <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                      {i18n.aboutModal.currentlyPart1}{" "}
                      <AboutModalLink
                        href={ZENDESK}
                        text={i18n.aboutModal.zendesk}
                      />
                      {i18n.aboutModal.currentlyPart2}
                    </p>

                    <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                      {i18n.aboutModal.outside}
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
