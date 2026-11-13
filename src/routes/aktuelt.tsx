import { Outlet, createFileRoute } from "@tanstack/react-router";
import { client } from "../../tina/__generated__/client";
import { SITE_URL } from "#/lib/constants";
import { generateNewsArticleSchema } from "#/lib/structured-data";
import type { PagesStandard } from "../../tina/__generated__/types";

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
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const articles = (loaderData.articles.data.articlesConnection.edges || [])
      .map((edge) => edge?.node)
      .filter(Boolean);

    const page = loaderData.page.data.pages as PagesStandard;

    return {
      meta: [
        { title: page.metaTitle },
        { name: "description", content: page.metaDescription },
        { property: "og:title", content: page.metaTitle },
        { property: "og:description", content: page.metaDescription },
        { property: "og:url", content: `${SITE_URL}/aktuelt` },
        { property: "og:type", content: "website" },
        { property: "og:image", content: articles[0]?.coverImage || "" },
        { property: "og:site_name", content: "Brott & Blega" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/aktuelt` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            articles.map((article) => {
              if (!article) return null;
              return generateNewsArticleSchema({
                title: article.title,
                description: article.excerpt,
                url: `${SITE_URL}/aktuelt/${article._sys.filename}`,
                datePublished: article.date,
                author: article.author,
                image: article.coverImage || "",
              });
            }),
          ),
        },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
