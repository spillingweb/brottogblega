import { Button } from "#/components/ui/button";
import type { PagesHomepage } from "../../../../tina/__generated__/types";
import Heading from "#/components/ui/Heading";
import Kicker from "#/components/ui/Kicker";
import { Link } from "@tanstack/react-router";
import { tinaField } from "tinacms/tina-field";

const AboutTeaser = ({ page }: { page: PagesHomepage }) => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div
            className="aspect-4/5 rounded-sm overflow-hidden anim-zoom"
            data-tina-field={tinaField(page, "profileImage")}
          >
            <img
              src={page.profileImage || ""}
              alt="Bilde av Hilde og Tina Maria, grunnleggerne av Brott & Blega"
              className="w-full h-full object-cover anim-float"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-accent rounded-sm hidden md:block" />
        </div>
        <div className="anim-scroll">
          <Kicker className="text-primary mb-4">Om oss</Kicker>
          <Heading
            level={2}
            className="md:text-4xl mb-6 leading-snug"
            data-tina-field={tinaField(page, "aboutTitle")}
          >
            {page.aboutTitle}
          </Heading>
          <p
            className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4"
            data-tina-field={tinaField(page, "aboutText1")}
          >
            {page.aboutText1}
          </p>
          <p
            className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8"
            data-tina-field={tinaField(page, "aboutText2")}
          >
            {page.aboutText2}
          </p>
          <Button variant="link" className="p-0 h-fit" asChild>
            <Link to="/om-oss">
              Les mer om oss
              <span>→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
