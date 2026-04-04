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
    color: "hover:text-blue-500",
    glow: "0px 0px 14px rgba(59, 130, 246, 0.45)",
  },
  {
    name: "GitHub",
    href: GITHUB,
    icon: FaGithub,
    color: "hover:text-purple-400",
    glow: "0px 0px 14px rgba(168, 85, 247, 0.4)",
  },
  {
    name: "StackOverflow",
    href: STACKOVERFLOW,
    icon: FaStackOverflow,
    color: "hover:text-orange-500",
    glow: "0px 0px 14px rgba(249, 115, 22, 0.42)",
  },
  {
    name: "Instagram",
    href: INSTAGRAM,
    icon: FaInstagram,
    color: "hover:text-pink-500",
    glow: "0px 0px 14px rgba(236, 72, 153, 0.42)",
  },
  {
    name: "Facebook",
    href: FACEBOOK,
    icon: FaFacebook,
    color: "hover:text-blue-600",
    glow: "0px 0px 14px rgba(37, 99, 235, 0.42)",
  },
  {
    name: "YouTube",
    href: YOUTUBE,
    icon: FaYoutube,
    color: "hover:text-red-500",
    glow: "0px 0px 14px rgba(239, 68, 68, 0.42)",
  },
];

type SocialLinkSize = "sm" | "md" | "lg";
type SocialLinkVariant = "rounded" | "minimal";

const sizeClasses: Record<SocialLinkSize, { button: string; icon: string }> = {
  sm: { button: "p-1.5", icon: "text-sm" },
  md: { button: "p-2", icon: "text-base" },
  lg: { button: "p-3", icon: "text-lg" },
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
  const wrapperClassName = `flex items-center gap-4 ${className}`.trim();

  return (
    <div className={wrapperClassName}>
      {SOCIAL_LINKS.map(({ name, href, icon: Icon, color, glow }, index) => {
        const linkClassName = `
          group
          relative
          inline-flex
          items-center
          justify-center
          text-gray-600
          transition-all
          duration-300
          will-change-transform
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-indigo-300
          ${selectedSize.button}
          ${color}
          ${
            isMinimal
              ? "rounded-lg bg-transparent text-slate-600 dark:text-slate-300"
              : "rounded-lg border border-gray-200 bg-white/70 text-slate-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          }
        `.replace(/\s+/g, " ").trim();

        return (
          <motion.a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
            title={name}
            className={linkClassName}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            whileInView={{ opacity: 1, y: [10, -2, 0], scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.45,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            whileHover={
              isMinimal
                ? undefined
                : {
                    scale: 1.2,
                    y: -4,
                    rotate: 5,
                    boxShadow: glow,
                  }
            }
            whileTap={isMinimal ? undefined : { scale: 0.95 }}
          >
            <Icon className={selectedSize.icon} aria-hidden="true" />
            {showTooltip ? (
              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-200 bg-white/95 px-2 py-1 text-xs text-gray-800 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-white/10 dark:bg-slate-900/95 dark:text-white">
                {name}
              </span>
            ) : null}
          </motion.a>
        );
      })}
    </div>
  );
}
