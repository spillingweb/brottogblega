import { createFileRoute } from "@tanstack/react-router";
import NewsRouteView from "./-news-view";

export const Route = createFileRoute("/aktuelt/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewsRouteView />;
}
