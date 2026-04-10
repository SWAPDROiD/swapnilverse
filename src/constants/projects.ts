export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectDetails {
  fullTitle: string;
  subtitle: string;
  roleTitle?: string;
  duration?: string;
  team?: string;
  badges: string[];
  highlight: string;
  overview: string;
  features: string[];
  role: string[];
  tech: string[];
  links: ProjectLink[];
  highlights?: string[];
  environment?: string[];
}

export interface Project {
  title: string;
  tech: string;
  url: string;
  image: string;
  details: ProjectDetails;
}

export const PROJECTS: Project[] = [
  {
    title: "hueprint",
    tech: "Developer Tools",
    url: "https://www.npmjs.com/package/hueprint",
    image: "/images/hueprint.webp",
    details: {
      fullTitle: "hueprint – Universal Styling & Logging Toolkit",
      subtitle: "ANSI, HTML, and UI Styling for Modern JavaScript Apps",
      roleTitle: "Creator & Maintainer",
      badges: ["Open Source", "Developer Tools", "Node.js", "CLI", "Styling"],
      highlight:
        "Built a lightweight developer toolkit enabling expressive logging and styling across terminal, web, and UI environments",
      overview:
        "hueprint is a universal styling and logging toolkit for Node.js that enables developers to create expressive output across terminals (ANSI), web (HTML), and UI frameworks. It combines chainable and functional APIs, gradient text support, reusable themes, and built-in logging helpers for modern development workflows.",
      features: [
        "ANSI styling for terminal output",
        "HTML rendering for web previews",
        "Style object generation for UI frameworks",
        "Gradient text support",
        "Chainable and functional API usage",
        "Reusable theming system",
        "Built-in developer-friendly logging utilities",
        "Lightweight and optimized for CLI tools and scripts",
      ],
      role: [
        "Designed and developed the full library architecture",
        "Implemented cross-platform styling engine (ANSI, HTML, UI)",
        "Built gradient and theming capabilities",
        "Created developer-friendly APIs for chaining and functional usage",
        "Published and maintained npm package",
      ],
      highlights: [
        "Created a multi-target styling system supporting terminal, web, and UI",
        "Designed a clean and intuitive developer API",
        "Delivered a lightweight yet powerful logging toolkit for Node.js ecosystem",
      ],
      tech: ["Node.js", "JavaScript", "TypeScript", "NPM", "CLI Development"],
      links: [
        {
          label: "View Package",
          href: "https://www.npmjs.com/package/hueprint",
        },
      ],
    },
  },
  {
    title: "Zendesk",
    tech: "Enterprise SaaS",
    url: "https://www.zendesk.com/in/pricing/employee-service-pricing/",
    image: "/images/zendesk.webp",
    details: {
      fullTitle: "Zendesk – Admin Center & Internal Platforms",
      subtitle: "Enterprise Customer Service & Admin Experience",
      roleTitle: "Senior Software Engineer",
      badges: [
        "Enterprise",
        "SaaS",
        "Admin Platform",
        "Customer Support",
        "AI",
      ],
      highlight:
        "Delivered scalable admin and support workflows, including AI-powered writing assistance for customer ticketing systems",
      overview:
        "Worked on multiple applications within Zendesk's Admin Center and internal platforms, focusing on feature visibility, subscription management, and intelligent support tooling. Contributed to enhancing customer experience through AI-assisted writing and improved team management workflows.",
      features: [
        "Admin Center feature visibility based on subscription plans",
        "Plan details, add-ons, and entitlement management",
        "AI Copilot assistance for ticket writing enhancement",
        "Team and group management workflows",
        "Internal tools for operational efficiency",
        "Dynamic feature enablement based on user plans",
      ],
      role: [
        "Developed Admin Center features for plan and feature visibility",
        "Implemented AI-powered Copilot assist in ticketing workflows",
        "Worked on team and group management modules",
        "Collaborated across frontend and backend teams",
        "Contributed to scalable enterprise-grade applications",
      ],
      highlights: [
        "Delivered AI-assisted writing capabilities for customer support",
        "Improved clarity of feature access across subscription plans",
        "Enhanced admin workflows for large-scale enterprise usage",
      ],
      tech: ["React", "TypeScript", "Ruby on Rails", "Scala", "REST APIs"],
      links: [
        {
          label: "Zendesk",
          href: "https://www.zendesk.com/in/pricing/employee-service-pricing/",
        },
      ],
    },
  },
  {
    title: "Slasher",
    tech: "Entertainment",
    url: "https://www.slasher.tv/",
    image: "/images/entertainment.webp",
    details: {
      fullTitle: "Slasher – Horror Social Network",
      subtitle: "Real-time Social Platform for Horror Community",
      roleTitle: "React Native Developer",
      badges: [
        "Social Network",
        "Real-time Chat",
        "Video Streaming",
        "Entertainment",
      ],
      highlight:
        "Helped scale real-time community features for a niche social platform with stronger engagement and faster communication flows",
      overview:
        "Slasher is a horror-first social network built for highly engaged real-time interaction. I worked on performance-sensitive communication features that improved responsiveness, supported richer live experiences, and made the platform easier to scale as user activity grew.",
      features: [
        "Social timeline to share horror content",
        "Real-time messaging and chat system",
        "Video calling and live streaming features",
        "Horror movie database with trailers and tracking",
        "Event calendar for horror conventions and meetups",
        "Discovery platform for indie horror creators",
        "News integration from top horror sources",
        "No algorithm-based feed (organic reach for posts)",
      ],
      role: [
        "Developed and enhanced real-time chat functionality",
        "Implemented video calling and streaming features",
        "Improved messaging performance and scalability for higher engagement sessions",
        "Integrated real-time communication modules",
        "Improved user interaction experience",
        "Collaborated with cross-functional teams for feature delivery",
      ],
      tech: [
        "React Native",
        "JavaScript",
        "TypeScript",
        "WebSockets",
        "Streaming APIs",
        "Push Notifications",
        "REST APIs",
      ],
      highlights: [
        "Improved responsiveness across chat and communication journeys",
        "Scaled real-time features for an active niche global community",
        "Delivered calling and streaming workflows with a performance-first focus",
      ],
      links: [
        {
          label: "View iOS App",
          href: "https://apps.apple.com/us/app/slasher-horror-social-network/id1458216326",
        },
        {
          label: "View Android App",
          href: "https://play.google.com/store/apps/details?id=com.sdei.slasher&hl=en",
        },
        { label: "Visit Website", href: "https://pages.slasher.tv/" },
      ],
    },
  },
  {
    title: "Splynt",
    tech: "Healthcare",
    url: "https://splynt.co/",
    image: "/images/healthcare.webp",
    details: {
      fullTitle: "Splynt Instant Telehealth App",
      subtitle: "Sr. React Native Developer",
      badges: ["Healthcare", "Mobile App", "Real-time Communication"],
      highlight:
        "Built communication-heavy healthcare workflows designed for speed, trust, and reliability",
      overview:
        "Splynt is a telehealth platform for athletes and providers where reliability directly affects the user experience. I helped deliver communication, booking, and consultation workflows that made the product easier to use while supporting real-time interactions and secure operational flows.",
      features: [
        "Real-time urgent call communication",
        "Appointment booking and scheduling",
        "Video consultation with providers",
        "Chat functionality",
        "Injury analysis with dynamic questionnaire",
        "Provider availability management",
        "Secure payment integration",
      ],
      role: [
        "Led React Native development",
        "Built appointment and communication features",
        "Implemented chat, video call, and document workflows",
        "Delivered demo and handled core modules",
      ],
      highlights: [
        "Led delivery of core booking, consultation, and communication journeys",
        "Improved usability for both athlete and provider workflows",
        "Balanced real-time UX requirements with secure mobile performance",
      ],
      tech: [
        "React Native",
        "Redux Thunk",
        "JavaScript",
        "TypeScript",
        "SignalR",
        "Firebase",
        "Google Maps",
        "Stripe",
        "OpenTok",
      ],
      links: [
        {
          label: "Android (Play Store)",
          href: "https://play.google.com/store/apps/details?id=com.splynt.telehealth",
        },
        {
          label: "iOS (App Store)",
          href: "https://apps.apple.com/us/app/splynt-instant-telehealth/id1560796074",
        },
        { label: "Website", href: "https://stagingwin.com:9221/" },
      ],
    },
  },
  {
    title: "IDFC First Bank (Trade FX)",
    tech: "Banking",
    url: "https://my.idfcfirst.bank.in/",
    image: "/images/banking.webp",
    details: {
      fullTitle: "Trade FX – Inward Remittance",
      subtitle: "Lead Software Engineer",
      duration: "12 months (UP)",
      team: "Team size: 12",
      badges: ["Banking", "Web", "Mobile"],
      highlight:
        "Delivered a banking workflow that simplified inward remittance handling across web and mobile",
      overview:
        "Trade FX streamlined inward remittance processing for business users, enabling them to convert foreign currency to INR, book deals at live rates, and complete the full workflow with better operational clarity across web and mobile experiences.",
      features: [
        "Multi-platform delivery across mobile and web",
        "Deal booking at live market rates",
        "Inward listing and disposal details",
        "Document upload and download",
        "Declarations and currency details",
        "Summary export of records",
      ],
      role: [
        "Designed and developed disposal workflows",
        "Implemented upload/download of documents and records",
        "Delivered demos and collaborated with stakeholders",
      ],
      highlights: [
        "Improved operational clarity for disposal and remittance workflows",
        "Delivered cross-platform banking flows used across mobile and web",
        "Supported scalable document handling and workflow completion journeys",
      ],
      tech: [
        "React",
        "React Native",
        "JavaScript",
        "ECMAScript",
        "Newgen",
        "Banking Integrations",
      ],
      links: [
        {
          label: "Android (Play Store)",
          href: "https://play.google.com/store/apps/details?id=com.idfcfirstbank.optimus&hl=en&gl=US&pli=1",
        },
        {
          label: "iOS (App Store)",
          href: "https://apps.apple.com/in/app/idfc-first-bank-mobilebanking/id1521443352",
        },
        { label: "Website", href: "https://my.idfcfirstbank.com/login" },
      ],
    },
  },
  {
    title: "The Collective",
    tech: "E-commerce",
    url: "https://www.thecollective.in/",
    image: "/images/shopping.webp",
    details: {
      fullTitle: "The Collective",
      subtitle: "Sr. React Native Developer",
      badges: ["E-Commerce", "Mobile", "Web"],
      highlight:
        "Improved product discovery and checkout journeys for a premium e-commerce experience",
      overview:
        "The Collective focused on elegant shopping experiences across mobile and web. My work centered on responsive product discovery, smoother payment flows, and cleaner conversion-oriented journeys that supported a more polished buying experience.",
      features: [
        "Product listing and discovery",
        "Responsive product cards",
        "Payment gateway integration",
        "Checkout flow optimization",
      ],
      role: [
        "Developed product listing interfaces",
        "Integrated payment gateway and checkout",
        "Implemented mobile-first UX improvements",
      ],
      highlights: [
        "Improved checkout readiness with smoother payment integration",
        "Enhanced browsing and product discovery across responsive surfaces",
        "Delivered mobile-first UX improvements aimed at better conversion flow",
      ],
      tech: ["React Native", "Next.js", "Node.js", "Stripe"],
      links: [
        {
          label: "Android (Play Store)",
          href: "https://play.google.com/store/apps/details?id=com.collectivechild",
        },
        { label: "Website", href: "https://www.thecollectivechild.com/" },
      ],
    },
  },
];
