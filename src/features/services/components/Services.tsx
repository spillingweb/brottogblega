import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import PageWrapper from "#/components/PageWrapper";
import { Button } from "#/components/ui/button";
import type {
  PagesQuery,
  PagesStandard,
  Services as ServicesType,
  ServicesConnectionQuery,
} from "../../../../tina/__generated__/types";
import ServiceItem from "./ServiceItem";
import { tinaField } from "tinacms/tina-field";
import { useMediaQuery } from "usehooks-ts";

const Services = ({
  servicesData,
  pageData,
}: {
  servicesData: ServicesConnectionQuery;
  pageData: PagesQuery;
}) => {
  const page = pageData.pages as PagesStandard;
  const isSmallScreen = useMediaQuery("(max-width: 640px)"); // Adjust the breakpoint as needed

  const services = useMemo(() => {
    return (servicesData.servicesConnection.edges || [])
      .map((edge) => edge?.node)
      .filter((node): node is NonNullable<typeof node> => node !== null)
      .sort((a, b) => Number(a.order ?? 9999) - Number(b.order ?? 9999));
  }, [servicesData]);

  const serviceIds = useMemo(() => {
    return services.map((service) => {
      const fromFilename = (
        service as ServicesType & { _sys?: { filename?: string } }
      )?._sys?.filename;

      if (fromFilename) {
        return fromFilename.replace(/\.[^/.]+$/, "");
      }

      return (service.title || "tjeneste")
        .toLowerCase()
        .replace(/æ/g, "ae")
        .replace(/ø/g, "o")
        .replace(/å/g, "a")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    });
  }, [services]);

  return (
    <PageWrapper kicker={"Tjenester"} page={page}>
      <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-wrap gap-2">
        {services.map((service, i) => (
          <Button
            key={service.id}
            asChild
            variant={i === 0 ? "default" : "outline"}
            size={isSmallScreen ? "xs" : "sm"}
          >
            <Link
              to="."
              hash={serviceIds[i]}
              data-tina-field={tinaField(service, "title")}
            >
              {service.title}
            </Link>
          </Button>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-20 space-y-10">
        {services.map((s, i) => (
          <ServiceItem key={s.id} service={s as ServicesType} index={i} />
        ))}
      </div>
      <CallToAction
        btnText="Ta kontakt"
        dialog={<ContactDialog />}
        title={page.ctaTitle || "Alle tjenester er tilgjengelige i Fevik"}
        description={
          page.ctaDescription ||
          "Vi holder til sentralt i Fevik og kan i noen tilfeller tilby digitale konsultasjoner. Ta kontakt for mer informasjon om hva som passer best for de"
        }
        dataTitle={tinaField(page, "ctaTitle")}
        dataDescription={tinaField(page, "ctaDescription")}
      />
    </PageWrapper>
  );
};

export default Services;
