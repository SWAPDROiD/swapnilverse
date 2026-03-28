"use client";

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
  url: string;
  icon: IconType;
  hoverColor: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "LinkedIn", url: LINKEDIN, icon: FaLinkedin, hoverColor: "hover:text-blue-500" },
  { name: "GitHub", url: GITHUB, icon: FaGithub, hoverColor: "hover:text-violet-400" },
  {
    name: "StackOverflow",
    url: STACKOVERFLOW,
    icon: FaStackOverflow,
    hoverColor: "hover:text-orange-500",
  },
  { name: "Instagram", url: INSTAGRAM, icon: FaInstagram, hoverColor: "hover:text-pink-500" },
  { name: "Facebook", url: FACEBOOK, icon: FaFacebook, hoverColor: "hover:text-blue-600" },
  { name: "YouTube", url: YOUTUBE, icon: FaYoutube, hoverColor: "hover:text-red-500" },
];

type SocialLinkSize = "sm" | "md" | "lg";
type SocialLinkVariant = "default" | "minimal";

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
  variant = "default",
  showTooltip = false,
  className = "",
}: SocialLinksProps) {
  const selectedSize = sizeClasses[size];
  const isMinimal = variant === "minimal";
  const wrapperClassName = `flex items-center gap-3 ${className}`.trim();

  return (
    <div className={wrapperClassName}>
      {SOCIAL_LINKS.map(({ name, url, icon: Icon, hoverColor }) => {
        const linkClassName = `
          group
          relative
          inline-flex
          items-center
          justify-center
          text-gray-600
          transition-all
          duration-300
          hover:scale-110
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-indigo-300
          ${selectedSize.button}
          ${hoverColor}
          ${
            isMinimal
              ? "bg-transparent border-none rounded-none backdrop-blur-0 dark:text-slate-300"
              : "rounded-lg border border-gray-200 bg-white/70 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          }
        `.replace(/\s+/g, " ").trim();

        return (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
            title={name}
            className={linkClassName}
          >
            <Icon className={selectedSize.icon} aria-hidden="true" />
            {showTooltip ? (
              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-200 bg-white/95 px-2 py-1 text-xs text-gray-800 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-white/10 dark:bg-slate-900/95 dark:text-white">
                {name}
              </span>
            ) : null}
          </a>
        );
      })}
    </div>
  );
}
