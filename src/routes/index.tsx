import Home from "#/features/home/components/Home";
import { createFileRoute } from "@tanstack/react-router";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { SITE_URL } from "#/lib/constants";

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
  head: () => ({
    meta: [
      {
        title:
          "Brott & Blega | Fysioterapi, samtaleterapi og helhetlig helse i Fevik",
      },
      {
        name: "description",
        content:
          "Brott & Blega er et møtested for kropp og tanke i Fevik. Vi tilbyr fysioterapi, samtaleterapi og helhetlig helse i et trygt og varmt miljø.",
      },
      {
        property: "og:title",
        content: "Brott & Blega | Fysioterapi og samtaleterapi i Fevik",
      },
      {
        property: "og:description",
        content:
          "Utforsk våre tjenester innen fysioterapi, samtaleterapi og helhetlig helse. Vi ser kropp og sinn i sammenheng.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
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
