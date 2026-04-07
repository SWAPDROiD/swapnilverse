"use client";

import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Section from "@/components/Section";

const sectionVariants: Variants = {
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

const toolboxButtonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const linkClass =
  "text-indigo-600 underline transition duration-300 hover:text-purple-600 dark:text-pink-400 dark:hover:text-purple-400";

const codeClass =
  "rounded bg-gray-100 px-1 py-0.5 text-sm text-purple-600 dark:bg-gray-800 dark:text-purple-300";

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

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Section id="toolbox" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 rounded-full bg-gradient-to-br from-purple-700 via-indigo-800 to-pink-600 opacity-10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 opacity-10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="grid items-center gap-8 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <motion.div
            className="min-w-0 space-y-6"
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
            }}
          >
            <motion.h2 className="text-3xl font-bold text-slate-950 dark:text-white">
              Curious to checkout my toolbox?
            </motion.h2>
            <motion.p className="text-slate-600 dark:text-slate-300">
              Here&apos;s a curated collection of what I use to design, build, and ship modern digital experiences.
            </motion.p>

            <motion.div>
              <motion.button
                type="button"
                onClick={openModal}
                initial="initial"
                whileHover="hover"
                variants={toolboxButtonVariants}
                className="relative inline-flex cursor-pointer items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(99,102,241,0.06), rgba(124,58,237,0.06))",
                  border: "1px solid rgba(209,213,219,0.9)",
                }}
              >
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text font-semibold text-transparent">
                  View my toolbox
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
          </motion.div>

          <motion.div
            className="min-w-0 flex justify-center md:justify-end"
            variants={{
              hidden: { opacity: 0, x: 30 },
              show: { opacity: 1, x: 0 },
            }}
          >
            <motion.div
              className="relative w-full max-w-sm overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                boxShadow:
                  "0 20px 50px rgba(99,102,241,0.18), 0 10px 40px rgba(124,58,237,0.12), 0 0 80px rgba(236,72,153,0.08)",
              }}
            >
              <Image
                src="/images/tools.webp"
                alt="Developer toolbox preview"
                width={420}
                height={520}
                className="block h-auto w-full rounded-2xl"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  boxShadow:
                    "0 20px 50px rgba(99,102,241,0.18), 0 10px 40px rgba(124,58,237,0.12), 0 0 80px rgba(236,72,153,0.08)",
                  border: "1px solid rgba(124,58,237,0.20)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={overlayRef}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="toolbox-modal-title"
              className="glass relative z-10 mx-auto w-[92%] max-w-3xl overflow-hidden rounded-2xl border border-gray-200 shadow-2xl dark:border-white/10"
              initial={{ scale: 0.98, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 8 }}
              transition={{ duration: 0.18 }}
            >
              <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-white/10">
                <div>
                  <h2 id="toolbox-modal-title" className="mt-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                    What are my weapons?
                  </h2>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    A curated list of tools, editors, and resources I use daily.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close toolbox modal"
                  className="rounded-md p-2 transition-all duration-150 hover:scale-105"
                >
                  <svg
                    className="h-5 w-5 text-slate-500 dark:text-slate-300"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
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

              <div className="max-h-[70vh] overflow-y-auto p-6">
                <div className="mx-auto max-w-4xl space-y-6 break-words text-gray-700 dark:text-gray-300">
                  <p className="leading-relaxed text-gray-500 dark:text-gray-400">
                    I love discovering new tools and resources that can power my
                    productivity. Here&apos;s a peek into the tools and
                    technologies that I use and recommend. If you know a pro
                    tip, I&apos;m all ears!
                  </p>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-purple-400">
                      Tech
                    </h3>
                    <ul className="list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
                      <li>
                        <a
                          href="https://react.dev/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          React
                        </a>
                        : It is more than a library, an architecture, or even an
                        ecosystem. React is a community!
                      </li>
                      <li>
                        <a
                          href="https://www.typescriptlang.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          TypeScript
                        </a>
                        : Javascript on steroids! I love seeing{" "}
                        <code className={codeClass}>.ts</code> files over{" "}
                        <code className={codeClass}>.js</code>
                      </li>
                      <li>
                        <a
                          href="https://nextjs.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          NextJs
                        </a>
                        : I&apos;ve been playing around with NextJS 13 lately.
                        So far, enjoying the framework. This site is built with
                        NextJS.
                      </li>
                      <li>
                        <a
                          href="https://jestjs.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          Jest
                        </a>
                        : My default JavaScript Testing Framework.
                      </li>
                      <li>
                        <a
                          href="https://testing-library.com/docs/react-testing-library/intro/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          React Testing Library
                        </a>
                        : A library that encourages better testing practices.
                      </li>
                      <li>
                        <a
                          href="https://www.cypress.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          Cypress.io
                        </a>
                        : Cypress is a great tool for E2E testing. Bummed that
                        it still doesn&apos;t have{" "}
                        <a
                          href="https://docs.cypress.io/api/commands/type#Typing-tab-key-does-not-work"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          TAB support
                        </a>{" "}
                        for accessibility testing.
                      </li>
                      <li>
                        <a
                          href="https://tailwindcss.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          Tailwind CSS
                        </a>
                        : Once you know the utility classes, it&apos;s the best
                        way to write CSS.
                      </li>
                      <li>
                        <a
                          href="https://styled-components.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          styled-components
                        </a>
                        : The fact that you can write actual CSS in your
                        JavaScript is awesome. I use this at my work.
                      </li>
                      <li>
                        <a
                          href="https://storybook.js.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          Storybook
                        </a>
                        : Great tool for building UI components and pages in
                        isolation.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-purple-400">
                      Editor
                    </h3>
                    <p className="leading-relaxed text-gray-500 dark:text-gray-400">
                      If you are spending long hours looking at your editor,
                      might as well have a good setup
                    </p>
                    <ul className="list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
                      <li>
                        <a
                          href="https://code.visualstudio.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          Visual Studio Code
                        </a>
                        : I switched to VSCode back in 2019 and have never
                        looked back since then.
                      </li>
                      <li>
                        <a
                          href="https://marketplace.visualstudio.com/items?itemName=liviuschera.noctis"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          Noctis editor theme
                        </a>
                        : I love this theme. It has been my default theme for a
                        while now.
                      </li>
                      <li>
                        <a
                          href="https://philpl.gumroad.com/l/dank-mono"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          Dank Mono font
                        </a>
                        : The coding typeface for aesthetes.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-purple-400">
                      Productivity Tools
                    </h3>
                    <p className="leading-relaxed text-gray-500 dark:text-gray-400">
                      These are some of the desktop apps and Chrome extensions
                      that I use daily.
                    </p>
                    <ul className="list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
                      <li>Alfred App</li>
                      <li>Rectangle</li>
                      <li>Notion</li>
                      <li>Annotate</li>
                      <li>Dark Reader</li>
                      <li>SuperDev Pro</li>
                      <li>RunJS</li>
                      <li>axe DevTools</li>
                      <li>uBlock Origin</li>
                      <li>Calendy</li>
                      <li>React Developer Tools</li>
                      <li>GitHub Desktop</li>
                      <li>VisBug</li>
                      <li>ChatGPT</li>
                      <li>Copilot</li>
                      <li>Claude AI</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-purple-400">
                      Podcasts and books
                    </h3>
                    <ul className="list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
                      <li>
                        <a
                          href="https://open.spotify.com/show/1KBO1tSnm0XRlEILmqt7Em?si=f6b3a7f7f72a46ac"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ladybug Podcast"
                          className={linkClass}
                        >
                          Ladybug Podcast
                        </a>
                        : I recently discovered this podcast. Four seasoned
                        software developers working in different sectors share
                        their experiences and advice on different topics related
                        to software engineering. It&apos;s great, check it out!
                      </li>
                      <li>
                        <a
                          href="https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="The Joe Rogan Experience"
                          className={linkClass}
                        >
                          The Joe Rogan Experience
                        </a>
                        : I&apos;m a big Joe Rogan fan. I love the different
                        perspectives that he brings to the table. From comedians
                        to scientists, he has a wide range of guests on his
                        show.
                      </li>
                      <li>
                        <a
                          href="https://open.spotify.com/show/6czfajqqSfPYD7bKZaFUNg"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="The Call Kent Podcast"
                          className={linkClass}
                        >
                          The Call Kent Podcast
                        </a>
                        : I love listening to Kent&apos;s podcast. He answers
                        questions from his listeners and shares his thoughts on
                        different topics related to software engineering.
                      </li>
                      <li>
                        <a
                          href="https://open.spotify.com/show/7gZkflCpck1rTixj8M7yHt"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Deep Dive with Ali Abdaal"
                          className={linkClass}
                        >
                          Deep Dive with Ali Abdaal
                        </a>
                        : This podcast delves into the minds of entrepreneurs,
                        creators, and other inspiring people to uncover the
                        philosophies, strategies, and tools that help us live
                        happier, healthier, and more productive lives.
                      </li>
                      <li>
                        <a
                          href="https://open.spotify.com/show/0HfSakJOFwFEa0ujCEK1pO"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="React Podcast"
                          className={linkClass}
                        >
                          React Podcast
                        </a>
                        : I got to know about many people in React/JS community
                        through this podcast.
                      </li>
                      <li>
                        <a
                          href="https://www.refactoringui.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Refactoring UI"
                          className={linkClass}
                        >
                          Refactoring UI
                        </a>
                        : I have finished a few pages of the book and I loved
                        it. I haven&apos;t had a chance to go through the rest
                        of the book yet.
                      </li>
                      <li>
                        <a
                          href="https://epicreact.dev/learn"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Epic React"
                          className={linkClass}
                        >
                          Epic React
                        </a>
                        : This course provides comprehensive and in-depth
                        learning resources for mastering React. It is designed
                        to help developers enhance their React skills and become
                        more proficient in building robust and scalable
                        applications.
                      </li>
                      <li>
                        <a
                          href="https://maggieappleton.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Maggie Appleton"
                          className={linkClass}
                        >
                          Maggie Appleton
                        </a>
                        : Maggie makes visual essays about programming and
                        design using real-life metaphors through her
                        illustrations. I love her work.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-purple-400">
                      Newsletters
                    </h3>
                    <ul className="list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
                      <li>
                        <a
                          href="https://jamesclear.com/3-2-1"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="The 3-2-1 Newsletter"
                          className={linkClass}
                        >
                          The 3-2-1 Newsletter
                        </a>
                        : I love this newsletter by James Clear. It&apos;s a
                        weekly newsletter that has 3 ideas from him, 2 quotes
                        from others, and 1 question for you to ponder.
                      </li>
                      <li>
                        <a
                          href="https://www.densediscovery.com/archive/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Dense Discovery"
                          className={linkClass}
                        >
                          Dense Discovery
                        </a>
                        : A weekly newsletter that provides a curated collection
                        of useful apps, tools, websites, books, accessories, art
                        and design projects, as well as thought-provoking
                        things.
                      </li>
                      <li>
                        <a
                          href="https://aliabdaal.com/newsletter/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ali Abdaal"
                          className={linkClass}
                        >
                          Ali Abdaal
                        </a>
                        : Ali sends out a weekly newsletter with his thoughts on
                        productivity, books, cool things he found on the
                        internet, and a summary of his latest YouTube videos.
                      </li>
                      <li>
                        <a
                          href="https://kentcdodds.com/blog"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Kent C. Dodds"
                          className={linkClass}
                        >
                          Kent C. Dodds
                        </a>
                        : Kent has really good blogs. Subscribing to his
                        newsletter allows me to get notified when he publishes a
                        new blog or goes through some of his classic blogs.
                      </li>
                    </ul>
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
