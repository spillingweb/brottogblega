import { Outlet, createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";

export const Route = createFileRoute("/aktuelt")({
  loader: async () => {
    const [articlesResult, pageResult] = await Promise.all([
      client.queries.articlesConnection({
        sort: "date",
        last: -1,
      }),
      client.queries.pages({ relativePath: "news.md" }),
    ]);

    return {
      articles: articlesResult,
      page: pageResult,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
