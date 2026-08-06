// Function to determine the color of the spots left indicator based on the number of spots left
export const spotsColor = (spots: string) => {
  switch (spots) {
    case "Åpent":
      return "text-chart-2 bg-chart-2/10";
    case "Noen plasser igjen":
      return "text-chart-5 bg-chart-5/10";
    case "Få plasser igjen":
      return "text-chart-1 bg-chart-1/10";
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
export const isPastEvent = (event: EventDateLike, referenceDate = new Date()) => {
  const startOfReferenceDate = new Date(referenceDate);
  startOfReferenceDate.setHours(0, 0, 0, 0);

  const eventEndDate = new Date(event.endDate || event.date);
  eventEndDate.setHours(0, 0, 0, 0);

  return eventEndDate.getTime() < startOfReferenceDate.getTime();
};
