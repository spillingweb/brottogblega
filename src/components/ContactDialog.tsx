import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useServerFn } from "@tanstack/react-start";
import { sendKontaktskjema } from "#/server/kontakt";

const ContactDialog = () => {
  const send = useServerFn(sendKontaktskjema);

  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "feil">(
    "idle",
  );
  const [feilmelding, setFeilmelding] = useState("");
  const [form, setForm] = useState({
    person: "hilde",
    navn: "",
    epost: "",
    telefon: "",
    melding: "",
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!form.person) {
      setStatus("feil");
      setFeilmelding("Velg hvem du ønsker å kontakte før du sender.");
      return;
    }

    setStatus("sending");
    setFeilmelding("");

    try {
      const result = await send({
        data: {
          person: form.person,
          navn: form.navn,
          epost: form.epost,
          telefon: form.telefon,
          melding: form.melding,
        },
      });

      if (result.ok) {
        setStatus("ok");
        setForm({ person: "", navn: "", epost: "", telefon: "", melding: "" });
      } else {
        setStatus("feil");
        setFeilmelding(result.feilmelding ?? "Noe gikk galt.");
      }
    } catch {
      setStatus("feil");
      setFeilmelding("Noe gikk galt. Vennligst prøv igjen.");
    }
  };

  return (
    <DialogContent>
      {status === "ok" ? (
        <>
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle>Takk for din henvendelse!</DialogTitle>
            <DialogDescription>
              Vi tar kontakt med deg innen 1–2 virkedager.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setStatus("idle");
                setFeilmelding("");
              }}
              size="sm"
            >
              Send ny melding
            </Button>
            <DialogClose asChild>
              <Button size="sm">Lukk</Button>
            </DialogClose>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>Kontakt oss</DialogTitle>
            <DialogDescription>
              Vi gleder oss til å høre fra deg.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Hvem ønsker du å kontakte?</FieldLabel>
              <Select
                value={form.person}
                onValueChange={(value) => {
                  setForm({ ...form, person: value });
                  if (status === "feil") setFeilmelding("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg en person" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hilde">
                    Hilde Stenqvist (fysioterapi)
                  </SelectItem>
                  <SelectItem value="tina">
                    Tina Maria Lie (samtaleterapi)
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Navn *</FieldLabel>
              <Input
                type="text"
                required
                value={form.navn}
                onChange={(e) => setForm({ ...form, navn: e.target.value })}
                placeholder="Ditt fulle navn"
              />
            </Field>
            <Field>
              <FieldLabel>E-post *</FieldLabel>
              <Input
                type="email"
                required
                value={form.epost}
                onChange={(e) => setForm({ ...form, epost: e.target.value })}
                placeholder="din@epost.no"
              />
            </Field>
            <Field>
              <FieldLabel>Telefon</FieldLabel>
              <Input
                type="tel"
                value={form.telefon}
                onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                placeholder="+47 000 00 000 (valgfritt)"
              />
            </Field>
            <Field>
              <FieldLabel>Melding *</FieldLabel>
              <Textarea
                required
                value={form.melding}
                onChange={(e) => setForm({ ...form, melding: e.target.value })}
                placeholder="Hva kan vi hjelpe deg med?"
                rows={4}
              />
            </Field>

            {status === "feil" && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {feilmelding}
              </p>
            )}

            <Button type="submit" disabled={status === "sending" || !form.person}>
              {status === "sending" ? "Sender..." : "Send melding"}
            </Button>
          </form>
        </>
      )}
    </DialogContent>
  );
};

export default ContactDialog;
