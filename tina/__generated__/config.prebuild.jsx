// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
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
      publicFolder: "public"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "pages",
        label: "Hovedsider",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            readonly: true
          },
          router: ({ document }) => {
            const filename = document._sys.filename;
            if (filename === "home") return "/";
            if (filename === "about") return "/om-oss";
            if (filename === "services") return "/tjenester";
            if (filename === "events") return "/arrangementer";
            if (filename === "news") return "/aktuelt";
            return "/";
          }
        },
        templates: [
          {
            name: "homepage",
            label: "Forside",
            fields: [
              {
                type: "string",
                name: "kicker",
                label: "Kicker-tekst (liten tekst over tittel)"
              },
              {
                type: "string",
                name: "titleMain",
                label: "Hovedtittel",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "titleItalic",
                label: "Undertittel i kursiv",
                required: false
              },
              {
                type: "string",
                name: "subtitle",
                label: "Introtekst under tittel",
                ui: { component: "textarea" }
              },
              {
                type: "image",
                name: "heroImage",
                label: "Hovedbilde (hero)"
              },
              {
                type: "string",
                name: "intro1Title",
                label: "Intro 1: Verdi"
              },
              {
                type: "string",
                name: "intro1Text",
                label: "Intro 1: Tekst"
              },
              {
                type: "string",
                name: "intro2Title",
                label: "Intro 2: Verdi"
              },
              {
                type: "string",
                name: "intro2Text",
                label: "Intro 2: Tekst"
              },
              {
                type: "string",
                name: "intro3Title",
                label: "Intro 3: Verdi"
              },
              {
                type: "string",
                name: "intro3Text",
                label: "Intro 3: Tekst"
              },
              {
                type: "image",
                name: "profileImage",
                label: "Bilde (Om oss-seksjon)"
              },
              {
                type: "string",
                name: "aboutTitle",
                label: "Om oss: Tittel"
              },
              {
                type: "string",
                name: "aboutText1",
                label: "Om oss: Avsnitt 1",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "aboutText2",
                label: "Om oss: Avsnitt 2",
                ui: { component: "textarea" }
              },
              {
                type: "object",
                name: "testimonials",
                label: "Referanser fra klienter",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.name || "Ny referanse" };
                  }
                },
                fields: [
                  {
                    type: "string",
                    name: "quote",
                    label: "Sitat/referanse",
                    ui: { component: "textarea" },
                    required: true
                  },
                  {
                    type: "string",
                    name: "name",
                    label: "Navn",
                    required: true
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Rolle/beskrivelse (valgfritt)"
                  }
                ]
              },
              {
                type: "string",
                name: "ctaTitle",
                label: "Call-to-action tittel"
              },
              {
                type: "string",
                name: "ctaDescription",
                label: "Call-to-action beskrivelse",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "servicesHeading",
                label: "Tjenester-seksjon: Overskrift"
              },
              {
                type: "string",
                name: "blogHeading",
                label: "Blogg-seksjon: Overskrift"
              }
            ]
          },
          {
            name: "standard",
            label: "Standard side",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Sidetittel",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Undertittel",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "intro",
                label: "Introtekst",
                ui: { component: "textarea" }
              },
              {
                type: "image",
                name: "profileImage",
                label: "Profilbilde"
              },
              {
                type: "rich-text",
                name: "body",
                label: "Innhold",
                isBody: true
              },
              {
                type: "string",
                name: "contactName",
                label: "Kontaktinfo: Navn"
              },
              {
                type: "string",
                name: "contactLocation",
                label: "Kontaktinfo: Sted"
              },
              {
                type: "string",
                name: "contactEmail",
                label: "Kontaktinfo: E-post"
              },
              {
                type: "object",
                name: "verdier",
                label: "Verdier",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.tittel || "Ny verdi" };
                  }
                },
                fields: [
                  {
                    type: "string",
                    name: "tittel",
                    label: "Tittel",
                    required: true
                  },
                  {
                    type: "string",
                    name: "tekst",
                    label: "Beskrivelse",
                    ui: { component: "textarea" },
                    required: true
                  }
                ]
              }
            ]
          },
          {
            name: "header",
            label: "Side med kun header",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Sidetittel",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "intro",
                label: "Introtekst",
                ui: { component: "textarea" }
              }
            ]
          },
          {
            name: "services",
            label: "Tjenester-side",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Sidetittel",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Undertittel"
              },
              {
                type: "string",
                name: "intro",
                label: "Introtekst",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "infoBadge",
                label: "Informasjonsbadge tekst",
                description: "Tekst som vises i infoboksen \xF8verst p\xE5 siden"
              },
              {
                type: "object",
                name: "faq",
                label: "Vanlige sp\xF8rsm\xE5l",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.question || "Nytt sp\xF8rsm\xE5l" };
                  }
                },
                fields: [
                  {
                    type: "string",
                    name: "question",
                    label: "Sp\xF8rsm\xE5l",
                    required: true
                  },
                  {
                    type: "string",
                    name: "answer",
                    label: "Svar",
                    ui: { component: "textarea" },
                    required: true
                  }
                ]
              }
            ]
          },
          {
            name: "kontakt",
            label: "Kontaktinformasjon",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Sidetittel",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "kicker",
                label: "Kicker-tekst"
              },
              {
                type: "string",
                name: "heading",
                label: "Overskrift",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Beskrivelse",
                ui: { component: "textarea" },
                required: true
              },
              {
                type: "string",
                name: "addressLine1",
                label: "Adresse linje 1"
              },
              {
                type: "string",
                name: "addressLine2",
                label: "Adresse linje 2"
              },
              {
                type: "string",
                name: "addressLine3",
                label: "Adresse linje 3"
              },
              {
                type: "string",
                name: "email",
                label: "E-postadresse",
                required: true
              },
              {
                type: "string",
                name: "phone",
                label: "Telefonnummer",
                required: true
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
