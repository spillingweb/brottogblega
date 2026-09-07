import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeToNewsLetter } from "#/server/newsletter";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import { Checkbox } from "./ui/checkbox";

const NewsletterDialog = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "feil">(
    "idle",
  );
  const [feilmelding, setFeilmelding] = useState("");

  const send = useServerFn(subscribeToNewsLetter);

  const resetContactForm = () => {
    setStatus("idle");
    setFeilmelding("");
    setEmail("");
    setConsentAccepted(false);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setStatus("sending");
    setFeilmelding("");

    try {
      const result = await send({
        data: { name, email, consentAccepted },
      });

      if (result.ok) {
        setStatus("ok");
        setName("");
        setEmail("");
        setConsentAccepted(false);
      } else {
        console.error("Feil ved påmelding:", result.feilmelding);
        setStatus("feil");
        setFeilmelding(result.feilmelding ?? "Noe gikk galt.");
      }
    } catch (error) {
      console.error("Feil ved påmelding:", error);
      setStatus("feil");
      setFeilmelding(
        "Kunne ikke fullføre påmeldingen. " +
          (error instanceof Error ? error.message : ""),
      );
    }
  };

  return (
    <DialogContent onCloseAutoFocus={resetContactForm}>
      {status === "ok" ? (
        <>
          <DialogHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle>
              Takk! Du er nå meldt på nyhetsbrevet vårt.
            </DialogTitle>
            <DialogDescription>
              Vi sender deg siste nytt om våre innlegg, tjenester, og
              arrangementer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button size="sm">Lukk</Button>
            </DialogClose>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>Meld deg på vårt nyhetsbrev</DialogTitle>
            <DialogDescription>
              Få siste nytt om våre innlegg, tjenester, og arrangementer.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Ditt navn</FieldLabel>
              <Input
                type="text"
                disabled={status === "sending"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Din e-postadresse</FieldLabel>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "sending"}
              />
            </Field>
            <Field orientation="horizontal" className="items-start gap-2">
              <Checkbox
                id="gdpr-consent"
                checked={consentAccepted}
                onCheckedChange={(checked) =>
                  setConsentAccepted(checked === true)
                }
                disabled={status === "sending"}
                required
              />
              <FieldLabel
                htmlFor="gdpr-consent"
                className="text-muted-foreground text-balance"
              >
                Jeg godtar at Brott og Blega Helse lagrer min e-postadresse for
                å sende meg nyhetsbrev.
              </FieldLabel>
            </Field>

            {status === "feil" && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {feilmelding}
              </p>
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Avbryt</Button>
              </DialogClose>
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Melder på..." : "Meld meg på"}
              </Button>
            </DialogFooter>
          </form>
        </>
      )}
    </DialogContent>
  );
};

export default NewsletterDialog;
