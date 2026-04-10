# SwapnilVerse

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Coverage](https://img.shields.io/badge/Coverage-91%25-22c55e)](/Users/swapnil.nandapure/Documents/GitHub/swapnilverse/coverage/lcov-report/index.html)
[![Storybook](https://img.shields.io/badge/Storybook-10-ff4785?logo=storybook&logoColor=white)](https://storybook.js.org/)

Personal portfolio application built with Next.js, React, and TypeScript to showcase experience, projects, skills, and contact workflows in a polished, interactive interface. The project is structured for maintainability with co-located tests and Storybook stories, making it easier to evolve UI and behavior with confidence.

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Visit-Live%20Demo-22C55E?style=for-the-badge&logo=vercel&logoColor=white)](https://swapdroid.vercel.app/)

![Hero](public/images/hero.webp)

## Project Overview

This repository contains a production-ready portfolio built with a modern frontend stack and a developer-friendly workflow.

Core technologies:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Jest + Testing Library
- Storybook
- EmailJS

## Features

- Responsive portfolio experience with animated sections
- Project showcase with detailed modal views
- Contact form integration with EmailJS
- Co-located component tests for faster maintenance
- Storybook stories for isolated UI development
- Root-level coverage reporting for verification and review

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

### Build the project

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

## Testing

Tests are co-located with the components and sections they cover, which keeps behavior close to implementation and makes refactoring easier.

Example:

```text
src/components/Footer/
├── Footer.tsx
├── Footer.test.tsx
├── Footer.stories.tsx
└── index.ts
```

### Run tests

```bash
npm run test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Generate a coverage report

```bash
npm run test:coverage
```

Coverage output is generated in the root-level `coverage/` folder.

## Storybook

Storybook is used for isolated UI development, visual review, and validating component states outside the full application shell.

### Run Storybook locally

```bash
npm run storybook
```

### Build the static Storybook bundle

```bash
npm run build-storybook
```

Stories are co-located with their components and sections so usage examples stay close to the implementation.

## Folder Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── layout.test.tsx
│   ├── page.tsx
│   └── page.test.tsx
├── components/
│   ├── Footer/
│   ├── Navbar/
│   ├── ScrollToTopButton/
│   ├── Section/
│   └── SocialLinks/
├── constants/
├── hooks/
├── sections/
│   ├── About/
│   ├── Contact/
│   ├── Hero/
│   ├── Projects/
│   ├── Skills/
│   └── Toolbox/
├── styles/
└── utils/               # reserved for shared helpers when introduced
```

### Co-location Pattern

Each UI module follows a consistent folder-based structure:

```text
src/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
└── index.ts
```

Benefits of this structure:

- Easier discovery of related files
- Safer refactors
- Better onboarding for new contributors
- Clear separation between implementation, tests, and stories

## Development Guidelines

- Keep components reusable, focused, and modular
- Prefer readable behavior-driven tests over implementation-heavy assertions
- Co-locate tests and stories with the component they describe
- Avoid duplicate files and stale generated artifacts in source folders
- Maintain consistent naming such as `ComponentName.tsx`, `ComponentName.test.tsx`, and `ComponentName.stories.tsx`
- Keep shared configuration in dedicated files instead of scattering logic across components
- Favor accessible markup and semantic HTML where possible

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run test
npm run test:watch
npm run test:coverage
npm run storybook
npm run build-storybook
```

## Deployment

Production URL: [https://swapdroid.vercel.app/](https://swapdroid.vercel.app/)

The app is designed to be deployed as a standard Next.js application. Storybook can be published separately as a static build if needed.

## Notes For Contributors

- Static constants under `src/constants/` do not need tests unless logic is introduced
- Coverage reports should remain outside `src/`
- Storybook stories should cover default states, relevant variants, and notable edge cases where applicable

## 🔗 Contact

If you would like to discuss the project, collaboration, or engineering opportunities:

[![GitHub Profile](https://img.shields.io/badge/GitHub-@swapdroid-181717?style=for-the-badge&logo=github)](https://github.com/swapdroid)
[![LinkedIn Profile](https://img.shields.io/badge/LinkedIn-Connect%20with%20me-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/swapnil-nandapure-135129103/)

<a href="https://ko-fi.com/swapdroid"><img src="https://storage.ko-fi.com/cdn/kofi2.png" width="200" /></a>
