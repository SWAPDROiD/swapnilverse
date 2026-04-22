"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import { i18n } from "@/i18n";

const linkClass = "font-medium text-accent underline decoration-accent/40 underline-offset-4 transition hover:opacity-80";
const codeClass = "rounded-md border border-border bg-surface-high px-1.5 py-0.5 text-sm text-accent";

export default function Toolbox() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Section id="toolbox" className="section-shell relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, boxShadow: "0 28px 80px rgba(0, 212, 255, 0.16)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group relative overflow-hidden rounded-[24px] border border-[#1a2a4a] bg-gradient-to-br from-[#0d1526] to-[#0d1b2e]"
        >
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#00d4ff] opacity-10 blur-[120px]" />
            <div className="absolute right-[-4rem] top-[-3rem] h-64 w-64 rounded-full bg-[#00ffff] opacity-10 blur-[140px]" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,212,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.07) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-8 lg:p-10">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#00d4ff]">
                Toolbox
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-white md:text-4xl">
                {i18n.toolbox.title}
              </h2>
              <p className="mt-4 max-w-md text-lg leading-8 text-[#8899aa]">
                {i18n.toolbox.description}
              </p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center rounded-xl bg-[#00d4ff] px-5 py-2.5 text-sm font-semibold text-[#0a0e1a] transition-colors duration-200 hover:bg-[#00ffff]"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  {i18n.toolbox.viewToolbox}
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex items-center justify-center py-2 md:justify-end"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            >
              <div className="absolute inset-x-8 bottom-6 h-16 rounded-full bg-[#00d4ff] opacity-10 blur-3xl" />
              <motion.div
                className="relative w-full max-w-md"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="overflow-hidden rounded-2xl border border-[#1a2a4a] shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="relative bg-[linear-gradient(180deg,rgba(13,21,38,0.94),rgba(13,27,46,0.94))] p-3">
                    <Image
                      src="/images/tools.webp"
                      alt="Developer toolbox preview"
                      width={420}
                      height={520}
                      className="block h-auto w-full scale-[0.98] rounded-[18px] grayscale-[60%] transition duration-300 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={overlayRef}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <div className="absolute inset-0 bg-[rgba(10,14,26,0.8)] backdrop-blur-md" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="toolbox-modal-title"
              className="modal-shell relative z-10 mx-auto flex max-h-[88vh] w-full max-w-5xl flex-col"
              initial={{ scale: 0.98, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 8 }}
              transition={{ duration: 0.18 }}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-[rgba(13,21,38,0.92)] px-6 py-5 backdrop-blur-xl">
                <div>
                  <h2 id="toolbox-modal-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] text-text-primary md:text-3xl">
                    {i18n.toolbox.modalTitle}
                  </h2>
                  <div className="mt-1 text-sm text-text-secondary">{i18n.toolbox.modalSubtitle}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close toolbox modal"
                  className="text-sm text-text-secondary transition hover:text-text-primary"
                >
                  Close
                </button>
              </div>

              <div className="min-h-0 overflow-y-auto px-6 py-6">
                <div className="space-y-8 text-base leading-8 text-text-secondary">
                  <p>{i18n.toolbox.toolboxIntro}</p>

                  <div className="bento-grid">
                    <div className="bento-card col-span-1 md:col-span-6 xl:col-span-6">
                      <h3 className="text-xl font-bold text-text-primary">Tech</h3>
                      <ul className="mt-4 list-inside list-disc space-y-3">
                        <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className={linkClass}>React</a>: It is more than a library, an architecture, or even an ecosystem. React is a community!</li>
                        <li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>TypeScript</a>: Javascript on steroids! I love seeing <code className={codeClass}>.ts</code> files over <code className={codeClass}>.js</code></li>
                        <li><a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>NextJs</a>: I&apos;ve been playing around with NextJS 13 lately. So far, enjoying the framework. This site is built with NextJS.</li>
                        <li><a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer" className={linkClass}>Jest</a>: My default JavaScript Testing Framework.</li>
                        <li><a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank" rel="noopener noreferrer" className={linkClass}>React Testing Library</a>: A library that encourages better testing practices.</li>
                        <li><a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer" className={linkClass}>Cypress.io</a>: Cypress is a great tool for E2E testing. Bummed that it still doesn&apos;t have <a href="https://docs.cypress.io/api/commands/type#Typing-tab-key-does-not-work" target="_blank" rel="noopener noreferrer" className={linkClass}>TAB support</a> for accessibility testing.</li>
                        <li><a href="https://www.jenkins.io/" target="_blank" rel="noopener noreferrer" className={linkClass}>Jenkins</a>: Jenkins is a powerhouse for CI/CD automation. It automates the entire software development lifecycle from building and testing to deployment. The extensible plugin ecosystem makes it incredibly flexible for any pipeline you can imagine.</li>
                        <li><a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>Tailwind CSS</a>: Once you know the utility classes, it&apos;s the best way to write CSS.</li>
                        <li><a href="https://styled-components.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>styled-components</a>: The fact that you can write actual CSS in your JavaScript is awesome. I use this at my work.</li>
                        <li><a href="https://storybook.js.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>Storybook</a>: Great tool for building UI components and pages in isolation.</li>
                      </ul>
                    </div>

                    <div className="bento-card col-span-1 md:col-span-6 xl:col-span-6">
                      <h3 className="text-xl font-bold text-text-primary">Editor</h3>
                      <p className="mt-4">If you are spending long hours looking at your editor, might as well have a good setup</p>
                      <ul className="mt-4 list-inside list-disc space-y-3">
                        <li><a href="https://developer.android.com/studio" target="_blank" rel="noopener noreferrer" className={linkClass}>Android Studio</a>: I have been using Android Studio since I started my career as an Android developer. It&apos;s the official IDE for Android development and has become an essential part of my development workflow.</li>
                        <li><a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>Visual Studio Code</a>: I switched to VSCode back in 2019 and have never looked back since then.</li>
                        <li><a href="https://marketplace.visualstudio.com/items?itemName=liviuschera.noctis" target="_blank" rel="noopener noreferrer" className={linkClass}>Noctis editor theme</a>: I love this theme. It has been my default theme for a while now.</li>
                        <li><a href="https://philpl.gumroad.com/l/dank-mono" target="_blank" rel="noopener noreferrer" className={linkClass}>Dank Mono font</a>: The coding typeface for aesthetes.</li>
                      </ul>
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
