import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/react";
import Events from "#/features/events/components/Events";
import { generateEventSchema } from "#/lib/structured-data";
import { SITE_URL } from "#/lib/constants";

export const Route = createFileRoute("/arrangementer")({
  loader: async () => {
    const [eventsResult, pageResult, categoriesResult] = await Promise.all([
      client.queries.eventsConnection({
        sort: "date",
      }),
      client.queries.pages({ relativePath: "events.md" }),
      client.queries.eventCategoriesConnection({
        sort: "value",
      }),
    ]);
    return {
      events: eventsResult,
      page: pageResult,
      categories: categoriesResult,
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: "Arrangementer | Brott & Blega",
      },
      {
        name: "description",
        content:
          "Se våre kommende arrangementer, dialoggrupper, seminarer og kurs i Fevik. Finn et møtepunkt for kropp, refleksjon og fellesskap.",
      },
      {
        property: "og:title",
        content: "Arrangementer | Brott & Blega",
      },
      {
        property: "og:description",
        content:
          "Få oversikt over våre arrangementer innen helse, refleksjon, samtale og livskvalitet. ",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/arrangementer` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          (loaderData?.events.data.eventsConnection.edges || [])
            .map((edge) => edge?.node)
            .filter(Boolean)
            .map((event) =>
              generateEventSchema({
                name: event?.title || "",
                description: event?.description || "",
                startDate: event?.date || "",
                location: event?.location || "",
                price: event?.price || "",
                url: `${SITE_URL}/arrangementer`,
              }),
            ),
        ),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  const { data: eventsData } = useTina({
    query: initialData.events.query,
    variables: initialData.events.variables,
    data: initialData.events.data,
  });

  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  const { data: categoriesData } = useTina({
    query: initialData.categories.query,
    variables: initialData.categories.variables,
    data: initialData.categories.data,
  });

  return (
    <Events
      eventsData={eventsData}
      pageData={pageData}
      categoriesData={categoriesData}
    />
  );
}
