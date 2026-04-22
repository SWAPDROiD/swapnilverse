"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { SKILL_CATEGORIES } from "@/constants/skills";
import { i18n } from "@/i18n";

export default function Skills() {
  return (
    <Section id="skills" className="section-shell">
      <div className="section-container">
        <div className="section-intro">
          <p className="section-label">Capability Stack</p>
          <h2 className="section-heading">{i18n.skills.title}</h2>
        </div>

        <div className="bento-grid">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="bento-card interactive-card col-span-1 md:col-span-3 xl:col-span-3"
            >
              <p className="section-label">{category.title}</p>
              <div className="mt-6 flex flex-col gap-4">
                {category.items.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-base text-text-primary">{item.label}</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[rgba(0,212,255,0.08)]">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.05 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
