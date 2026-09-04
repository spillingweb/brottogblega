export const formatArticleDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  return date.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};
