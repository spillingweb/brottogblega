import { createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/react";
import Events from "#/features/events/Events";

export const Route = createFileRoute("/arrangementer")({
  loader: async () => {
    const pageResult = await client.queries.pages({
      relativePath: "events.md",
    });
    return {
      page: pageResult,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  // Enable live preview when editing in TinaCMS
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });
  return <Events pageData={pageData} />;
}
