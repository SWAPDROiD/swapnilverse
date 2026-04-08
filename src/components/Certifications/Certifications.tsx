"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Section from "@/components/Section";
import { FEATURED_CERTIFICATIONS } from "@/constants/certifications";
import { LINKEDIN_CERTIFICATIONS } from "@/constants/links";
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

const certButtonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export default function Certifications() {
  return (
    <Section id="certifications" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-2 text-2xl font-bold text-slate-950 dark:text-white">
              {i18n.certifications.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {i18n.certifications.subtitle}
            </p>
          </motion.div>

          <motion.a
            href={LINKEDIN_CERTIFICATIONS}
            target="_blank"
            rel="noopener noreferrer"
            initial="initial"
            whileHover="hover"
            variants={certButtonVariants}
            className="relative inline-flex shrink-0 cursor-pointer items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out"
            style={{
              background:
                "linear-gradient(90deg, rgba(99,102,241,0.06), rgba(124,58,237,0.06))",
              border: "1px solid rgba(209,213,219,0.9)",
            }}
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text font-semibold text-transparent">
              {i18n.certifications.viewAllButton}
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
          </motion.a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {FEATURED_CERTIFICATIONS.map((cert) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={card}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="glass group relative overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-indigo-500/20 dark:border-white/10"
            >
              <div className="relative mb-4 h-32 w-full overflow-hidden rounded-lg bg-white/5">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain p-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>

              <div className="space-y-2">
                <h3 className="line-clamp-2 font-semibold text-slate-950 dark:text-white">
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {cert.provider}
                </p>
                {cert.issueDate && (
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {cert.issueDate}
                  </p>
                )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-900 backdrop-blur-sm">
                    {i18n.certifications.viewCredential}
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 7h10v10M7 17L17 7" />
                    </svg>
                  </div>
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
