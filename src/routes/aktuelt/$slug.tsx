import { createFileRoute } from "@tanstack/react-router";
import NewsRouteView from "./-news-view";

export const Route = createFileRoute("/aktuelt/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  return <NewsRouteView activeSlug={slug} />;
}
