import Home from "#/features/home/components/Home";
import { createFileRoute } from "@tanstack/react-router";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [pageResult, servicesResult, articlesResult] = await Promise.all([
      client.queries.pages({ relativePath: "home.md" }),
      client.queries.servicesConnection({ sort: "order" }),
      client.queries.articlesConnection({ sort: "date", last: -1 }),
    ]);
    return {
      page: pageResult,
      services: servicesResult,
      articles: articlesResult,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  // Enable live preview for page content
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
