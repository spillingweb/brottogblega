import { createFileRoute } from '@tanstack/react-router'
import { client } from '../../tina/__generated__/client';
import { useTina } from 'tinacms/react';
import Services from '#/features/services/components/Services';

export const Route = createFileRoute('/tjenester')({
  loader: async () => {
    const [servicesResult, pageResult] = await Promise.all([
      client.queries.servicesConnection({
        sort: "order",
      }),
      client.queries.pages({ relativePath: "services.md" }),
    ]);

    return {
      services: servicesResult,
      page: pageResult,
    };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const initialData = Route.useLoaderData();

  const { data: servicesData } = useTina({
    query: initialData.services.query,
    variables: initialData.services.variables,
    data: initialData.services.data,
  });

  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });

  return <Services servicesData={servicesData} pageData={pageData} />
}
