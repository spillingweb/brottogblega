import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import Heading from "#/components/ui/Heading";
import Kicker from "#/components/ui/Kicker";
import type { PagesQuery } from "../../../tina/__generated__/types";
// import IndividualSection from "./IndividualSection";
import SharedSection from "./SharedSection";

const About = ({ pageData }: { pageData: PagesQuery }) => {
  const page = pageData.pages;

  return (
    <div className="pt-28">
      {/* Intro header */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <Kicker className="mb-4">Om oss</Kicker>
        <Heading level={1} className="md:text-5xl max-w-2xl leading-tight mb-6">
          Brott & Blega — et møtested for kropp og tanke
        </Heading>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
          Vi er to kvinner med ulik faglig bakgrunn og en felles overbevisning:
          at ekte helse krever at vi tar hele mennesket på alvor — ikke bare
          diagnosen, ikke bare symptomene, men livet du lever.
        </p>
      </section>

      <SharedSection />

      {/* Kari */}
      {/* <IndividualSection
        description={
          <>
            <p>
              Kari er autorisert fysioterapeut med over 12 års erfaring,
              spesialisert i kvinnehelse og bekkenbunnsfunksjon. Hun har
              videreutdanning fra Høgskolen i Oslo og Akershus, og har jobbet
              tett med kvinner gjennom svangerskap, etter fødsel og inn i
              overgangsalderen.
            </p>
            <p>
              Kari tror at kroppen holder mer kunnskap enn vi ofte anerkjenner,
              og at å lytte til kroppen er et grunnleggende steg mot bedre
              helse. Hun møter hver pasient der de er, med tålmodighet og faglig
              dybde.
            </p>
        
          </>
        }
        quote="Jeg ønsker at alle kvinner skal kjenne seg sett og hørt — og at
              de går hjem med verktøy som faktisk hjelper."
      /> */}
      <section
        id="kari"
        className="scroll-mt-24 max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="aspect-3/4 rounded-sm overflow-hidden bg-secondary">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop&auto=format"
            alt="Kari Andersen, fysioterapeut"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-primary mb-2">
            Fysioterapeut
          </p>
          <h2
            className="text-3xl md:text-4xl mb-5"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Kari Andersen
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            Kari er autorisert fysioterapeut med over 12 års erfaring,
            spesialisert i kvinnehelse og bekkenbunnsfunksjon. Hun har
            videreutdanning fra Høgskolen i Oslo og Akershus, og har jobbet tett
            med kvinner gjennom svangerskap, etter fødsel og inn i
            overgangsalderen.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            Kari tror at kroppen holder mer kunnskap enn vi ofte anerkjenner, og
            at å lytte til kroppen er et grunnleggende steg mot bedre helse. Hun
            møter hver pasient der de er, med tålmodighet og faglig dybde.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
            «Jeg ønsker at alle kvinner skal kjenne seg sett og hørt — og at de
            går hjem med verktøy som faktisk hjelper.»
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Bekkenbunnsfysioterapi",
              "Svangerskap & fødsel",
              "Overgangsalder",
              "Bevegelsesanalyse",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Ingrid */}
      <section
        id="ingrid"
        className="scroll-mt-24 max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="order-2 md:order-1">
          <p className="text-xs uppercase tracking-widest text-primary mb-2">
            Sykepleier & filosof
          </p>
          <h2
            className="text-3xl md:text-4xl mb-5"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Ingrid Solberg
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            Ingrid er utdannet sykepleier og har en mastergrad i filosofi fra
            Universitetet i Oslo, med fordypning i fenomenologi og eksistensiell
            filosofi. Hennes tilnærming bringer humanistisk tenkning inn i
            klinisk omsorg på en måte som er både tilgjengelig og meningsfull.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            Ingrid tilbyr filosofisk terapi og dialoggrupper der spørsmål om
            mening, verdier og livsvalg får rom. Hun mener at filosofi ikke
            tilhører akademia alene — det er et verktøy for livet vi alle kan
            bruke.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
            «Å tenke grundig gjennom hvem du er og hva du ønsker — det er en av
            de mest omsorgsfulle tingene du kan gjøre for deg selv.»
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Eksistensiell filosofi",
              "Fenomenologi",
              "Filosofisk samtale",
              "Etikk & verdier",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="order-1 md:order-2 aspect-3/4 rounded-sm overflow-hidden bg-secondary">
          <img
            src="https://images.unsplash.com/photo-1780733058027-680a7c841fe5?w=600&h=800&fit=crop&auto=format"
            alt="Ingrid Solberg, sykepleier og filosof"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-20 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-primary mb-4 text-center">
            Våre verdier
          </p>
          <h2
            className="text-3xl md:text-4xl text-center mb-14"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Det vi tror på
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Helhet",
                text: "Vi ser kropp, sinn og livshistorie som ett — og møter deg med et helhetsperspektiv som du ikke alltid finner i tradisjonell helseomsorg.",
              },
              {
                title: "Trygghet",
                text: "Vi skaper et rom der du kan være ærlig, sårbar og nysgjerrig — uten å måtte prestere eller forklare deg.",
              },
              {
                title: "Respekt",
                text: "Din erfaring og dine valg er gyldige. Vi er veiledere og støttespillere, ikke fasitsvar på hvem du bør være.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-card p-8 rounded-sm">
                <h3
                  className="text-xl mb-3"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CallToAction
        title="Vil du bli bedre kjent med oss?"
        description="Ta gjerne kontakt for en uforpliktende prat om hva vi kan tilby deg."
        btnText="Kontakt oss"
        dialog={<ContactDialog />}
      />
    </div>
  );
};

export default About;
