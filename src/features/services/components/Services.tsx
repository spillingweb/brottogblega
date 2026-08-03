import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import PageWrapper from "#/components/PageWrapper";
import type {
  PagesQuery,
  PagesStandard,
} from "../../../../tina/__generated__/types";

const Services = ({ pageData }: { pageData: PagesQuery }) => {
  const page = pageData.pages as PagesStandard;
  return (
    <PageWrapper kicker={"Tjenester"} page={page}>
      <div className="max-w-6xl mx-auto px-6 pb-24">
        Her kommer det mer informasjon om våre tjenester....
      </div>
      <CallToAction
        btnText="Ta kontakt"
        dialog={<ContactDialog />}
        title={page.ctaTitle || "Alle tjenester er tilgjengelige i Fevik"}
        description={
          page.ctaDescription ||
          "Vi holder til sentralt i Fevik og kan i noen tilfeller tilby digitale konsultasjoner. Ta kontakt for mer informasjon om hva som passer best for de"
        }
      />
    </PageWrapper>
  );
};

export default Services;
