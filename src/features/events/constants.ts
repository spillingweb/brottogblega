export type Event = {
  id: number;
  date: string;
  day: string;
  month: string;
  title: string;
  host: string;
  time: string;
  location: string;
  spots: string;
  spotsLeft: number;
  desc: string;
  tags: string[];
  price: string;
  img: string;
};

export const events: Event[] = [
  {
    id: 1,
    date: "12. august 2025",
    day: "12",
    month: "AUG",
    title: "Kroppens visdom — heldagsseminar",
    host: "Hilde Stenqvist & Tina Maria Lie",
    time: "10:00–16:00",
    location: "Fevik Kulturhus, Havnegata 3",
    spots: "Få plasser igjen",
    spotsLeft: 3,
    desc: "Et intensivt dagseminar der vi utforsker forbindelsen mellom kroppserfaringer og selvforståelse. Kombinerer øvelser fra fysioterapi med filosofisk refleksjon i et trygt og inspirerende fellesskap.",
    tags: ["Seminar", "Kropp & Sinn"],
    price: "1 200 kr",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 2,
    date: "26. august 2025",
    day: "26",
    month: "AUG",
    title: "Filosofi for hverdagen — kveldssamtale",
    host: "Tina Maria Lie",
    time: "18:00–20:00",
    location: "Brott & Blega, Strandveien 14, Fevik",
    spots: "Åpent",
    spotsLeft: 8,
    desc: "Første kveld i en serie på fire. Vi tar utgangspunkt i filosofiske tekster om identitet og verdier, og samtaler om hva de betyr for livet vi lever. Ingen forkunnskaper nødvendig.",
    tags: ["Kurs", "Filosofi"],
    price: "350 kr / kveld",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    date: "13.–14. september 2025",
    day: "13",
    month: "SEP",
    title: "Overgangsalder med ny forståelse",
    host: "Hilde Stenqvist & Tina Maria Lie",
    time: "Lørdag 09:00–17:00, Søndag 10:00–15:00",
    location: "Grimstad Gjestehus, Grimstad",
    spots: "Noen plasser igjen",
    spotsLeft: 5,
    desc: "Et todagerskurs for kvinner i eller nær overgangsalderen. Hilde gir innsikt i kroppens fysiske endringer; Tina Maria utforsker overgangsalderen som en meningsfull livsfase. Inkluderer frokost begge dager.",
    tags: ["Kurs", "Overgangsalder"],
    price: "2 400 kr",
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 4,
    date: "7. oktober 2025",
    day: "07",
    month: "OKT",
    title: "Dialoggruppe — oppstart høst 2025",
    host: "Tina Maria Lie",
    time: "18:30–20:30",
    location: "Brott & Blega, Strandveien 14, Fevik",
    spots: "Åpent",
    spotsLeft: 6,
    desc: "Ny runde med dialoggrupper starter i oktober. Gruppe for kvinner 35–55 år som ønsker reflekterte samtaler om kropp, identitet og hva det vil si å leve godt. Forpliktelse over tre måneder.",
    tags: ["Gruppe", "Dialog"],
    price: "1 200 kr / mnd",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 5,
    date: "5. november 2025",
    day: "05",
    month: "NOV",
    title: "Hva betyr helse for meg? — filosofisk dagskurs",
    host: "Tina Maria Lie",
    time: "10:00–15:30",
    location: "Brott & Blega, Strandveien 14, Fevik",
    spots: "Åpent",
    spotsLeft: 10,
    desc: "Et dagskurs der vi filosofisk undersøker helsebegrepet: Hva er egentlig helse? Er det fravær av sykdom, eller noe mer? Kurset kombinerer korte forelesninger med gruppesamtale og individuell refleksjon.",
    tags: ["Kurs", "Filosofi"],
    price: "950 kr",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format",
  },
];
