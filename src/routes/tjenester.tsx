import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/react";
import Services from "#/features/services/components/Services";
import { SITE_URL } from "#/lib/constants";
import type { PagesStandard } from "../../tina/__generated__/types";

export const Route = createFileRoute("/tjenester")({
  loader: async () => {
    const [servicesResult, pageResult] = await Promise.all([
      client.queries.servicesConnection(),
      client.queries.pages({ relativePath: "services.md" }),
    ]);

    return {
      services: servicesResult,
      page: pageResult,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const page = loaderData.page.data.pages as PagesStandard;
    const services = (loaderData?.services.data.servicesConnection.edges || [])
      .map((edge) => edge?.node)
      .filter(Boolean);

    return {
      meta: [
        { title: page.metaTitle },
        { name: "description", content: page.metaDescription },
        { property: "og:title", content: page.metaTitle },
        { property: "og:description", content: page.metaDescription },
        { property: "og:url", content: `${SITE_URL}/tjenester` },
        { property: "og:type", content: "website" },
        { property: "og:image", content: services[0]?.image || "" },
        { property: "og:site_name", content: "Brott & Blega" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/tjenester` }],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  const { data: servicesData } = useTina({
    query: initialData.services.query,
    variables: initialData.services.variables,
    data: initialData.services.data,
  });

  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return <Services servicesData={servicesData} pageData={pageData} />;
}
