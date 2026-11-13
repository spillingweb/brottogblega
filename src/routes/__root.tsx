import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { NotFoundPage } from "../components/NotFoundPage";
import { RootErrorPage } from "../components/RootErrorPage";

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
import type { PagesHomepage } from "../../tina/__generated__/types";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: async () => {
    const [pageResult, contactResult] = await Promise.all([
      client.queries.pages({ relativePath: "home.md" }),
      client.queries.pages({ relativePath: "contact.md" }),
    ]);

    return {
      page: pageResult,
      contact: contactResult,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const page = loaderData.page.data.pages as PagesHomepage;

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
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
            generateWebsiteSchema(SITE_URL, page.metaDescription),
            generateLocalBusinessSchema(SITE_URL, page.metaDescription),
          ]),
        },
      ],
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
    query: initialData.contact.query,
    variables: initialData.contact.variables,
    data: initialData.contact.data,
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
