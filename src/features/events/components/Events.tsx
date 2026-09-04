import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import PageWrapper from "#/components/PageWrapper";
import { Button } from "#/components/ui/button";
import { useMemo, useState } from "react";
import { tinaField } from "tinacms/tina-field";
import { isPastEvent } from "../utils";
import type {
  EventCategoriesConnectionQuery,
  Events as EventType,
  EventsConnectionQuery,
  PagesQuery,
  PagesStandard,
} from "../../../../tina/__generated__/types";
import EventItem from "./EventItem";
import { useMediaQuery } from "usehooks-ts";

const Events = ({
  eventsData,
  pageData,
  categoriesData,
}: {
  eventsData: EventsConnectionQuery;
  pageData: PagesQuery;
  categoriesData: EventCategoriesConnectionQuery;
}) => {
  const page = pageData.pages as PagesStandard;
  const [filter, setFilter] = useState<string>("alle");
  const isSmallScreen = useMediaQuery("(max-width: 640px)"); // Adjust the breakpoint as needed

  // Extract events from connection
  const events = (eventsData.eventsConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null);

  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => !isPastEvent(event))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
    [events],
  );

  const categories = useMemo(
    () =>
      (categoriesData.eventCategoriesConnection.edges || [])
        .map((edge) => edge?.node)
        .filter((node): node is NonNullable<typeof node> => node !== null),
    [categoriesData],
  );

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/æ/g, "ae")
      .replace(/ø/g, "o")
      .replace(/å/g, "a")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const getCategoryKey = (event: Record<string, unknown>) => {
    const raw = event.category;

    if (raw && typeof raw === "object") {
      const fromValue = (raw as Record<string, unknown>).value;
      if (typeof fromValue === "string" && fromValue.trim()) {
        return normalize(fromValue);
      }

      const fromFilename = (raw as Record<string, unknown>)._sys;
      if (fromFilename && typeof fromFilename === "object") {
        const filename = (fromFilename as Record<string, unknown>).filename;
        if (typeof filename === "string" && filename.trim()) {
          return normalize(filename);
        }
      }
    }

    if (typeof raw === "string") {
      const trimmed = raw.trim();
      if (!trimmed) return "";
      const withoutPath = trimmed.split("/").pop() ?? trimmed;
      return normalize(withoutPath.replace(/\.json$/i, ""));
    }

    return "";
  };

  const categoryLabelByValue = useMemo(
    () =>
      new Map(
        categories.map((category) => [
          normalize(category.value),
          category.label,
        ]),
      ),
    [categories],
  );

  const visibleEvents =
    filter === "alle"
      ? upcomingEvents
      : upcomingEvents.filter(
          (event) =>
            getCategoryKey(event as unknown as Record<string, unknown>) ===
            normalize(filter),
        );

  if (upcomingEvents.length === 0) {
    return (
      <PageWrapper kicker={"Arrangementer"} page={page}>
        <p className="italic">Ingen kommende arrangementer.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper kicker={"Arrangementer"} page={page}>
      {/* Filter */}
      <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-wrap gap-2">
        <Button
          onClick={() => setFilter("alle")}
          variant={filter === "alle" ? "default" : "outline"}
          size={isSmallScreen ? "xs" : "sm"}
        >
          Alle
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setFilter(category.value)}
            variant={filter === category.value ? "default" : "outline"}
            size={isSmallScreen ? "xs" : "sm"}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Events list */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-8">
        {visibleEvents.length === 0 && (
          <p className="italic">Ingen kommende arrangementer i denne kategorien.</p>
        )}
        {visibleEvents.map((event) => (
          <EventItem
            key={event.id}
            event={event as EventType}
            categoryLabel={categoryLabelByValue.get(
              getCategoryKey(event as unknown as Record<string, unknown>),
            )}
          />
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
