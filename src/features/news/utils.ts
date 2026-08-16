// Utility functions and constants for news feature
export const categoryColors: Record<string, string> = {
  Kronikk: "bg-chart-1/10 text-chart-1",
  Fagartikkel: "bg-chart-2/10 text-chart-2",
  Nyhet: "bg-chart-3/10 text-chart-3",
  Refleksjon: "bg-chart-4/10 text-chart-4",
};

// Function to calculate reading time based on word count
const extractText = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => extractText(item)).join(" ");
  }

  if (value && typeof value === "object") {
    const node = value as { text?: unknown; children?: unknown };
    const text = typeof node.text === "string" ? node.text : "";
    const children = Array.isArray(node.children) ? extractText(node.children) : "";
    return [text, children].filter(Boolean).join(" ");
  }

  return "";
};

export const calculateReadingTime = (content: unknown): number => {
  const wordsPerMinute = 200; // Average reading speed
  const text = extractText(content).trim();

  if (!text) {
    return 0;
  }

  const words = text.split(/\s+/).length; // Count words
  return Math.ceil(words / wordsPerMinute); // Calculate and round up
};