import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env["TINA_PUBLIC_CLIENT_ID"] ?? null,
  token: process.env["TINA_TOKEN"] ?? null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // Search configuration for the Tina Cloud search service.
  // See the documentation for more details: https://tina.io/docs/reference/search/overview
  search: {
    tina: {
      indexerToken: "a6db23183aaa3c8c5429cd74387440c24f83b687",
      stopwordLanguages: ["nob", "eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      /* ── PAGES (hovedsider) ───────────────────────────────────────────── */
      {
        name: "pages",
        label: "Hovedsider",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            readonly: true,
          },
          router: ({ document }) => {
            const filename = document._sys.filename;
            if (filename === "home") return "/";
            if (filename === "about") return "/om-oss";
            if (filename === "services") return "/tjenester";
            if (filename === "events") return "/arrangementer";
            if (filename === "news") return "/aktuelt";
            return "/";
          },
        },
        templates: [
          {
            name: "homepage",
            label: "Forside",
            fields: [
              {
                type: "string",
                name: "pageName",
                label: "Sidetittel",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "kicker",
                label: "Kicker-tekst (liten tekst over tittel)",
              },
              {
                type: "string",
                name: "titleMain",
                label: "Overskrift topp",
                required: true,
              },
              {
                type: "string",
                name: "titleItalic",
                label: "Overskrift under i kursiv",
                required: false,
              },
              {
                type: "string",
                name: "subtitle",
                label: "Introtekst under tittel",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "heroImage",
                label: "Hovedbilde (hero)",
              },
              {
                type: "string",
                name: "intro1Title",
                label: "Intro 1: Verdi",
              },
              {
                type: "string",
                name: "intro1Text",
                label: "Intro 1: Tekst",
              },
              {
                type: "string",
                name: "intro2Title",
                label: "Intro 2: Verdi",
              },
              {
                type: "string",
                name: "intro2Text",
                label: "Intro 2: Tekst",
              },
              {
                type: "string",
                name: "intro3Title",
                label: "Intro 3: Verdi",
              },
              {
                type: "string",
                name: "intro3Text",
                label: "Intro 3: Tekst",
              },
              {
                type: "image",
                name: "profileImage",
                label: "Bilde (Om oss-seksjon)",
              },
              {
                type: "string",
                name: "aboutTitle",
                label: "Om oss: Tittel",
              },
              {
                type: "string",
                name: "aboutText1",
                label: "Om oss: Avsnitt 1",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "aboutText2",
                label: "Om oss: Avsnitt 2",
                ui: { component: "textarea" },
              },
              // {
              //   type: "object",
              //   name: "testimonials",
              //   label: "Referanser fra klienter",
              //   list: true,
              //   ui: {
              //     itemProps: (item) => {
              //       return { label: item?.name || "Ny referanse" };
              //     },
              //   },
              //   fields: [
              //     {
              //       type: "string",
              //       name: "quote",
              //       label: "Sitat/referanse",
              //       ui: { component: "textarea" },
              //       required: true,
              //     },
              //     {
              //       type: "string",
              //       name: "name",
              //       label: "Navn",
              //       required: true,
              //     },
              //     {
              //       type: "string",
              //       name: "role",
              //       label: "Rolle/beskrivelse (valgfritt)",
              //     },
              //   ],
              // },
              {
                type: "string",
                name: "servicesHeading",
                label: "Tjenester-seksjon: Overskrift",
              },
              {
                type: "string",
                name: "newsHeading",
                label: "Aktuelt-seksjon: Overskrift",
              },
              {
                type: "string",
                name: "ctaTitle",
                label: "Call-to-action tittel",
              },
              {
                type: "string",
                name: "ctaDescription",
                label: "Call-to-action beskrivelse",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            name: "about",
            label: "Om oss-side",
            fields: [
              {
                type: "string",
                name: "pageName",
                label: "Sidetittel",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Overskrift",
                required: true,
              },
              {
                type: "string",
                name: "intro",
                label: "Introtekst",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "sharedImage",
                label: "Fellesbilde",
              },
              {
                type: "string",
                name: "sharedImageAlt",
                label: "Bildebeskrivelse for fellesbilde",
              },
              {
                type: "string",
                name: "sharedKicker",
                label: "Felles kicker-tekst (liten tekst over tittel)",
              },
              {
                type: "string",
                name: "sharedIntro",
                label: "Felles intro-tekst",
              },
              {
                type: "rich-text",
                name: "sharedContent",
                label: "Felles innhold",
              },
              {
                type: "image",
                name: "hildeImage",
                label: "Hilde bilde",
              },
              {
                type: "string",
                name: "hildeKicker",
                label: "Hilde kicker-tekst",
                description: "Liten tekst over Hilde sin tittel",
              },
              {
                type: "string",
                name: "hildeTitle",
                label: "Hilde tittel",
              },
              {
                type: "rich-text",
                name: "hildeContent",
                label: "Hilde innhold",
              },
              {
                type: "object",
                name: "hildeKeywords",
                label: "Stikkord",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.keyword || "Nytt stikkord" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "keyword",
                    label: "Stikkord",
                    required: true,
                  },
                ],
              },
              {
                type: "image",
                name: "tinaMariaImage",
                label: "Tina Maria bilde",
              },
              {
                type: "string",
                name: "tinaMariaKicker",
                label: "Tina Maria kicker-tekst",
                description: "Liten tekst over Tina Maria sin tittel",
              },
              {
                type: "string",
                name: "tinaMariaTitle",
                label: "Tina Maria tittel",
              },
              {
                type: "rich-text",
                name: "tinaMariaContent",
                label: "Tina Maria innhold",
              },
              {
                type: "object",
                name: "tinaMariaKeywords",
                label: "Stikkord",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.keyword || "Nytt stikkord" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "keyword",
                    label: "Stikkord",
                    required: true,
                  },
                ],
              },
              {
                type: "string",
                name: "valuesTitle",
                label: "Verdier - tittel",
              },
              {
                type: "string",
                name: "value1Title",
                label: "Verdi 1 - tittel",
              },
              {
                type: "string",
                name: "value1Text",
                label: "Verdi 1 - tekst",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "value2Title",
                label: "Verdi 2 - tittel",
              },
              {
                type: "string",
                name: "value2Text",
                label: "Verdi 2 - tekst",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "value3Title",
                label: "Verdi 3 - tittel",
              },
              {
                type: "string",
                name: "value3Text",
                label: "Verdi 3 - tekst",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "ctaTitle",
                label: "Call-to-action tittel",
              },
              {
                type: "string",
                name: "ctaDescription",
                label: "Call-to-action beskrivelse",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            name: "standard",
            label: "Standard side",
            fields: [
              {
                type: "string",
                name: "pageName",
                label: "Sidetittel",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Overskrift",
                required: true,
              },
              {
                type: "string",
                name: "intro",
                label: "Introtekst",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "ctaTitle",
                label: "Call-to-action tittel",
              },
              {
                type: "string",
                name: "ctaDescription",
                label: "Call-to-action beskrivelse",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            name: "contact",
            label: "Kontaktinformasjon",
            fields: [
              {
                type: "string",
                name: "facebook",
                label: "Facebook URL",
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram URL",
              },
              {
                type: "string",
                name: "hildeName",
                label: "Hildes navn og tittel",
                required: true,
              },
              {
                type: "string",
                name: "hildeEmail",
                label: "Hildes e-postadresse",
                required: true,
              },
              {
                type: "string",
                name: "hildePhone",
                label: "Hildes telefonnummer",
                required: true,
              },
              {
                type: "string",
                name: "hildeHomePage",
                label: "Hildes hjemmeside",
                description: "Valgfritt",
              },
              {
                type: "string",
                name: "tinaName",
                label: "Tina Marias navn og tittel",
                required: true,
              },
              {
                type: "string",
                name: "tinaEmail",
                label: "Tina Marias e-postadresse",
                required: true,
              },
              {
                type: "string",
                name: "tinaPhone",
                label: "Tina Marias telefonnummer",
                required: true,
              },
              {
                type: "string",
                name: "tinaHomePage",
                label: "Tina Marias hjemmeside",
                description: "Valgfritt",
              },
            ],
          },
        ],
      },

      /* ── SERVICES (tjenester) ──────────────────────────────── */
      {
        name: "services",
        label: "Tjenester",
        path: "content/services",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.["title"]
                ? (values["title"] as string)
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                : "tjeneste",
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tittel",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Kategori / ansvarlig",
            required: true,
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Bilde",
            description: "Bilde som vises for denne tjenesten",
          },
          {
            type: "string",
            name: "description",
            label: "Beskrivelse",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "object",
            name: "offers",
            label: "Tilbud / priser",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Ny pris (Ikke fylt ut)" };
              },
              defaultItem: () => {
                return {
                  title: "Ny tjeneste",
                  price: "0 kr",
                };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Navn",
                required: true,
              },
              {
                type: "string",
                name: "price",
                label: "Pris",
                required: true,
              },
            ],
          },
          {
            type: "number",
            name: "order",
            label: "Sorteringsrekkefølge",
            description: "Lavere tall vises først",
          },
        ],
      },

      /* ── ARTICLES ─────────────────────────────────────── */
      {
        name: "articles",
        label: "Aktuelt - innlegg",
        path: "content/articles",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.["title"]
                ? (values["title"] as string)
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                : "innlegg",
          },
          router: ({ document }) => {
            return `/aktuelt/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tittel",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Ingress / sammendrag",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Forfatter",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publiseringsdato",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Kategori",
            options: ["Kronikk", "Fagartikkel", "Nyhet", "Refleksjon"],
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Forsidebilde",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Innhold",
            isBody: true,
          },
        ],
      },

      /* ── EVENTS ──────────────────────────────────────────── */
      {
        name: "events",
        label: "Arrangementer",
        path: "content/events",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.["title"]
                ? (values["title"] as string)
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                : "arrangement",
          },
          router: () => {
            return "/arrangementer";
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tittel",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Beskrivelse",
            isBody: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Bilde",
            description: "Beskrivende bilde for arrangementet (valgfritt)",
          },
          {
            type: "datetime",
            name: "date",
            label: "Startdato",
            required: true,
          },
          {
            type: "datetime",
            name: "endDate",
            label: "Sluttdato",
            description: "Valgfritt, hvis arrangementet varer flere dager",
          },
          {
            type: "string",
            name: "host",
            label: "Vert / kursholder",
            required: true,
          },
          {
            type: "string",
            name: "time",
            label: "Tidspunkt",
            description:
              "F.eks. 18:00-20:00 eller tekst for flerdagersarrangement",
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Sted",
            required: true,
          },
          {
            type: "string",
            name: "spots",
            label: "Plass-status",
            options: [
              "Åpent",
              "Noen plasser igjen",
              "Få plasser igjen",
              "Fullt",
            ],
            required: true,
          },
          {
            type: "reference",
            name: "category",
            label: "Kategori",
            collections: ["eventCategories"],
            required: true,
            description:
              "Velg en hovedkategori for filtrering. Trenger du en ny kategori, opprett den under 'Kategorier - arrangementer'.",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            description:
              "Ekstra stikkord som vises på kortet (ikke brukt til filtrering).",
            required: true,
          },
          {
            type: "string",
            name: "price",
            label: "Pris",
            description:
              "F.eks. 1200 kr eller 350 kr / kveld. 0 kr for gratis arrangementer",
            required: true,
          },
        ],
      },

      /* ── CATEGORIES (arrangementkategorier) ────────────────────── */
      {
        name: "eventCategories",
        label: "Kategorier - arrangementer",
        path: "content/eventCategories",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.["value"]
                ? (values["value"] as string)
                    .toLowerCase()
                    .replace(/æ/g, "ae")
                    .replace(/ø/g, "o")
                    .replace(/å/g, "a")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
                : "kategori",
          },
        },
        fields: [
          {
            type: "string",
            name: "value",
            label: "Verdi (brukes i kode, f.eks. 'seminar')",
            required: true,
            description:
              "Intern verdi brukt i URL-er og filtrering. Må være unik.",
          },
          {
            type: "string",
            name: "label",
            label: "Visningsnavn (f.eks. 'Seminar')",
            isTitle: true,
            required: true,
            description: "Navnet som vises til brukere i menyer og lister.",
          },
        ],
      },
    ],
  },
});
