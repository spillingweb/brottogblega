import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

const SITE_NAME = "Brott & Blega";

export function generateWebsiteSchema(baseUrl: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: baseUrl,
    description: description,
    inLanguage: "nb-NO",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateLocalBusinessSchema(
  baseUrl: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: SITE_NAME,
    url: baseUrl,
    description: description,
    telephone: "+47 411 69 737",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Feviktoppen 19",
      addressLocality: "Fevik",
      postalCode: "4885",
      addressRegion: "Agder",
      addressCountry: "NO",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Fevik",
      },
      {
        "@type": "City",
        name: "Grimstad",
      },
      {
        "@type": "City",
        name: "Arendal",
      },
    ],
    sameAs: [
      "https://www.instagram.com/brottogblega",
      "https://www.facebook.com/brottogblega",
    ],
    image: `${baseUrl}/sharedImage.avif`,
  };
}

export function generateNewsArticleSchema({
  title,
  description,
  url,
  datePublished,
  author,
  image,
}: {
  title: string;
  description?: string | null;
  url: string;
  datePublished?: string | null;
  author?: string | null;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url,
    datePublished: datePublished || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: author || "Brott & Blega",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: "https://brottogblega.no",
      logo: "https://brottogblega.no/brottogblega_logo.svg",
    },
    image: image || "https://brottogblega.no/sharedImage.avif",
  };
}

export function generateServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description?: string | null;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: description,
    url,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: "https://brottogblega.no",
    },
  };
}

export function generateEventSchema({
  name,
  description,
  startDate,
  location,
  price,
  url,
}: {
  name: string;
  description: TinaMarkdownContent;
  startDate: string;
  location: string;
  price: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description: description,
    startDate: startDate || new Date().toISOString(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: location || "Brott & Blega, Fevik",
    },
    offers: {
      "@type": "Offer",
      price: price
        ? price.replace(/[^\d,\.-]/g, "").replace(",", ".") || "0"
        : "0",
      priceCurrency: "NOK",
      url,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: "https://brottogblega.no",
    },
    url,
  };
}
