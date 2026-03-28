export interface SkillCategory {
  title: string;
  items: Array<{
    label: string;
    level: number;
  }>;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Web",
    items: [
      { label: "React", level: 94 },
      { label: "TypeScript", level: 90 },
      { label: "JavaScript", level: 96 },
    ],
  },
  {
    title: "Mobile",
    items: [
      { label: "Android (Java, Kotlin)", level: 91 },
      { label: "iOS", level: 82 },
      { label: "React Native", level: 95 },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "Ruby on Rails", level: 74 },
      { label: "Scala", level: 68 },
    ],
  },
  {
    title: "DevOps & Testing",
    items: [
      { label: "Jenkins", level: 80 },
      { label: "CI/CD Pipelines", level: 84 },
      { label: "Cypress", level: 78 },
    ],
  },
  {
    title: "AI & Developer Tools",
    items: [
      { label: "GitHub Copilot", level: 92 },
      { label: "ChatGPT", level: 95 },
      { label: "Claude AI", level: 88 },
      { label: "Cursor", level: 86 },
    ],
  },
  {
    title: "Concepts",
    items: [
      { label: "Microservices", level: 84 },
      { label: "REST APIs", level: 93 },
    ],
  },
];
