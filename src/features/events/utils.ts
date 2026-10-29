// Function to determine the color of the spots left indicator based on the number of spots left
export const spotsColor = (spots: string) => {
  switch (spots) {
    case "Åpent":
      return "text-chart-2 bg-chart-2-bg";
    case "Få plasser igjen":
      return "text-chart-1 bg-chart-1-bg";
    case "Fullt":
      return "text-destructive bg-destructive/10";
    default:
      return "text-gray-500 bg-gray-100";
  }
};

export type EventDateLike = {
  date: string;
  endDate?: string | null;
};

// Treat multi-day events as active until their end date has passed.
export const isPastEvent = (
  event: EventDateLike,
  referenceDate = new Date(),
) => {
  // Compare date-only (UTC) to avoid local-timezone drift on ISO date strings.
  const toUTC = (d: Date) =>
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return toUTC(new Date(event.endDate || event.date)) < toUTC(referenceDate);
};

// Returns the parts needed to render an event date badge and range label.
// All formatting is UTC-pinned to prevent server/client hydration mismatches
// (ISO date-only strings like "2026-10-14" parse as UTC midnight).
export const formatEventDates = (date: string, endDate?: string | null) => {
  const start = new Date(date);
  const end = endDate ? new Date(endDate) : null;

  const locale = "nb-NO";
  const tz = { timeZone: "UTC" } as const;
  const formatFull = (d: Date) =>
    d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...tz,
    });

  const day = start.getUTCDate();
  const month = start.toLocaleString(locale, { month: "short", ...tz });
  const startFormatted = formatFull(start);
  const endFormatted = end ? formatFull(end) : null;

  const sameMonth =
    end !== null &&
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCFullYear() === end.getUTCFullYear();

  const formattedDate = endFormatted
    ? endFormatted === startFormatted
      ? `${startFormatted}`
      : sameMonth
        ? `${day} - ${endFormatted}`
        : `${startFormatted} - ${endFormatted}`
    : startFormatted;

  return { day, month, formattedDate };
};
