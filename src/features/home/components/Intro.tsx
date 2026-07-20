const IntroArray = [
  {
    num: "01",
    title: "Kropp",
    text: "Fysioterapi og bevegelsesveiledning tilpasset kvinner i alle livsfaser.",
  },
  {
    num: "02",
    title: "Sinn",
    text: "Filosofisk terapi og dialog som skaper rom for refleksjon og mening.",
  },
  {
    num: "03",
    title: "Fellesskap",
    text: "Seminarer og samtalegrupper hvor kvinner møtes og støtter hverandre.",
  },
];

const Intro = () => {
  return (
    <section className="bg-secondary py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {IntroArray.map((item) => (
            <div key={item.num} className="flex gap-5">
              <span className="text-xs font-medium text-primary/40 pt-1 select-none">
                {item.num}
              </span>
              <div>
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
