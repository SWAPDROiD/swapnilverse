"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaStackOverflow,
  FaYoutube,
} from "react-icons/fa";
import {
  FACEBOOK,
  GITHUB,
  INSTAGRAM,
  LINKEDIN,
  STACKOVERFLOW,
  YOUTUBE,
} from "@/constants/links";

type SocialLink = {
  name: string;
  href: string;
  icon: IconType;
  color: string;
  glow: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    href: LINKEDIN,
    icon: FaLinkedin,
    color: "hover:text-active",
    glow: "0px 0px 18px rgba(0, 229, 255, 0.35)",
  },
  {
    name: "GitHub",
    href: GITHUB,
    icon: FaGithub,
    color: "hover:text-active",
    glow: "0px 0px 18px rgba(0, 229, 255, 0.35)",
  },
  {
    name: "StackOverflow",
    href: STACKOVERFLOW,
    icon: FaStackOverflow,
    color: "hover:text-active",
    glow: "0px 0px 18px rgba(0, 229, 255, 0.35)",
  },
  {
    name: "Instagram",
    href: INSTAGRAM,
    icon: FaInstagram,
    color: "hover:text-active",
    glow: "0px 0px 18px rgba(0, 229, 255, 0.35)",
  },
  {
    name: "Facebook",
    href: FACEBOOK,
    icon: FaFacebook,
    color: "hover:text-active",
    glow: "0px 0px 18px rgba(0, 229, 255, 0.35)",
  },
  {
    name: "YouTube",
    href: YOUTUBE,
    icon: FaYoutube,
    color: "hover:text-active",
    glow: "0px 0px 18px rgba(0, 229, 255, 0.35)",
  },
];

type SocialLinkSize = "sm" | "md" | "lg";
type SocialLinkVariant = "rounded" | "minimal";

const sizeClasses: Record<SocialLinkSize, { button: string; icon: string }> = {
  sm: { button: "h-10 w-10", icon: "text-sm" },
  md: { button: "h-11 w-11", icon: "text-base" },
  lg: { button: "h-12 w-12", icon: "text-lg" },
};

interface SocialLinksProps {
  size?: SocialLinkSize;
  variant?: SocialLinkVariant;
  showTooltip?: boolean;
  className?: string;
}

export default function SocialLinks({
  size = "md",
  variant = "rounded",
  showTooltip = false,
  className = "",
}: SocialLinksProps) {
  const selectedSize = sizeClasses[size];
  const isMinimal = variant === "minimal";
  const wrapperClassName = `flex min-w-0 flex-wrap items-center gap-3 ${className}`.trim();

  return (
    <div className={wrapperClassName}>
      {SOCIAL_LINKS.map(({ name, href, icon: Icon, color, glow }, index) => {
        const linkClassName = `group relative inline-flex items-center justify-center transition-all duration-200 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${selectedSize.button} ${color} ${
          isMinimal
            ? "rounded-xl border border-border bg-transparent text-text-secondary hover:border-accent/40 hover:bg-[rgba(0,212,255,0.05)]"
            : "rounded-2xl border border-border bg-[rgba(13,21,38,0.72)] text-text-secondary backdrop-blur-sm"
        }`;

        return (
          <motion.a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
            title={name}
            className={linkClassName}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
            whileHover={
              isMinimal
                ? { y: -3 }
                : {
                    y: -5,
                    boxShadow: glow,
                  }
            }
            whileTap={{ scale: 0.95 }}
          >
            <Icon className={selectedSize.icon} aria-hidden="true" />
            {showTooltip ? (
              <span className="pointer-events-none absolute -top-10 left-1/2 max-w-[12rem] -translate-x-1/2 break-words rounded-xl border border-border bg-surface px-3 py-1 text-center text-xs text-text-primary opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {name}
              </span>
            ) : null}
          </motion.a>
        );
      })}
    </div>
  );
}
