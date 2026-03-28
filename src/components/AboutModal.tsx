"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMapPin, FiUser, FiX } from "react-icons/fi";
import BarGraph, { type BarGraphDatum } from "@/components/BarGraph";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
};

const chartData: BarGraphDatum[] = [
  { name: "Coding", value: 90, color: "#3B82F6" },
  { name: "Mentoring", value: 60, color: "#9ecae1" },
  { name: "Dancing", value: 40, color: "#deebf7" },
  { name: "Learning", value: 50, color: "#3182bd" },
  { name: "AI Exploration", value: 70, color: "#9ecae1" },
  { name: "DIY projects", value: 60, color: "#deebf7" },
];

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
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 md:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            className="glass relative z-10 mx-auto max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-slate-950/40"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl"
              style={{
                background:
                  "linear-gradient(120deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))",
                filter: "blur(30px)",
              }}
            />

            <div className="relative z-10 max-h-[88vh] overflow-y-auto scroll-smooth">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 md:p-7">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-indigo-300/80">
                    Get to know me
                  </p>
                  <h2
                    id="about-modal-title"
                    className="mt-3 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
                  >
                    Welcome to my little corner of the internet!
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close about modal"
                  className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:scale-105 hover:bg-white/[0.08] hover:text-white"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-8 p-5 text-slate-300 md:p-7">
                <section className="space-y-5">
                  <p className="leading-8 text-slate-300/95">
                    👋🏻 Hi friends, My name is Swapnil. I was born and raised in{" "}
                    <a
                      href="https://www.google.com/maps/place/Nagpur,+Maharashtra/data=!4m2!3m1!1s0x3bd4c0a5a31faf13:0x19b37d06d0bb3e2b?sa=X&ved=1t:242&ictx=111"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-indigo-200 underline decoration-indigo-300/50 underline-offset-4 transition hover:text-white"
                    >
                      Nagpur, Maharashtra, India
                    </a>
                    .
                  </p>

                  <p className="leading-8 text-slate-300/95">
                    As a kid, I always wanted to be an artist. I just could not
                    wait for the art classes to start when I was in school. I
                    used to spend my weekends sketching, painting, and dancing.
                  </p>

                  <p className="leading-8 text-slate-300/95">
                    After graduating with a Bachelor of Information Technology
                    degree, I started my career in a Nagpur-based company
                    located in MIHAN. Later, I got an opportunity to work with
                    an MNC and moved to the beautiful city of{" "}
                    <a
                      href="https://www.google.com/maps/place/Pune,+Maharashtra/data=!4m2!3m1!1s0x3bc2bf2e67461101:0x828d43bf9d9ee343?sa=X&ved=1t:242&ictx=111"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-indigo-200 underline decoration-indigo-300/50 underline-offset-4 transition hover:text-white"
                    >
                      Pune, Maharashtra, India
                    </a>
                    .
                  </p>
                </section>

                <div className="border-t border-white/10" />

                <section className="space-y-5">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="h-5 w-5 text-indigo-300" />
                    <h3 className="text-2xl font-semibold text-white">
                      How do I stay occupied?
                    </h3>
                  </div>
                  <p className="max-w-3xl leading-8 text-slate-400">
                    A healthy mix of coding, mentoring, learning, and DIY
                    projects keeps me energized and curious.
                  </p>
                  <BarGraph data={chartData} />
                </section>

                <div className="border-t border-white/10" />

                <section className="space-y-4">
                  <p className="leading-8 text-slate-300/95">
                    I&apos;m currently a Senior Software Engineer at{" "}
                    <a
                      href="https://www.zendesk.com/in/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-indigo-200 underline decoration-indigo-300/50 underline-offset-4 transition hover:text-white"
                    >
                      Zendesk
                    </a>
                    , where I&apos;ve had the opportunity to build and scale
                    meaningful products that impact real users. I started by
                    contributing to Admin Center features around pricing and
                    plans, working on a micro-frontend architecture using Rails,
                    React, TypeScript, and Redux. Today, I&apos;m focused on the
                    team management domain, crafting intuitive and scalable
                    experiences that grow with customers, while also advocating
                    for accessibility to ensure everything we build is inclusive
                    by design.
                  </p>

                  <p className="leading-8 text-slate-300/95">
                    Outside of work, I enjoy traveling to new places, exploring
                    different experiences, spending time with friends, and
                    making the most of life with my wife and son — because for
                    me, building great software matters, but so does building a
                    great life.
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
