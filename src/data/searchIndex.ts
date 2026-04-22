import { FEATURED_CERTIFICATIONS } from "@/constants/certifications";
import { PROJECTS } from "@/constants/projects";
import { SKILL_CATEGORIES } from "@/constants/skills";
import { i18n } from "@/i18n";

export type SearchItem = {
  id: string;
  title: string;
  description?: string;
  keywords?: string[];
  path: string;
};

const heroItems: SearchItem[] = [
  {
    id: "hero-title",
    title: i18n.hero.title,
    description: i18n.hero.description,
    keywords: [i18n.hero.location, ...i18n.hero.typingLines],
    path: "#home",
  },
];

const aboutItems: SearchItem[] = [
  {
    id: "about-section",
    title: i18n.about.title,
    description: i18n.about.expertiseDescription,
    keywords: [
      i18n.about.applicationsDelivered,
      i18n.about.applicationsDeliveredCount,
      i18n.about.expertise,
      i18n.about.zendesk,
      i18n.about.zendeskDescription,
    ],
    path: "#about",
  },
  {
    id: "about-journey",
    title: i18n.about.zendeskDescription,
    description: i18n.about.expertise,
    keywords: [
      i18n.about.title,
      i18n.about.applicationsDelivered,
      i18n.about.applicationsDeliveredCount,
      i18n.about.currentlyAt,
      i18n.about.zendesk,
      i18n.about.zendeskLocation,
    ],
    path: "#about",
  },
];

const skillItems: SearchItem[] = SKILL_CATEGORIES.flatMap((category) => {
  const labels = category.items.map((item) => item.label);

  return [
    {
      id: `skills-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title: `${i18n.skills.title} - ${category.title}`,
      description: labels.join(", "),
      keywords: [category.title, ...labels],
      path: "#skills",
    },
    ...category.items.map((item) => ({
      id: `skill-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title: item.label,
      description: `${i18n.skills.title} - ${category.title}`,
      keywords: [category.title, i18n.skills.title],
      path: "#skills",
    })),
  ];
});

const certificationItems: SearchItem[] = FEATURED_CERTIFICATIONS.map((cert) => ({
  id: `cert-${cert.id}`,
  title: cert.title,
  description: cert.provider,
  keywords: [i18n.certifications.title, cert.provider, cert.issueDate ?? ""].filter(Boolean),
  path: "#certifications",
}));

const toolboxItems: SearchItem[] = [
  {
    id: "toolbox-section",
    title: i18n.toolbox.title,
    description: i18n.toolbox.description,
    keywords: [
      i18n.toolbox.modalTitle,
      i18n.toolbox.modalSubtitle,
      i18n.toolbox.toolboxIntro,
    ],
    path: "#toolbox",
  },
];

const projectItems: SearchItem[] = PROJECTS.flatMap((project) => [
  {
    id: `project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: project.details.fullTitle,
    description: project.details.subtitle,
    keywords: [
      project.title,
      project.tech,
      project.details.highlight,
      project.details.overview,
      ...(project.details.roleTitle ? [project.details.roleTitle] : []),
      ...(project.details.duration ? [project.details.duration] : []),
      ...(project.details.team ? [project.details.team] : []),
      ...project.details.badges,
      ...project.details.features,
      ...project.details.role,
      ...project.details.tech,
      ...(project.details.highlights ?? []),
      ...(project.details.environment ?? []),
    ],
    path: "#projects",
  },
  {
    id: `project-summary-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: project.title,
    description: project.details.highlight,
    keywords: [
      project.details.fullTitle,
      project.details.subtitle,
      ...project.details.badges,
      ...project.details.tech,
    ],
    path: "#projects",
  },
]);

const contactItems: SearchItem[] = [
  {
    id: "contact-section",
    title: i18n.contact.title,
    description: i18n.contact.openTo,
    keywords: [
      i18n.contact.experience,
      i18n.contact.applicationsDelivered,
      i18n.contact.reachMeDirectly,
      i18n.contact.email,
      i18n.contact.phone,
      i18n.contact.enjoyed,
      i18n.contact.buyMeCoffee,
    ],
    path: "#contact",
  },
];

export const SEARCH_INDEX: SearchItem[] = [
  ...heroItems,
  ...aboutItems,
  ...skillItems,
  ...certificationItems,
  ...toolboxItems,
  ...projectItems,
  ...contactItems,
];

export const POPULAR_SEARCH_ITEMS: SearchItem[] = [
  SEARCH_INDEX.find((item) => item.id === "hero-title"),
  SEARCH_INDEX.find((item) => item.id === "about-section"),
  SEARCH_INDEX.find((item) => item.id === "toolbox-section"),
  SEARCH_INDEX.find((item) => item.id === "contact-section"),
  SEARCH_INDEX.find((item) => item.id === "project-zendesk"),
].filter((item): item is SearchItem => Boolean(item));
