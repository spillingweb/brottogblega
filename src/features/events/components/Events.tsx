import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import PageWrapper from "#/components/PageWrapper";
import { Button } from "#/components/ui/button";
import { useMemo, useState } from "react";
import { tinaField } from "tinacms/tina-field";
import { isPastEvent } from "../utils";
import type {
  Events as EventType,
  EventsConnectionQuery,
  PagesQuery,
  PagesStandard,
} from "../../../../tina/__generated__/types";
import EventItem from "./EventItem";

type EventFilter = "kommende" | "tidligere" | "alle";

const Events = ({
  eventsData,
  pageData,
}: {
  eventsData: EventsConnectionQuery;
  pageData: PagesQuery;
}) => {
  const page = pageData.pages as PagesStandard;
  const [filter, setFilter] = useState<EventFilter>("kommende");

  // Extract events from connection
  const events = (eventsData.eventsConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null);

  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => !isPastEvent(event))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [events],
  );

  const pastEvents = useMemo(
    () =>
      events
        .filter((event) => isPastEvent(event))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [events],
  );

  const visibleEvents =
    filter === "kommende"
      ? upcomingEvents
      : filter === "tidligere"
        ? pastEvents
        : [...upcomingEvents, ...pastEvents];

  if (events.length === 0) {
    return (
      <PageWrapper kicker={"Arrangementer"} page={page}>
        <p>Ingen arrangementer funnet.</p>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper kicker={"Arrangementer"} page={page}>
      {/* Filter */}
      <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-wrap gap-2">
        <Button
          onClick={() => setFilter("kommende")}
          variant={filter === "kommende" ? "default" : "outline"}
          size="sm"
        >
          Kommende
        </Button>
        <Button
          onClick={() => setFilter("tidligere")}
          variant={filter === "tidligere" ? "default" : "outline"}
          size="sm"
        >
          Tidligere
        </Button>
        <Button
          onClick={() => setFilter("alle")}
          variant={filter === "alle" ? "default" : "outline"}
          size="sm"
        >
          Alle
        </Button>
      </div>

      {/* Events list */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-8">
        {visibleEvents.length === 0 && (
          <p>
            {filter === "tidligere"
              ? "Ingen tidligere arrangementer."
              : "Ingen kommende arrangementer."}
          </p>
        )}
        {visibleEvents.map((event) => (
          <EventItem key={event.id} event={event as EventType} />
        ))}
      </div>
      <CallToAction
        btnText="Ta kontakt"
        dialog={<ContactDialog />}
        title={page.ctaTitle || "Vil du høre om nye arrangementer først?"}
        description={
          page.ctaDescription ||
          "Send oss en e-post, så legger vi deg til på vår liste. Vi sender kun ut meldinger om kommende arrangementer — ikke mer."
        }
        dataTitle={tinaField(page, "ctaTitle")}
        dataDescription={tinaField(page, "ctaDescription")}
      />
    </PageWrapper>
  );
};

export default Events;
