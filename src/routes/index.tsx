import Home from "#/features/home/components/Home";
import { createFileRoute } from "@tanstack/react-router";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { SITE_URL } from "#/lib/constants";
import type { PagesHomepage } from "../../tina/__generated__/types";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [pageResult, servicesResult, articlesResult] = await Promise.all([
      client.queries.pages({ relativePath: "home.md" }),
      client.queries.servicesConnection(),
      client.queries.articlesConnection({ sort: "date", last: -1 }),
    ]);
    return {
      page: pageResult,
      services: servicesResult,
      articles: articlesResult,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const page = loaderData.page.data.pages as PagesHomepage;

    return {
      meta: [
        { title: page.metaTitle },
        { name: "description", content: page.metaDescription },
        { property: "og:title", content: page.metaTitle },
        { property: "og:description", content: page.metaDescription },
        { property: "og:url", content: `${SITE_URL}/` },
        { property: "og:type", content: "website" },
        { property: "og:image", content: page.heroImage || "" },
        { property: "og:site_name", content: "Brott & Blega" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/` }],
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

  const { data: servicesData } = useTina({
    query: initialData.services.query,
    variables: initialData.services.variables,
    data: initialData.services.data,
  });

  const { data: articlesData } = useTina({
    query: initialData.articles.query,
    variables: initialData.articles.variables,
    data: initialData.articles.data,
  });

  return (
    <Home
      pageData={pageData}
      servicesData={servicesData}
      articlesData={articlesData}
    />
  );
}
