import { i18n } from "@/i18n";

export const NAV_LINKS = [
  { id: "home", label: i18n.navigation.home },
  { id: "about", label: i18n.navigation.about },
  { id: "skills", label: i18n.navigation.skills },
  { id: "certifications", label: i18n.navigation.certifications },
  { id: "toolbox", label: i18n.navigation.toolbox },
  { id: "projects", label: i18n.navigation.projects },
  { id: "contact", label: i18n.navigation.contact },
] as const;

export type SectionId = (typeof NAV_LINKS)[number]["id"];
