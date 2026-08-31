import { Link, type ErrorComponentProps } from "@tanstack/react-router";

export function RootErrorPage({ error, reset }: ErrorComponentProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Feil
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground">
        Noe gikk galt
      </h1>
      <p className="mt-4 max-w-lg text-base text-muted-foreground">
        Det oppstod en uventet feil. Prøv igjen, eller gå tilbake til forsiden.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Gå til forsiden
        </Link>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-sm border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
        >
          Prøv igjen
        </button>
      </div>

      {import.meta.env.DEV && (
        <pre className="mt-8 max-w-full overflow-x-auto rounded-md bg-muted p-4 text-left text-xs text-muted-foreground">
          {error.message}
        </pre>
      )}
    </div>
  );
}
