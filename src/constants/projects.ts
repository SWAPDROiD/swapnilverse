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
    title: "Slasher",
    tech: "Entertainment",
    url: "https://www.slasher.tv/",
    image: "/images/entertainment.png",
    details: {
      fullTitle: "Slasher – Horror Social Network",
      subtitle: "Real-time Social Platform for Horror Community",
      roleTitle: "React Native Developer",
      badges: ["Social Network", "Real-time Chat", "Video Streaming", "Entertainment"],
      highlight:
        "Built for a niche global horror community focused on real-time social interaction and multimedia sharing",
      overview:
        "Slasher is a unique social networking platform built specifically for horror enthusiasts. It provides a space where users can freely share horror content, connect with like-minded people, and explore horror media without restrictions.",
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
        "Worked on messaging performance and scalability",
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
    image: "/images/healthcare.png",
    details: {
      fullTitle: "Splynt Instant Telehealth App",
      subtitle: "Sr. React Native Developer",
      badges: ["Healthcare", "Mobile App", "Real-time Communication"],
      highlight: "Designed for high-performance athlete healthcare communication",
      overview:
        "A healthcare platform designed for athletes and providers enabling real-time communication, appointment scheduling, and injury analysis.",
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
    image: "/images/banking.png",
    details: {
      fullTitle: "Trade FX – Inward Remittance",
      subtitle: "Lead Software Engineer",
      duration: "12 months (UP)",
      team: "Team size: 12",
      badges: ["Banking", "Web", "Mobile"],
      highlight:
        "Inward remittance application for business users to convert foreign currency to INR",
      overview:
        "The application was developed for both mobile and web platforms, enabling business users to convert remittances in other currencies to Indian rupees, book deals at market rates, and submit them through an integrated workflow.",
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
    image: "/images/shopping.png",
    details: {
      fullTitle: "The Collective",
      subtitle: "Sr. React Native Developer",
      badges: ["E-commerce", "Mobile", "Web"],
      highlight: "Curated product listings with integrated payments",
      overview:
        "Worked on showcasing product lists and integrating payment gateways across mobile and web platforms to improve conversion and user experience.",
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
