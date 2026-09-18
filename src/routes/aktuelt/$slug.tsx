import { createFileRoute } from "@tanstack/react-router";
import NewsRouteView from "./-news-view";
import { generateNewsArticleSchema } from "#/lib/structured-data";
import client from "../../../tina/__generated__/client";
import { SITE_URL } from "#/lib/constants";

export const Route = createFileRoute("/aktuelt/$slug")({
  loader: async ({ params }) => {
    const articlesResult = await client.queries.articlesConnection({
      sort: "date",
      last: -1,
    });

    const article =
      articlesResult.data.articlesConnection.edges
        ?.map((edge) => edge?.node)
        .filter(Boolean)
        .find((node) => node?._sys.filename === params.slug) ?? null;

    return { article };
  },
  head: ({ loaderData, params }) => {
    const article = loaderData?.article;

    return {
      meta: [
        {
          title: article
            ? `${article.title} | Brott & Blega`
            : `Nyhet ${params.slug} | Brott & Blega`,
        },
        {
          name: "description",
          content:
            article?.excerpt || "Les mer om dette innlegget fra Brott & Blega.",
        },
        {
          property: "og:title",
          content: article?.title || "Nyhet | Brott & Blega",
        },
        {
          property: "og:description",
          content:
            article?.excerpt || "Les mer om dette innlegget fra Brott & Blega.",
        },
        { property: "og:type", content: "article" },
      ],
      links: [
        {
          rel: "canonical",
          href: article
            ? `${SITE_URL}/aktuelt/${article._sys.filename}`
            : `${SITE_URL}/aktuelt/${params.slug}`,
        },
      ],
      scripts: article
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(
                generateNewsArticleSchema({
                  title: article.title,
                  description: article.excerpt,
                  url: `${SITE_URL}/aktuelt/${article._sys.filename}`,
                  datePublished: article.date,
                  author: article.author,
                  image: article.coverImage,
                }),
              ),
            },
          ]
        : [],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  return <NewsRouteView activeSlug={slug} />;
}
