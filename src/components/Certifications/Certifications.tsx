"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import { FEATURED_CERTIFICATIONS } from "@/constants/certifications";
import { LINKEDIN_CERTIFICATIONS } from "@/constants/links";
import { i18n } from "@/i18n";

export default function Certifications() {
  return (
    <Section id="certifications" className="section-shell">
      <div className="section-container">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="section-intro mb-0">
            <p className="section-label">Credentials</p>
            <h2 className="section-heading">{i18n.certifications.title}</h2>
            <p className="section-copy">{i18n.certifications.subtitle}</p>
          </div>

          <motion.a
            href={LINKEDIN_CERTIFICATIONS}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-button"
          >
            {i18n.certifications.viewAllButton}
          </motion.a>
        </div>

        <div className="bento-grid">
          {FEATURED_CERTIFICATIONS.map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="bento-card interactive-card group col-span-1 md:col-span-3 xl:col-span-3"
            >
              <div className="relative mb-6 h-32 overflow-hidden rounded-[20px] border border-border bg-surface-high">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="image-kinetic object-contain p-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>

              <p className="section-label">{cert.provider}</p>
              <h3 className="mt-4 line-clamp-2 text-xl font-bold tracking-[-0.04em] text-text-primary">
                {cert.title}
              </h3>
              {cert.issueDate ? (
                <p className="mt-2 text-sm text-text-secondary">{cert.issueDate}</p>
              ) : null}

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                {i18n.certifications.viewCredential}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 7h10v10M7 17L17 7" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
