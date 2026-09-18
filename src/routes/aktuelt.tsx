import { Outlet, createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { SITE_URL } from "#/lib/constants";
import { generateNewsArticleSchema } from "#/lib/structured-data";

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
  head: ({ loaderData }) => ({
    meta: [
      { title: "Aktuelt | Brott & Blega" },
      {
        name: "description",
        content:
          "Les nyheter, artikler og refleksjoner fra Brott & Blega. Vi deler innsikt om helhetlig helse, samtaleterapi og livskvalitet.",
      },
      { property: "og:title", content: "Aktuelt | Brott & Blega" },
      {
        property: "og:description",
        content:
          "Nyheter, artikler og refleksjoner om kropp, sinn, samtaler og helhetlig helse.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/aktuelt` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          (loaderData?.articles.data.articlesConnection.edges || [])
            .map((edge) => edge?.node)
            .filter(Boolean)
            .map((article) =>
              generateNewsArticleSchema({
                title: article?.title || "",
                description: article?.excerpt || "",
                url: `${SITE_URL}/aktuelt/${article?._sys?.filename || ""}`,
                datePublished: article?.date || "",
                author: article?.author || "",
                image: article?.coverImage || "",
              }),
            ),
        ),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
