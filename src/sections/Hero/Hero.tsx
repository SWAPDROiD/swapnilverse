"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RESUME_URL } from "@/constants/links";

const float = {
  animate: { y: [0, -10, 0], rotate: [0, 2, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

const typingLines = [
  "Senior Software Engineer",
  "Mentor",
  "Problem Solver",
  "AI & AI Agents Builder",
];

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = typingLines[lineIndex];
    const isLineComplete = typedText === currentLine;
    const isLineCleared = typedText.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          if (isLineComplete) {
            setIsDeleting(true);
            return;
          }

          setTypedText(currentLine.slice(0, typedText.length + 1));
          return;
        }

        if (isLineCleared) {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % typingLines.length);
          return;
        }

        setTypedText(currentLine.slice(0, typedText.length - 1));
      },
      !isDeleting ? (isLineComplete ? 1100 : 80) : 45,
    );

    return () => window.clearTimeout(timeout);
  }, [isDeleting, lineIndex, typedText]);

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
            <div className="mb-4 text-sm text-gray-500 dark:text-slate-400">
              Pune, Maharashtra, India
            </div>
            <h1 className="text-4xl font-extrabold tracking-wide text-gray-900 dark:text-white md:text-5xl">
              Hi, I&apos;m Swapnil Nandapure
            </h1>
            <p className="mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-lg font-semibold tracking-wide text-transparent md:text-2xl">
              {typedText}
              <span className="ml-1 inline-block text-pink-500">|</span>
            </p>
            <p className="mt-4 text-[#94A3B8] max-w-xl">I love designing and building digital products that solve real problems and make people&apos;s lives easier. Blending creativity with technology, I create scalable experiences across Banking, Healthcare, CRM, and E-Commerce.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                Hire Me
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
              >
                View Projects
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
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
                  opacity: 0.28,
                }}
              />
              <motion.div {...float} className="relative">
                <Image
                  src="/profile.webp"
                  alt="Swapnil Nandapure"
                  width={384}
                  height={384}
                  priority
                  className="h-72 w-72 rounded-full border-4 border-white/70 object-cover shadow-[0_0_40px_rgba(99,102,241,0.15)] dark:border-white/10 md:h-96 md:w-96"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
