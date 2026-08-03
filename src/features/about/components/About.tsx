import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import { tinaField } from "tinacms/tina-field";
import type {
  PagesAbout,
  PagesQuery,
  PagesStandard,
} from "../../../../tina/__generated__/types";
import IndividualSection from "./IndividualSection";
import SharedSection from "./SharedSection";
import PageWrapper from "#/components/PageWrapper";

const About = ({ pageData }: { pageData: PagesQuery }) => {
  const page = pageData.pages as PagesAbout;

  const values = [
    {
      title: page.value1Title,
      text: page.value1Text,
    },
    {
      title: page.value2Title,
      text: page.value2Text,
    },
    {
      title: page.value3Title,
      text: page.value3Text,
    },
  ];

  return (
    <PageWrapper kicker={"Om oss"} page={page as PagesStandard}>
      {/* Shared Section */}
      <SharedSection page={page} />

      {/* Individual Sections */}
      <div className="bg-muted py-16 md:py-20 flex flex-col gap-16 md:gap-20">
        {/* Hilde */}
        <IndividualSection id="hilde" page={page} isHilde={true} />
        {/* Tina Maria */}
        <IndividualSection id="tinaMaria" page={page} isHilde={false} />
      </div>

      {/* Values */}
      <section className="py-20 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-primary mb-4 text-center">
            Våre verdier
          </p>
          <h2
            className="text-3xl md:text-4xl text-center mb-14"
            style={{ fontFamily: "'Lora', serif" }}
            data-tina-field={tinaField(page, "valuesTitle")}
          >
            {page.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-card p-8 rounded-sm">
                <h3
                  className="text-xl mb-3"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CallToAction
        title={page.ctaTitle || "Klar til å ta et skritt mot bedre helse?"}
        description={
          page.ctaDescription ||
          "Ta kontakt for en uforpliktende samtale. Vi er her for deg."
        }
        btnText="Kontakt oss"
        dialog={<ContactDialog />}
        dataTitle={tinaField(page, "ctaTitle")}
        dataDescription={tinaField(page, "ctaDescription")}
      />
    </PageWrapper>
  );
};

export default About;
