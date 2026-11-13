import About from "#/features/about/components/About";
import { createFileRoute } from "@tanstack/react-router";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/react";
import { SITE_URL } from "#/lib/constants";
import type { PagesAbout } from "../../tina/__generated__/types";

export const Route = createFileRoute("/om-oss")({
  loader: async () => {
    const pageResult = await client.queries.pages({ relativePath: "about.md" });
    return {
      page: pageResult,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const page = loaderData.page.data.pages as PagesAbout;

    return {
      meta: [
        { title: page.metaTitle },
        { name: "description", content: page.metaDescription },
        { property: "og:title", content: page.metaTitle },
        { property: "og:url", content: `${SITE_URL}/om-oss` },
        { property: "og:type", content: "website" },
        { property: "og:image", content: page.sharedImage || "" },
        { property: "og:description", content: page.metaDescription },
        { property: "og:site_name", content: "Brott & Blega" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/om-oss` }],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return <About pageData={pageData} />;
}
