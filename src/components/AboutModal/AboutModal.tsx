"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import BarGraph, { type BarGraphDatum } from "@/components/BarGraph";
import { COLORS } from "@/constants/colors";
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

const chartData: BarGraphDatum[] = [
  { name: "Coding", value: 90, color: COLORS.primary },
  { name: "Mentoring", value: 60, color: COLORS.secondary },
  { name: "Dancing", value: 40, color: COLORS.glow },
  { name: "Learning", value: 50, color: COLORS.active },
  { name: "AI Exploration", value: 70, color: COLORS.progress },
  { name: "DIY projects", value: 60, color: COLORS.trace },
];

function AboutModalLink({ href, text }: AboutModalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition hover:opacity-80"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="absolute inset-0 bg-[rgba(10,14,26,0.8)] backdrop-blur-md" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            className="modal-shell relative z-10 mx-auto flex max-h-[88vh] w-full max-w-5xl flex-col"
            initial={{ scale: 0.98, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-[rgba(13,21,38,0.92)] px-6 py-5 backdrop-blur-xl">
              <div>
                <h2 id="about-modal-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] text-text-primary md:text-3xl">
                  {i18n.aboutModal.title}
                </h2>
                <div className="mt-1 text-sm text-text-secondary">{i18n.aboutModal.subtitle}</div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close about modal"
                className="text-sm text-text-secondary transition hover:text-text-primary"
              >
                Close
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6 text-base leading-8 text-text-secondary">
                <section className="bento-card space-y-5">
                  <p>
                    {i18n.aboutModal.section1Intro}{" "}
                    <AboutModalLink href={NAGPUR_LOCATION} text={i18n.aboutModal.nagpur} />.
                  </p>

                  <p>{i18n.aboutModal.childhood}</p>

                  <p>
                    {i18n.aboutModal.education}{" "}
                    <AboutModalLink href={PUNE_LOCATION} text={i18n.aboutModal.pune} />.
                  </p>
                </section>

                <section className="bento-card space-y-5">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="h-5 w-5 text-accent" />
                    <h3 className="text-2xl font-semibold text-text-primary">{i18n.aboutModal.occupiedTitle}</h3>
                  </div>
                  <p>{i18n.aboutModal.occupiedDescription}</p>
                  <BarGraph data={chartData} />
                </section>

                <section className="bento-card space-y-5">
                  <p>{i18n.aboutModal.journeyPart1}</p>

                  <p>
                    {i18n.aboutModal.journeyPart2}{" "}
                    <AboutModalLink href={AMS_WORLD} text={i18n.aboutModal.amsPvtLtd} />
                    {i18n.aboutModal.amsPart2}
                  </p>

                  <p>
                    {i18n.aboutModal.convictionPart1}{" "}
                    <AboutModalLink href={SMART_DATA} text={i18n.aboutModal.smartData} />
                    {i18n.aboutModal.smartDataPart2}
                  </p>

                  <p>
                    {i18n.aboutModal.persistentPart1}{" "}
                    <AboutModalLink href={PERSISTENT} text={i18n.aboutModal.persistent} />
                    {i18n.aboutModal.persistentPart2}{" "}
                    <AboutModalLink href={ZENDESK} text={i18n.aboutModal.zendesk} /> {i18n.aboutModal.zendeskBotPart1}
                  </p>

                  <p>
                    {i18n.aboutModal.currentlyPart1}{" "}
                    <AboutModalLink href={ZENDESK} text={i18n.aboutModal.zendesk} />
                    {i18n.aboutModal.currentlyPart2}
                  </p>

                  <p>{i18n.aboutModal.outside}</p>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
