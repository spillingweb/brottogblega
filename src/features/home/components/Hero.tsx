import ContactDialog from "#/components/ContactDialog";
import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import Heading from "#/components/ui/Heading";
import UppercaseHeading from "#/components/ui/UppercaseHeading";
import { Link } from "@tanstack/react-router";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-primary/10">
        <img
          src="https://images.unsplash.com/photo-1739217416358-0f84b45d918f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Rolig hav ved Fevik, Sørlandskysten"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/20 via-background/30 to-background" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-xl flex flex-col gap-4">
          <UppercaseHeading className="text-primary font-medium">
            Fevik, Aust-Agder
          </UppercaseHeading>
          <Heading className="md:text-6xl leading-tight">
            Helse og ro,
            <br />
            <em>for deg som kvinne</em>
          </Heading>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-md">
            Vi tilbyr fysioterapi, filosofisk samtale og seminarer med fokus på
            kvinnehelse og indre velvære — i trygge og omsorgsfulle omgivelser.
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <Button size="lg" asChild>
              <Link to="/tjenester">Se våre tjenester</Link>
            </Button>
            <Dialog>
              <DialogTrigger className="cursor-pointer" asChild>
                <Button variant="outline" size="lg" className="text-primary">
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
