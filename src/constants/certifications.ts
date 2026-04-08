export interface Certification {
  id: string;
  title: string;
  provider: string;
  image: string;
  link: string;
  issueDate?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-1",
    title: "AWS Certification (Credly Badge)",
    provider: "Credly",
    image: "https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    link: "https://www.credly.com/badges/87caaeda-356c-4a8f-91cf-44c34c553c8e/linked_in",
    issueDate: "December 11, 2023",
  },
  {
    id: "microsoft-1",
    title: "Microsoft Certification",
    provider: "Microsoft Learn",
    image: "https://learn.microsoft.com/favicon.ico",
    link: "https://learn.microsoft.com/en-us/users/swapnilnandapure-1522/credentials/c65705365f3f5f2b",
    issueDate: "January 15, 2025",
  },
  {
    id: "udemy-1",
    title: "TypeScript Mastery",
    provider: "Udemy",
    image: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    link: "https://udemy-certificate.s3.amazonaws.com/image/UC-ed155e4e-8df6-4185-b454-0eb7d7173f27.jpg",
    issueDate: "January 24, 2025",
  },
  {
    id: "udemy-2",
    title: "Complete React Developer Course",
    provider: "Udemy",
    image: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    link: "https://www.udemy.com/certificate/UC-YO2B3ANG/",
    issueDate: "December 07, 2018",
  },
];

// Display top 4-6 certifications in the UI
export const FEATURED_CERTIFICATIONS = CERTIFICATIONS.slice(0, 6);
