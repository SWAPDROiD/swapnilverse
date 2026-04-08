"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import AboutModal from "@/components/AboutModal";
import Section from "@/components/Section";
import { ZENDESK } from "@/constants/links";
import { i18n } from "@/i18n";

const card: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const iconVariants: Variants = {
  initial: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const aboutButtonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export default function About() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <>
      <Section id="about" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-2xl font-bold text-slate-950 dark:text-white"
          >
            {i18n.about.title}
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.12 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <motion.div
              variants={card}
              className="glass rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-md"
            >
              <div className="text-3xl font-bold text-slate-950 dark:text-white">
                {i18n.about.applicationsDeliveredCount}
              </div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {i18n.about.applicationsDelivered}
              </div>
            </motion.div>

            <motion.div
              variants={card}
              className="glass rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-md"
            >
              <div className="font-semibold text-slate-950 dark:text-white">
                {i18n.about.expertise}
              </div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {i18n.about.expertiseDescription}
              </div>
            </motion.div>

            <motion.div
              variants={card}
              className="glass rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-md"
            >
              <div className="inline-flex flex-wrap items-center gap-1 font-semibold text-slate-950 dark:text-white">
                <span>{i18n.about.currentlyAt}</span>
                <a
                  href={ZENDESK}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  {i18n.about.zendesk}
                </a>
                <span>{i18n.about.zendeskLocation}</span>
              </div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {i18n.about.zendeskDescription}
                and intelligent agents.
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5"
          >
            <motion.button
              type="button"
              onClick={() => setIsAboutModalOpen(true)}
              initial="initial"
              whileHover="hover"
              variants={aboutButtonVariants}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex cursor-pointer items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out"
              style={{
                background:
                  "linear-gradient(90deg, rgba(99,102,241,0.06), rgba(124,58,237,0.06))",
                border: "1px solid rgba(209,213,219,0.9)",
              }}
            >
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text font-semibold text-transparent">
                Get to know me
              </span>
              <motion.svg
                variants={iconVariants}
                className="h-4 w-4 text-slate-700 dark:text-white/80"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>
      </Section>

      <AboutModal
        open={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </>
  );
}
