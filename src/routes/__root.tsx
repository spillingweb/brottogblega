import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import Header from "#/components/Header";
import Footer from "#/features/footer/components/Footer";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/react";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Brott & Blega",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.png",
      },
    ],
  }),
  loader: async () => {
      const pageResult = await client.queries.pages({ relativePath: "contact.md" });
      return {
        page: pageResult,
      };
    },
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
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer pageData={pageData} />
        <Scripts />
      </body>
    </html>
  );
}
