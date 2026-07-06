# Brott og Blega

Informasjonsside for en lokal virksomhet i Fevik, Norge.

## Stack

- React + TanStack Start
- TanStack Query
- TanStack Form
- TinaCMS-konfigurasjon for innhold i `content/*.json`
- Vercel-oppsett via `vercel.json`

## Utvikling

```bash
npm install
npm run generate-routes
npm run dev
```

## Test og bygg

```bash
npm test
npm run build
```

## Innhold

Rediger JSON-filer i `content/`:

- `home.json`
- `about.json`
- `services.json`
- `events.json`

TinaCMS-skjema ligger i `tina/config.ts`.

## Kontaktform (Brevo)

Kontaktformen bruker server-funksjonen `submitContactMessage`.

Sett disse miljøvariablene:

- `BREVO_API_KEY`
- `BREVO_TO_EMAIL`
- `BREVO_SENDER_EMAIL` (valgfri)
- `BREVO_SENDER_NAME` (valgfri)

## Vercel

Prosjektet er klargjort med `vercel.json`.
