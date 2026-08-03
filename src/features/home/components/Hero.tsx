import ContactDialog from "#/components/ContactDialog";
import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import Heading from "#/components/ui/Heading";
import Kicker from "#/components/ui/Kicker";
import { Link } from "@tanstack/react-router";
import { tinaField } from "tinacms/tina-field";
import type { PagesHomepage } from "../../../../tina/__generated__/types";

const Hero = ({ page }: { page: PagesHomepage }) => {
  const { kicker, titleMain, titleItalic, subtitle, heroImage } = page;
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-primary/10"
        data-tina-field={tinaField(page, "heroImage")}
      >
        <img
          src={heroImage || ""}
          alt="Hero image"
          className="w-full h-full object-cover opacity-40"

          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/20 via-background/30 to-background" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-xl flex flex-col gap-4 anim-hero">
          <Kicker
            className="text-primary font-medium"
            data-tina-field={tinaField(page, "kicker")}
          >
            {kicker}
          </Kicker>
          <Heading className="md:text-6xl leading-tight flex flex-col">
            <span data-tina-field={tinaField(page, "titleMain")}>
              {titleMain}
            </span>
            <em data-tina-field={tinaField(page, "titleItalic")}>
              {titleItalic}
            </em>
          </Heading>
          <p
            className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-md"
            data-tina-field={tinaField(page, "subtitle")}
          >
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <Button size="lg" asChild>
              <Link to="/tjenester">Se våre tjenester</Link>
            </Button>
            <Dialog>
              <DialogTrigger className="cursor-pointer" asChild>
                <Button variant="outline" size="lg">
                  Kontakt oss
                </Button>
              </DialogTrigger>
              <ContactDialog />
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
