"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import { PROJECTS, type Project } from "@/constants/projects";

export default function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenProject(null);
      if (event.key === "Tab" && openProject) {
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'a,button,[tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    if (openProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openProject]);

  return (
    <Section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-2xl font-bold text-slate-950 dark:text-white"
        >
          Featured Projects
        </motion.h2>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          Highlights from 20+ applications I have built
        </p>

        <div className="grid gap-6 md:grid-cols-4">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass overflow-hidden rounded-lg"
            >
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={420}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <div className="font-semibold text-slate-950 dark:text-white">{project.title}</div>
                  <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                    {project.tech}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md bg-gradient-to-r from-primary to-secondary px-3 py-2 text-sm text-white"
                    >
                      View Project
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpenProject(project)}
                      className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm transition hover:bg-white/5"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpenProject(null);
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              ref={modalRef}
              className="glass relative z-10 mx-auto w-[94%] max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              style={{ maxHeight: "80vh" }}
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl"
                style={{
                  background: "linear-gradient(90deg, rgba(99,102,241,0.06), rgba(124,58,237,0.06))",
                  filter: "blur(24px)",
                }}
              />
              <div className="relative z-10 max-h-[80vh] overflow-y-auto">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                      {openProject.details.fullTitle}
                    </h2>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {openProject.details.subtitle}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {openProject.details.badges.map((badge) => (
                        <span
                          key={badge}
                          className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-800 dark:text-white"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenProject(null)}
                    aria-label="Close project details"
                    className="rounded-md p-2 transition hover:bg-white/10"
                  >
                    <svg className="h-5 w-5 text-slate-500 dark:text-slate-300" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6 p-6">
                  <div className="text-slate-700 dark:text-slate-300">
                    <div className="mb-2 text-sm font-medium text-indigo-300">
                      {openProject.details.highlight}
                    </div>
                    <p className="leading-relaxed">{openProject.details.overview}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Features</h3>
                    <ul className="grid list-inside list-disc gap-2 text-slate-700 dark:text-slate-300 md:grid-cols-2">
                      {openProject.details.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                      Role &amp; Contribution
                    </h3>
                    <ul className="list-inside list-disc text-slate-700 dark:text-slate-300">
                      {openProject.details.role.map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {openProject.details.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-800 dark:text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {openProject.details.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 text-white transition hover:shadow-lg"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
