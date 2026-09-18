import About from "#/features/about/components/About";
import { createFileRoute } from "@tanstack/react-router";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/react";
import { SITE_URL } from "#/lib/constants";

export const Route = createFileRoute("/om-oss")({
  loader: async () => {
    const pageResult = await client.queries.pages({ relativePath: "about.md" });
    return {
      page: pageResult,
    };
  },
  head: () => ({
    meta: [
      {
        title: "Om oss | Brott & Blega",
      },
      {
        name: "description",
        content:
          "Les om Brott & Blega, våre faglige bakgrunner og vår visjon om helhetlig helse for kropp og sinn.",
      },
      {
        property: "og:title",
        content: "Om oss | Brott & Blega",
      },
      {
        property: "og:description",
        content:
          "Vi er to kvinner med ulik faglig bakgrunn og felles visjon om helhetlig helse, trygghet og bevisst livskvalitet.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/om-oss` }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const initialData = Route.useLoaderData();

  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return <About pageData={pageData} />;
}