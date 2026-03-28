"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const float = {
  animate: { y: [0, -10, 0], rotate: [0, 2, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section id="home" className="flex min-h-screen items-center pt-[72px]">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 text-sm text-slate-500 dark:text-slate-400">
              Pune, Maharashtra, India
            </div>
            <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white md:text-5xl">
              Swapnil Nandapure
            </h1>

            <a
              href="https://git.io/typing-svg"
              target="_blank"
              rel="noreferrer"
              aria-label="Typing SVG profile roles"
              className="mt-3 block"
            >
              <img
                src="https://readme-typing-svg.demolab.com?font=Poppins&duration=3000&pause=200&color=F0DB4F&width=500&lines=Senior+Software+Engineer;React+Native+Developer;AI+Enthusiast;Building+Scalable+Applications"
                alt="Typing roles: Senior Software Engineer, React Native Developer, AI Enthusiast, Building Scalable Applications"
                width={500}
                height={56}
                className="mt-2"
              />
            </a>

            <p className="mt-2 font-semibold text-primary">
              Designing and engineering resilient, scalable systems for modern digital products.
            </p>
            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-400">
              I love designing and building digital products that solve real problems and make
              people&apos;s lives easier. Blending creativity with technology, I create scalable
              experiences across Banking, Healthcare, CRM, and E-commerce.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white transition-transform duration-300 hover:scale-105"
              >
                View Projects
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
              >
                Contact Me
              </button>
              <a
                href="/resume.pdf"
                className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-full blur-2xl"
                style={{
                  background: "linear-gradient(90deg,#6366F1, #8B5CF6, #06B6D4)",
                  filter: "blur(30px)",
                  opacity: 0.6,
                }}
              />
              <motion.div {...float} className="relative">
                <Image
                  src="/profile.jpg"
                  alt="Swapnil Nandapure"
                  width={384}
                  height={384}
                  priority
                  className="h-72 w-72 rounded-full border-4 border-white/10 object-cover md:h-96 md:w-96"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
