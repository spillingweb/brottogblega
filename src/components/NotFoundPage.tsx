import { Link } from "@tanstack/react-router";
import Heading from "./ui/Heading";
import Kicker from "./ui/Kicker";
import { Button } from "./ui/button";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col gap-3 items-center justify-center px-6 py-20 text-center">
      <Kicker>
        404
      </Kicker>
      <Heading level={1}>
        Siden finnes ikke
      </Heading>
      <p className="max-w-lg text-base text-muted-foreground">
        Denne siden finnes ikke eller er flyttet.
      </p>
      <Button asChild className="mt-6">
        <Link
          to="/"
        >
          Tilbake til forsiden
        </Link>
      </Button>
    </div>
  );
}
