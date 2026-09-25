# Brott & Blega - Official Website

**Brott & Blega** ([www.brottogblega.no](https://www.brottogblega.no/)) is a holistic health, physiotherapy, and counseling practice based in Fevik, Norway. This repository contains the source code for a modern, performant, and fully responsive web application built with the latest React ecosystem and a headless CMS.

## 🚀 Tech Stack

This project is built using modern web development tools to ensure performance, type safety, and an excellent developer and content-editor experience.

- **Framework:** [TanStack Start](https://tanstack.com/start/latest) (Full-stack framework)
- **Core Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Content Management:** [TinaCMS](https://tina.io/) (Headless CMS with Live Editing)
- **Email & Forms:** [Brevo](https://www.brevo.com/) (GDPR-compliant contact forms & newsletter)
- **Hosting & Optimization:** [Vercel](https://vercel.com/)

## ✨ Features

- **Blazing Fast Performance:** Powered by TanStack Start and React 19 server/client capabilities.
- **Heavily SEO Optimized:** Built with semantic markup, dynamic Open Graph meta tags, structured data, and clean routing to rank effectively on search engines.
- **Vercel Image Optimization:** Images are automatically optimized on the fly through Vercel's build and edge infrastructure by prefixing image paths with `/_vercel/image` for minimal asset size and rapid load times.
- **Live Visual Editing:** TinaCMS live contextual editing allows non-technical site owners to edit articles, news, and site copy visually with real-time on-page previews.
- **Accessible & Responsive:** Styled with Tailwind CSS and fully accessible UI components from shadcn/ui.
- **Privacy First (GDPR Compliant):** All newsletter sign-ups and contact form submissions are routed securely through Brevo, ensuring EU-based data protection compliance.

## 📦 Getting Started

### Prerequisites

Before setting up the project, make sure you have:
1. **Node.js** (v18 or higher) and your preferred package manager (`npm`, `yarn`, `pnpm`, or `bun`).
2. An active **[TinaCloud](https://tina.io/) project** set up to manage media and authentication for live editing.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/spillingweb/brottogblega.git
   cd brottogblega
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or yarn / pnpm / bun install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your credentials from your TinaCloud dashboard and Brevo account:
   ```env
   # TinaCloud Configuration
   TINA_PUBLIC_CLIENT_ID=your_tina_client_id
   TINA_TOKEN=your_tina_token
   GITHUB_BRANCH=main

   # Brevo (Forms & Newsletter)
  BREVO_API_KEY_HILDE=your_brevo_hilde_key
  BREVO_API_KEY_TINA=your_brevo_tina_key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

## 📝 Content Management & Live Editing (TinaCMS)

This project incorporates **TinaCMS** for live, visual content editing. 

> **Important:** A TinaCloud project setup is required prior to editing or deploying. Make sure your repository is connected to your TinaCloud account and your `.env` credentials are properly set.

To edit content:
1. Start the local development server (`npm run dev`).
2. Navigate to `http://localhost:3000/admin` to log in and open the visual editor.
3. Click on any editable region on the page to adjust text, images, or layout with real-time live previewing.
4. Saving changes directly pushes updates to your connected GitHub repository and TinaCloud.

## ✉️ Integrations

**Brevo** handles both newsletter subscriptions and contact form submissions. All data is processed within the EU to guarantee strict adherence to GDPR regulations. Ensure your Brevo API key is properly scoped in your production environment.

## 📜 License

© Brott & Blega. All rights reserved.