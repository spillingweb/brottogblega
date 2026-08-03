export type Article = {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  img: string;
  featured?: boolean;
  body: string[];
};

export const articles: Article[] = [
  {
    id: 1,
    featured: true,
    category: "Kronikk",
    date: "2. juli 2025",
    title:
      "Hva skjer egentlig i kroppen under overgangsalderen — og hvorfor snakker vi ikke mer om det?",
    excerpt:
      "Overgangsalderen er en av de mest undervurderte og misforståtte fasene i et kvinneliv. Kari Andersen ser daglig kvinner som ikke har fått tilstrekkelig informasjon om hva kroppen deres går gjennom.",
    author: "Kari Andersen",
    readTime: "6 min",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=500&fit=crop&auto=format",
    body: [
      "Overgangsalderen er ikke en sykdom. Det er en naturlig biologisk prosess — og likevel opplever mange kvinner den i stillhet, uten å vite hva de kan forvente eller hva de kan gjøre.",
      "Som fysioterapeut møter jeg jevnlig kvinner i 40- og 50-årene som forteller at de har levd med bekkensmerte, søvnproblemer, inkontinens eller leddsmerter i årevis — uten å koble det til hormonelle endringer. De har blitt fortalt at «det er normalt å bli eldre». Og det stemmer, delvis. Men å ha det bedre er også normalt, og mulig.",
      "Østrogennivåene synker gradvis gjennom perimeopausen, og dette påvirker langt mer enn menstruasjonssyklus. Bindevevet mister elastisitet. Bekkenbunnen svekkes. Leddene blir stivere. Søvnkvaliteten forringes. Mange opplever økt angst og humørsvingninger — ikke fordi de er «vanskelige», men fordi hjernen faktisk reagerer på hormonsvingningene.",
      "Det gode er at mye kan gjøres. Målrettet bekkenbunnstrening, tilpasset bevegelse og kunnskap om hva som skjer kan gjøre en stor forskjell. Og kanskje viktigst av alt: å vite at du ikke er alene, og at det finnes fagpersoner som tar dette på alvor.",
    ],
  },
  {
    id: 2,
    category: "Fagartikkel",
    date: "18. juni 2025",
    title:
      "Filosofisk samtale som helsearbeid — en annen måte å møte seg selv på",
    excerpt:
      "Ingrid Solberg utforsker hva det vil si å bruke filosofi som et klinisk verktøy, og hvorfor eksistensielle spørsmål hører hjemme i helseomsorgen.",
    author: "Ingrid Solberg",
    readTime: "8 min",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&h=420&fit=crop&auto=format",
    body: [
      "Vi er vant til å tenke på helse som fravær av sykdom. Men hva om helse også handler om å leve et liv som oppleves meningsfullt — et liv der du kjenner deg selv og vet hva du vil?",
      "Filosofisk praksis er ikke psykoterapi. Det er ikke diagnostikk, og det er ikke rådgivning i tradisjonell forstand. Det er en strukturert, åpen samtale der filosofiske metoder brukes for å hjelpe deg å tenke klarere, se mønstre i egne valg, og utforske hva som egentlig er viktig for deg.",
      "I min praksis møter jeg ofte kvinner som er slitne — ikke av diagnose, men av å leve i utakt med egne verdier. De gjør det «rette» ifølge andre, men kjenner ikke glede. Filosofisk samtale gir rom for å stille de virkelig grunnleggende spørsmålene: Hvem er jeg? Hva ønsker jeg? Hva er godt nok?",
      "Det er ingen fasitsvar. Men prosessen med å tenke grundig gjennom disse spørsmålene — i et trygt rom, med en samtalepartner som ikke har en agenda — kan være en av de mest helsefremmende tingene du gjør for deg selv.",
    ],
  },
  {
    id: 3,
    category: "Nyhet",
    date: "4. juni 2025",
    title: "Brott & Blega åpner ny dialoggruppe for kvinner i Fevik til høsten",
    excerpt:
      "Fra oktober starter vi opp en ny runde med dialoggrupper. Vi har sett stor interesse, og gleder oss til å møte nye deltakere.",
    author: "Redaksjonen",
    readTime: "2 min",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&h=420&fit=crop&auto=format",
    body: [
      "Etter stor etterspørsel oppretter vi en ny dialoggruppe med oppstart i oktober 2025. Gruppen er for kvinner mellom 35 og 55 år som ønsker et fast rom for refleksjon, deling og samtale.",
      "Dialoggruppen ledes av Ingrid Solberg og møtes annenhver uke over tre måneder. Temaene varierer, men er alltid forankret i deltakernes egne liv og spørsmål.",
      "Det er plass til 6–8 deltakere per gruppe, og vi tilbyr alltid en gratis prøvesesjon for deg som er nysgjerrig men usikker. Ta kontakt for mer informasjon eller for å melde din interesse.",
    ],
  },
  {
    id: 4,
    category: "Kronikk",
    date: "20. mai 2025",
    title: "Bekkenbunnen — det vi ikke snakker om, men alle kvinner burde vite",
    excerpt:
      "Lekkasje, smerter og tyngdefølelse er vanlig, men ikke normalt. Kari Andersen forklarer hva bekkenbunnen er, hva som kan gå galt, og hva du faktisk kan gjøre.",
    author: "Kari Andersen",
    readTime: "5 min",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&h=420&fit=crop&auto=format",
    body: [
      "Bekkenbunnen er en gruppe muskler som sitter nederst i bekkenet. De holder på organene dine, er sentrale i seksualfunksjon, og spiller en avgjørende rolle ved urinering og avføring. Og likevel er det svært få kvinner som vet særlig mye om dem — før noe går galt.",
      "Etter fødsel, ved overgangsalder, eller rett og slett som følge av tid og belastning kan bekkenbunnen svekkes. Det kan gi lekkasje, smerter under samleie, en tyngdefølelse i underlivet, eller problemer med å tømme blæren helt.",
      "Det gode er at bekkenbunnen er trenerbar — som enhver annen muskel. Med riktig veiledning kan mange kvinner oppleve betydelig bedring, uavhengig av alder.",
      "Det første steget er å vite at du ikke trenger å leve med dette. Det andre er å snakke med noen som kan hjelpe.",
    ],
  },
  {
    id: 5,
    category: "Refleksjon",
    date: "8. mai 2025",
    title: "Om å si nei — og hva det egentlig koster å la være",
    excerpt:
      "Mange kvinner er eksperter på å prioritere andre. Ingrid Solberg skriver om grenser, verdier og den stille prisen vi betaler når vi stadig setter oss selv sist.",
    author: "Ingrid Solberg",
    readTime: "4 min",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&h=420&fit=crop&auto=format",
    body: [
      "Å si nei er ikke egoisme. Det er en form for selvrespekt — og i forlengelsen, en form for omsorg for andre. Du kan ikke gi fra et tomt kar.",
      "Likevel er «nei» et av de vanskeligste ordene for mange kvinner. Vi er sosialisert til å strekke oss, tilpasse oss, ta ansvar. Og ofte gjør vi det med et smil, til vi ikke lenger klarer å smile.",
      "I filosofisk samtale møter jeg dette temaet igjen og igjen: Hvem er jeg utenom det jeg gjør for andre? Hva skjer med meg hvis jeg faktisk prioriterer meg selv? Disse spørsmålene kan kjennes skumle — fordi svaret ofte krever endring.",
      "Men det å tørre å stille dem er allerede et steg. Et lite, modige, nødvendig steg.",
    ],
  },
];
