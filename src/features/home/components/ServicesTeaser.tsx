import { useMemo } from "react";
import { Button } from "#/components/ui/button";
import Heading from "#/components/ui/Heading";
import type {
  PagesHomepage,
  Services,
  ServicesConnectionQuery,
} from "../../../../tina/__generated__/types";
import { Link } from "@tanstack/react-router";
import ServiceCard from "./ServiceCard";
import Kicker from "#/components/ui/Kicker";
import { tinaField } from "tinacms/tina-field";

const ServicesTeaser = ({
  page,
  servicesData,
}: {
  page: PagesHomepage;
  servicesData: ServicesConnectionQuery;
}) => {
  const services = useMemo(() => {
    return (servicesData.servicesConnection.edges || [])
      .map((edge) => edge?.node)
      .filter((node): node is NonNullable<typeof node> => node !== null)
      .sort((a, b) => Number(a.order ?? 9999) - Number(b.order ?? 9999))
      .slice(0, 4);
  }, [servicesData]);

  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14 anim-scroll">
          <div>
            <Kicker className="text-primary mb-4">Tjenester</Kicker>
            <Heading
              level={2}
              className="md:text-4xl"
              data-tina-field={tinaField(page, "servicesHeading")}
            >
              {page.servicesHeading}
            </Heading>
          </div>
          <Button variant="link" className="p-0 h-fit" asChild>
            <Link to="/tjenester">
              Se alle tjenester <span> →</span>
            </Link>
          </Button>
        </div>

        {/* Services list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger-grid">
          {services.length > 0 ? (
            services.map((s) => (
              <ServiceCard key={s.id} service={s as Services} />
            ))
          ) : (
            <p className="col-span-full text-sm text-muted-foreground">
              Ingen tjenester er lagt inn ennå.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesTeaser;
