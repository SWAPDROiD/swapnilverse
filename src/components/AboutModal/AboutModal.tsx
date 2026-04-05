"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMapPin, FiUser, FiX } from "react-icons/fi";
import BarGraph, { type BarGraphDatum } from "@/components/BarGraph";

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
            className="glass relative z-10 mx-auto max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 shadow-2xl shadow-slate-300/50 dark:border-white/10 dark:shadow-slate-950/40"
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
              <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-5 md:p-7 dark:border-white/10">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-indigo-600/80 dark:text-indigo-300/80">
                    Get to know me
                  </p>
                  <h2
                    id="about-modal-title"
                    className="mt-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
                  >
                    Welcome to my little corner of the internet!
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close about modal"
                  className="rounded-full border border-gray-200 bg-white/70 p-2 text-gray-600 transition hover:scale-105 hover:bg-gray-100 hover:text-gray-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-8 p-5 text-gray-700 md:p-7 dark:text-slate-300">
                <section className="space-y-5">
                  <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                    👋🏻 Hi friends, My name is Swapnil. I was born and raised in{" "}
                    <AboutModalLink
                      href="https://www.google.com/maps/place/Nagpur,+Maharashtra/data=!4m2!3m1!1s0x3bd4c0a5a31faf13:0x19b37d06d0bb3e2b?sa=X&ved=1t:242&ictx=111"
                      text="Nagpur, Maharashtra, India"
                    />
                    .
                  </p>

                  <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                    As a kid, I always wanted to be an artist. I just could not
                    wait for the art classes to start when I was in school. I
                    used to spend my weekends sketching, painting, and dancing.
                  </p>

                  <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                    After graduating with a Bachelor of Information Technology
                    degree, I started my career in a Nagpur-based company
                    located in MIHAN. Later, I got an opportunity to work with
                    an MNC and moved to the beautiful city of{" "}
                    <AboutModalLink
                      href="https://www.google.com/maps/place/Pune,+Maharashtra/data=!4m2!3m1!1s0x3bc2bf2e67461101:0x828d43bf9d9ee343?sa=X&ved=1t:242&ictx=111"
                      text="Pune, Maharashtra, India"
                    />
                    .
                  </p>
                </section>

                <div className="border-t border-gray-200 dark:border-white/10" />

                <section className="space-y-5">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      How do I stay occupied?
                    </h3>
                  </div>
                  <p className="max-w-3xl leading-8 text-gray-500 dark:text-slate-400">
                    A healthy mix of coding, mentoring, learning, and DIY
                    projects keeps me energized and curious.
                  </p>
                  <BarGraph data={chartData} />
                </section>

                <div className="border-t border-gray-200 dark:border-white/10" />

                <section className="space-y-4">
                  <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                    From a curious engineering graduate to a seasoned software
                    engineer, my journey has been a continuous pursuit of
                    growth, learning, and building meaningful digital
                    experiences.
                  </p>

                  <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                    After completing my Bachelor&apos;s degree in Information
                    Technology in 2015, I began my professional journey as an
                    Android application developer at{" "}
                    <AboutModalLink
                      href="https://www.amsworld.net/"
                      text="Automations Manifold Services Pvt Ltd"
                    />
                    . Being part of a startup environment gave me the
                    opportunity to wear multiple hats — I wasn&apos;t just
                    building native Android applications, but also crafting
                    RESTful APIs using JSP, Servlets, and Spring Boot,
                    integrating them with web applications, and managing
                    databases like PostgreSQL. From development to deployment —
                    including publishing apps on the Play Store and hosting web
                    applications — I was deeply involved in the complete product
                    lifecycle. This phase shaped me into a true full-stack
                    engineer and taught me the value of ownership.
                  </p>

                  <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                    I then expanded my horizons by working with Conviction
                    Softwares and later{" "}
                    <AboutModalLink
                      href="https://www.smartdatainc.com/"
                      text="smartData Enterprises (I) Ltd"
                    />
                    . where I spent over four years building scalable
                    applications across healthcare and e-commerce domains.
                    During this time, I transitioned into modern web
                    technologies like React and React Native, while also
                    stepping into leadership responsibilities as a team lead —
                    mentoring developers and driving project delivery.
                  </p>

                  <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                    A pivotal chapter in my journey came with{" "}
                    <AboutModalLink
                      href="https://www.persistent.com/"
                      text="Persistent Systems"
                    />
                    , where I worked as an Engineering Lead for nearly four
                    years. Here, I gained deep exposure to the banking domain
                    and enterprise-grade systems. It was during this phase that
                    a defining opportunity came my way — I joined{" "}
                    <AboutModalLink
                      href="https://www.zendesk.com/in/"
                      text="Zendesk"
                    />{" "}
                    as part of the{" "}
                    <strong>
                      <code className={codeClass}>BOT team</code>
                    </strong>
                    , and within just six months, I was converted into a
                    full-time employee. That transition marked a significant
                    milestone in my career.
                  </p>

                  <p className="leading-8 text-gray-700 dark:text-slate-300/95">
                    Today, I&apos;m Senior Software Engineer at{" "}
                    <AboutModalLink
                      href="https://www.zendesk.com/in/"
                      text="Zendesk"
                    />
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

                  <p className="leading-8 text-gray-700 dark:text-slate-300/95">
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
