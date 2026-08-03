import { createFileRoute } from "@tanstack/react-router";
import { useTina } from "tinacms/react";
import { client } from '../../tina/__generated__/client';
import News from "#/features/news/components/News";

export const Route = createFileRoute("/aktuelt")({
  loader: async () => {
    const pageResult = await client.queries.pages({
      relativePath: "news.md",
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
  return <News pageData={pageData} />;
}
