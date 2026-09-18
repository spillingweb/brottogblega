import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { NotFoundPage } from "./NotFoundPage";
import { RootErrorPage } from "./RootErrorPage";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import Header from "#/features/header/components/Header";
import Footer from "#/features/footer/components/Footer";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/react";
import { ScrollArea } from "#/components/ui/scroll-area";
import {
  generateLocalBusinessSchema,
  generateWebsiteSchema,
} from "#/lib/structured-data";
import { SITE_URL } from "#/lib/constants";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          "Brott & Blega | Fysioterapi, samtaleterapi og helhetlig helse i Fevik",
      },
      {
        name: "description",
        content:
          "Brott & Blega tilbyr fysioterapi, filosofisk samtaleterapi og helhetlig helse i Fevik. Vi møter kropp og sinn i sammenheng.",
      },
      {
        name: "keywords",
        content:
          "Brott & Blega, fysioterapi Fevik, samtaleterapi, helhetlig helse, kvinnehelse, dialoggrupper, filosofisk samtale, Grimstad, Agder",
      },
      {
        property: "og:title",
        content: "Brott & Blega | Helhetlig helse for kropp og sinn",
      },
      {
        property: "og:description",
        content:
          "Fysioterapi, samtaleterapi og helhetlig helse i Fevik. Vi skaper rom for kropp, tanke og livskvalitet.",
      },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "nb_NO" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Brott & Blega" },
      {
        property: "og:image",
        content: `${SITE_URL}/sharedImage.avif`,
      },
      {
        property: "og:image:alt",
        content: "Brott & Blega — helhetlig helse for kropp og sinn",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Brott & Blega | Helhetlig helse for kropp og sinn",
      },
      {
        name: "twitter:description",
        content:
          "Fysioterapi, samtaleterapi og helhetlig helse i Fevik. Vi skaper rom for kropp, tanke og livskvalitet.",
      },
      {
        name: "twitter:image",
        content: `${SITE_URL}/sharedImage.avif`,
      },
      { name: "geo.region", content: "NO-42" },
      { name: "geo.placename", content: "Fevik, Agder" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "icon", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          generateWebsiteSchema(SITE_URL),
          generateLocalBusinessSchema(SITE_URL),
        ]),
      },
    ],
  }),
  loader: async () => {
    const pageResult = await client.queries.pages({
      relativePath: "contact.md",
    });
    return {
      page: pageResult,
    };
  },
  errorComponent: RootErrorPage,
  notFoundComponent: NotFoundPage,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const initialData = Route.useLoaderData();

  // Enable live preview for page content
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="h-dvh">
        <ScrollArea className="h-full">
          <Header />
          <main>{children}</main>
          <Footer pageData={pageData} />
        </ScrollArea>
        <Scripts />
      </body>
    </html>
  );
}
