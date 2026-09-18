import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/react";
import Services from "#/features/services/components/Services";
import { SITE_URL } from "#/lib/constants";

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
  head: () => ({
    meta: [
      {
        title: "Tjenester | Brott & Blega",
      },
      {
        name: "description",
        content:
          "Se våre tjenester innen fysioterapi, samtaleterapi, dialoggrupper og helhetlig helse. Vi møter deg der du er.",
      },
      {
        property: "og:title",
        content: "Tjenester | Brott & Blega",
      },
      {
        property: "og:description",
        content:
          "Fysioterapi, samtaleterapi og tverrfaglige tilbud i Fevik og på nett. Vi ser kropp og sinn i sammenheng.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/tjenester` }],
  }),
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
