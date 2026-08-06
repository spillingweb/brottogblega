import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useTina } from "tinacms/react";
import News from "#/features/news/components/News";

const parentRoute = getRouteApi("/aktuelt");

type NewsRouteViewProps = {
  activeSlug?: string;
};

export default function NewsRouteView({ activeSlug }: NewsRouteViewProps) {
  const initialData = parentRoute.useLoaderData();
  const navigate = useNavigate();

  const { data: articlesData } = useTina({
    query: initialData.articles.query,
    variables: initialData.articles.variables,
    data: initialData.articles.data,
  });

  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return (
    <News
      pageData={pageData}
      articlesData={articlesData}
      activeSlug={activeSlug}
      onOpenArticle={(slug) => {
        navigate({
          to: "/aktuelt/$slug",
          params: { slug },
          resetScroll: false,
        });
      }}
      onCloseArticle={() => {
        navigate({
          to: "/aktuelt",
          replace: true,
          resetScroll: false,
        });
      }}
    />
  );
}
