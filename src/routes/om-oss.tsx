import About from '#/features/about/components/About'
import { createFileRoute } from '@tanstack/react-router'
import client from '../../tina/__generated__/client';
import { useTina } from 'tinacms/react';

export const Route = createFileRoute('/om-oss')({
   loader: async () => {
    const pageResult = await client.queries.pages({ relativePath: "about.md" });
    return {
      page: pageResult,
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const initialData = Route.useLoaderData();

  // Enable live preview when editing in TinaCMS
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return <About pageData={pageData} />
}
