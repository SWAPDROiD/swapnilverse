"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import { PROJECTS, type Project } from "@/constants/projects";
import { i18n } from "@/i18n";

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
    <Section id="projects" className="section-shell">
      <div className="section-container">
        <div className="section-intro">
          <p className="section-label">Case Studies</p>
          <h2 className="section-heading">{i18n.projects.title}</h2>
          <p className="section-copy">{i18n.projects.subtitle}</p>
        </div>

        <div className="bento-grid">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="bento-card interactive-card group col-span-1 md:col-span-3 xl:col-span-4"
            >
              <div className="relative overflow-hidden rounded-[20px] border border-border bg-surface-high">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={420}
                  loading="lazy"
                  className="image-kinetic h-52 w-full object-cover"
                />
              </div>

              <div className="mt-6">
                <p className="section-label">{project.tech}</p>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-text-primary">{project.title}</h3>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button"
                >
                  {i18n.projects.viewProject}
                </a>
                <button
                  type="button"
                  onClick={() => setOpenProject(project)}
                  className="secondary-button"
                >
                  {i18n.projects.details}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpenProject(null);
            }}
          >
            <div className="absolute inset-0 bg-[rgba(10,14,26,0.8)] backdrop-blur-md" />
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-details-title"
              className="modal-shell relative z-10 mx-auto flex max-h-[88vh] w-full max-w-5xl flex-col"
              initial={{ scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ scale: 0.98, y: 8 }}
              transition={{ duration: 0.18 }}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-[rgba(13,21,38,0.92)] px-6 py-5 backdrop-blur-xl">
                <div>
                  <h2 id="project-details-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] text-text-primary md:text-3xl">
                    {openProject.details.fullTitle}
                  </h2>
                  <div className="mt-1 text-sm text-text-secondary">{openProject.details.subtitle}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {openProject.details.badges.map((badge) => (
                      <span key={badge} className="token-pill">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenProject(null)}
                  aria-label="Close project details"
                  className="text-sm text-text-secondary transition hover:text-text-primary"
                >
                  Close
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-6 text-text-secondary">
                  <div className="bento-card">
                    <div className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                      {openProject.details.highlight}
                    </div>
                    <p className="text-base leading-8">{openProject.details.overview}</p>
                  </div>

                  {openProject.details.highlights?.length ? (
                    <div className="bento-grid">
                      <div className="bento-card col-span-1 md:col-span-6 xl:col-span-6">
                        <h3 className="text-lg font-semibold text-text-primary">Impact &amp; Outcomes</h3>
                        <ul className="mt-4 grid list-inside list-disc gap-2 leading-7 md:grid-cols-1">
                          {openProject.details.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bento-card col-span-1 md:col-span-6 xl:col-span-6">
                        <h3 className="text-lg font-semibold text-text-primary">Role &amp; Contribution</h3>
                        <ul className="mt-4 list-inside list-disc space-y-2 leading-7">
                          {openProject.details.role.map((role) => (
                            <li key={role}>{role}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}

                  <div className="bento-grid">
                    <div className="bento-card col-span-1 md:col-span-6 xl:col-span-6">
                      <h3 className="text-lg font-semibold text-text-primary">Features</h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 leading-7">
                        {openProject.details.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bento-card col-span-1 md:col-span-6 xl:col-span-6">
                      <h3 className="text-lg font-semibold text-text-primary">Tech Stack</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {openProject.details.tech.map((tech) => (
                          <span key={tech} className="token-pill">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <h3 className="mt-8 text-lg font-semibold text-text-primary">Links</h3>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {openProject.details.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="primary-button"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
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
