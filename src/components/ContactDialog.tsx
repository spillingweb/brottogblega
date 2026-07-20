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

const ContactDialog = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ navn: "", epost: "", melding: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DialogContent>
      {submitted ? (
        <>
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <DialogTitle>Takk for din henvendelse!</DialogTitle>
            <DialogDescription>
              Vi tar kontakt med deg innen 1–2 virkedager.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Lukk</Button>
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
              <FieldLabel>Navn</FieldLabel>
              <Input
                type="text"
                required
                value={form.navn}
                onChange={(e) => setForm({ ...form, navn: e.target.value })}
                placeholder="Ditt fulle navn"
              />
            </Field>
            <Field>
              <FieldLabel>E-post</FieldLabel>
              <Input
                type="email"
                required
                value={form.epost}
                onChange={(e) => setForm({ ...form, epost: e.target.value })}
                placeholder="din@epost.no"
              />
            </Field>
            <Field>
              <FieldLabel>Melding</FieldLabel>
              <Textarea
                required
                value={form.melding}
                onChange={(e) => setForm({ ...form, melding: e.target.value })}
                placeholder="Hva kan vi hjelpe deg med?"
                rows={4}
              />
            </Field>
            <Button type="submit">Send melding</Button>
          </form>
        </>
      )}
    </DialogContent>
  );
};

export default ContactDialog;
