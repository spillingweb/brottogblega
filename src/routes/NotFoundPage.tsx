import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground">
        Siden finnes ikke
      </h1>
      <p className="mt-4 max-w-lg text-base text-muted-foreground">
        Denne siden finnes ikke eller er flyttet.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        Tilbake til forsiden
      </Link>
    </div>
  );
}
