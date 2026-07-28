import Home from "#/features/home/components/Home";
import { createFileRoute } from "@tanstack/react-router";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [pageResult] = await Promise.all([
      client.queries.pages({ relativePath: "home.md" }),
      //   client.queries.tjenesterConnection({ sort: "orden" }),
      //   client.queries.bloggConnection({ sort: "date", last: -1 }),
    ]);
    return {
      page: pageResult,
    //   tjenester: tjenesterResult,
    //   blogg: bloggResult,
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
  return <Home pageData={pageData}  />;
}
