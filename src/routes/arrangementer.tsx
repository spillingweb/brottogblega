import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/react";
import Events from "#/features/events/components/Events";

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
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  // Enable live preview for blog posts
  const { data: eventsData } = useTina({
    query: initialData.events.query,
    variables: initialData.events.variables,
    data: initialData.events.data,
  });

  // Enable live preview when editing in TinaCMS
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
