"use client";

import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
