import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import PageWrapper from "#/components/PageWrapper";
import type {
  PagesQuery,
  PagesStandard,
} from "../../../../tina/__generated__/types";
import { events } from "../constants";
import EventItem from "./EventItem";

const Events = ({ pageData }: { pageData: PagesQuery }) => {
  const page = pageData.pages as PagesStandard;
  return (
    <PageWrapper kicker={"Arrangementer"} page={page}>
      {/* Events list */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-8">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
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
      />
    </PageWrapper>
  );
};

export default Events;
