"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import AboutModal from "@/components/AboutModal";
import Section from "@/components/Section";
import { ZENDESK } from "@/constants/links";
import { i18n } from "@/i18n";

const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <>
      <Section id="about" className="section-shell">
        <div className="section-container">
          <div className="section-intro">
            <p className="section-label">About</p>
            <h2 className="section-heading">{i18n.about.title}</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.12 }}
            className="bento-grid"
          >
            <motion.div variants={card} className="bento-card interactive-card col-span-1 xl:col-span-4">
              <p className="section-label">Output</p>
              <div className="mt-8 break-words whitespace-normal text-5xl font-extrabold leading-none tracking-[-0.08em] text-text-primary md:text-6xl">
                {i18n.about.applicationsDeliveredCount}
              </div>
              <p className="mt-3 break-words whitespace-normal leading-snug text-lg text-text-secondary">
                {i18n.about.applicationsDelivered}
              </p>
            </motion.div>

            <motion.div variants={card} className="bento-card interactive-card col-span-1 xl:col-span-4">
              <p className="section-label">Domains</p>
              <h3 className="mt-8 break-words whitespace-normal text-2xl font-bold leading-snug tracking-[-0.04em] text-text-primary">
                {i18n.about.expertise}
              </h3>
              <p className="mt-3 break-words whitespace-normal text-lg leading-8 text-text-secondary">
                {i18n.about.expertiseDescription}
              </p>
            </motion.div>

            <motion.div variants={card} className="bento-card interactive-card col-span-1 xl:col-span-4">
              <p className="section-label">Current Mission</p>
              <div className="mt-8 break-words whitespace-normal text-2xl font-bold leading-snug tracking-[-0.04em] text-text-primary">
                <span>{i18n.about.currentlyAt} </span>
                <a
                  href={ZENDESK}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent transition hover:opacity-80"
                >
                  {i18n.about.zendesk}
                </a>
                <span className="text-text-secondary"> {i18n.about.zendeskLocation}</span>
              </div>
              <p className="mt-3 break-words whitespace-normal text-lg leading-8 text-text-secondary">
                {i18n.about.zendeskDescription}
                and intelligent agents.
              </p>
            </motion.div>

            <motion.div variants={card} className="bento-card col-span-1 xl:col-span-12">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="section-label">Deep Dive</p>
                  <p className="mt-3 max-w-2xl text-lg leading-8 text-text-secondary">
                    A closer look at the journey, the decisions, and the kind of systems I love building.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAboutModalOpen(true)}
                  className="primary-button"
                >
                  Get to know me
                </button>
              </div>
            </motion.div>
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
