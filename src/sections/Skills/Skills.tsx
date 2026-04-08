"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { SKILL_CATEGORIES } from "@/constants/skills";
import { i18n } from "@/i18n";

export default function Skills() {
  return (
    <Section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-2xl font-bold text-slate-950 dark:text-white"
        >
          {i18n.skills.title}
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-4">
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-md"
            >
              <div className="mb-2 font-semibold text-slate-950 dark:text-white">
                {category.title}
              </div>
              <div className="flex flex-col gap-2">
                {category.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                    <div className="text-slate-700 dark:text-slate-300">{item.label}</div>
                    <div className="h-2 w-24 overflow-hidden rounded-md bg-black/5 dark:bg-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${item.level}%` }}
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
