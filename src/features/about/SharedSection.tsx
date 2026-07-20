const SharedSection = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-sm overflow-hidden border border-border">
        {/* Photo */}
        <div className="md:col-span-3 aspect-4/3 md:aspect-auto overflow-hidden bg-secondary">
          <img
            src="https://images.unsplash.com/photo-1680204438725-9a098e57f970?w=900&h=700&fit=crop&auto=format"
            alt="Kari og Ingrid i samtale"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Vision text */}
        <div className="md:col-span-2 bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-6">
              Vår felles visjon
            </p>
            <p
              className="text-lg leading-relaxed mb-5"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Vi tror at kvinner fortjener å bli møtt helhetlig — med faglig
              tyngde, varme og genuin nysgjerrighet på hvem du er.
            </p>
            <p className="text-sm text-primary-foreground/75 leading-relaxed mb-4">
              Kari bringer kroppen inn. Ingrid bringer tankene. Sammen skaper vi
              et rom der disse to ikke lenger behandles som atskilte størrelser.
            </p>
            <p className="text-sm text-primary-foreground/75 leading-relaxed">
              Brott & Blega er ikke en klinikk i tradisjonell forstand. Det er
              et sted der du kan tenke høyt, bevege deg trygt og finne frem til
              det som faktisk hjelper — for deg, i din livssituasjon.
            </p>
          </div>

          {/* Scroll links */}
          <div className="mt-10 pt-8 border-t border-primary-foreground/20 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-1">
              Bli kjent med oss
            </p>
            <button
              onClick={() => scrollTo("kari")}
              className="flex items-center justify-between text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
            >
              <span>Kari Andersen — Fysioterapeut</span>
              <span className="group-hover:translate-y-1 transition-transform">
                ↓
              </span>
            </button>
            <button
              onClick={() => scrollTo("ingrid")}
              className="flex items-center justify-between text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
            >
              <span>Ingrid Solberg — Sykepleier & filosof</span>
              <span className="group-hover:translate-y-1 transition-transform">
                ↓
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharedSection;
