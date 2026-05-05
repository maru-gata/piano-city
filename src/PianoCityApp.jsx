import { useState, useMemo } from 'react';
import { Star, MapPin, Clock, Check, Heart, ChevronDown, ChevronRight, ArrowLeftRight } from 'lucide-react';

const concertsData = [
  // THURSDAY
  {
    id: 'belli',
    day: 'thu',
    dayLabel: 'Thu · 14 May',
    dayNumber: '00',
    dayTitle: 'Prelude',
    time: 'TBD',
    duration: 'YOUR BOOKING',
    title: 'Olivia Belli',
    program: 'Modern classical · Apple Music Classical anteprima',
    venue: 'Anfiteatro del Liberty',
    address: 'Apple Piazza Liberty · Zone 1',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Apple+Piazza+Liberty+Milano',
    badges: ['booked'],
    isStar: true,
    booked: true,
    description: 'Marche-based composer-pianist, BBC Proms commissioned. Her newest album Daimon (Sony Classical, Feb 2026) is a piano concerto in contemporary neoclassical style — about destiny as inner calling, an Odyssean journey through the self in three movements: The Departure, The Journey, The Return.',
    whyYou: 'Perfect prelude. Belli\'s daimon-as-inner-direction frame sits quietly close to your archetype work. Listen to Intermundia and Daimon on the metro home this week to set the mood.',
    isAlt: false,
  },
  // FRIDAY
  {
    id: 'animalia',
    day: 'fri',
    dayLabel: 'Fri · 15 May',
    dayNumber: '01',
    dayTitle: 'Opening — geometry & ceremony',
    time: '19:00',
    duration: '~60 min',
    title: 'Animalia',
    program: 'Marco Rossari & Pietro Aloi — Cortázar reading + jazz piano',
    venue: 'Fondazione Prada',
    address: 'Largo Isarco 2 · Zone 5',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Fondazione+Prada+Largo+Isarco+2+Milano',
    badges: ['walkin'],
    description: 'Marco Rossari reads Julio Cortázar\'s animal stories — metamorphoses between human and beast — counterpointed by jazz piano improvisation by 23-year-old Amsterdam-based Pietro Aloi. Programmed in dialogue with the Cao Fei Dash exhibition at Prada.',
    whyYou: 'Italian-language reading, but the symbolic + animal frame is gorgeous, and Cao Fei is on the same ticket of attention. Arrive early to walk the show first.',
    isAlt: false,
  },
  {
    id: 'pamart',
    day: 'fri',
    dayLabel: 'Fri · 15 May',
    dayNumber: '01',
    dayTitle: 'Opening — geometry & ceremony',
    time: '21:00',
    duration: '~75 min',
    title: 'Sofiane Pamart — Inauguration',
    program: 'Original compositions · cinematic & rap-adjacent piano',
    venue: 'GAM Main Stage',
    address: 'Via Palestro 18 · Zone 1',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=GAM+Galleria+d%27Arte+Moderna+Via+Palestro+16+Milano',
    badges: ['priority', 'walkin'],
    isStar: true,
    description: 'The festival opens with Pamart — among the top 5 most-streamed classical artists worldwide in 2025. First pianist to play sold-out shows at Stade de France and Accor Arena. Performed at Paris 2024 Olympics opening ceremony. He calls himself a haute-couture pianist with the mentality of a rapper.',
    whyYou: 'Not your usual register — but the visual precision and aesthetic discipline are very much you. Arrive 45+ min early.',
    isAlt: false,
  },
  // SATURDAY
  {
    id: 'liszt1',
    day: 'sat',
    dayLabel: 'Sat · 16 May',
    dayNumber: '02',
    dayTitle: 'Liszt by day, two pianos by night',
    time: '11:30',
    duration: '~45 min',
    title: 'Liszt 140 — Symphonic Poems 1 & 2',
    program: 'Duo Ad Parnassum · four hands',
    venue: 'Rotonda della Besana',
    address: 'Via Besana 12 · Zone 1',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rotonda+della+Besana+Via+Enrico+Besana+12+Milano',
    badges: ['walkin'],
    description: 'Opening of a full Liszt-marathon day for the 140th anniversary of his death. Symphonic Poems performed four-hands in the Rotonda\'s circular 18th-century architecture — a former cemetery turned exhibition hall, geometry made sacred.',
    whyYou: 'You said Liszt. The Rotonda is one of Milan\'s most architecturally distinctive spaces — the kind of geometric ceremony you respond to.',
    isAlt: false,
  },
  {
    id: 'liszt2',
    day: 'sat',
    dayLabel: 'Sat · 16 May',
    dayNumber: '02',
    dayTitle: 'Liszt by day, two pianos by night',
    time: '12:30',
    duration: '~45 min',
    title: 'Liszt 140 — Symphonic Poems 3, 4, 5 & 6',
    program: 'Roberto Franca & Alessandro Di Lorenzo',
    venue: 'Rotonda della Besana',
    address: 'Via Besana 12 · Zone 1',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rotonda+della+Besana+Via+Enrico+Besana+12+Milano',
    badges: ['walkin'],
    description: 'Continuation of the marathon. Symphonic Poems 3–6, four-hands.',
    whyYou: 'Stay for one more set. By the second hour the Rotonda starts to feel like a meditation chamber.',
    isAlt: false,
  },
  {
    id: 'jiliu',
    day: 'sat',
    dayLabel: 'Sat · 16 May',
    dayNumber: '02',
    dayTitle: 'Liszt by day, two pianos by night',
    time: '17:30',
    duration: '~70 min',
    title: 'Ji Liu — "Low: from Bowie to Glass"',
    program: 'Philip Glass Low Symphony (solo piano transcriptions) + 3 Bowie songs',
    venue: 'BiM Milano',
    address: 'Viale Pirelli 10 · Zone 2',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=BiM+Milano+Viale+Pirelli+10+Milano',
    badges: ['priority', 'booked'],
    isStar: true,
    description: 'Ji Liu\'s own piano transcriptions of Glass\'s Low Symphony — based on Bowie\'s Berlin trilogy second album — for the 10th anniversary of Bowie\'s death. Movements: Subterraneans / Some Are / Warszawa, then Starman / Space Oddity / Sound and Vision arranged for solo piano.',
    whyYou: 'Glass + Bowie + a serious pianist\'s own transcriptions = the highest concentration of your taste in one program.',
    isAlt: false,
  },
  {
    id: 'khalife',
    day: 'sat',
    dayLabel: 'Sat · 16 May',
    dayNumber: '02',
    dayTitle: 'Liszt by day, two pianos by night',
    time: '23:00',
    duration: '~75 min',
    title: 'Bachar Mar-Khalifé & Rami Khalifé',
    program: 'Concert for two pianos · Lebanese brothers in rare duo',
    venue: 'GAM Main Stage',
    address: 'Via Palestro 18 · Zone 1',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=GAM+Galleria+d%27Arte+Moderna+Via+Palestro+16+Milano',
    badges: ['priority', 'walkin'],
    isStar: true,
    description: 'Rare collaboration between two brothers from Beirut — Rami trained at Juilliard, member of electro-classical group AUFGANG (collaborates with Agoria). Bachar fuses classical, world, jazz, electronic; Grand Prix Sacem 2021. They reinterpret each other\'s repertoire through improvisation, drawing on Lebanese identity, exile, memory.',
    whyYou: 'This is the night\'s emotional peak. Rami\'s electronic side, Bachar\'s exile/memory themes — the hybrid you keep being drawn to.',
    isAlt: false,
  },
  {
    id: 'stegonaute',
    day: 'sat',
    dayLabel: 'Sat · 16 May',
    dayNumber: '02',
    dayTitle: 'Liszt by day, two pianos by night',
    time: '00:00',
    duration: 'PIANO NIGHT',
    title: 'Stegonaute',
    program: 'French ambient · "music for invisible films"',
    venue: 'GAM Main Stage',
    address: 'Via Palestro 18 · Zone 1',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=GAM+Galleria+d%27Arte+Moderna+Via+Palestro+16+Milano',
    badges: ['walkin'],
    description: 'French composer based in the Vercors mountains. Synths, tape recorders, Nintendo consoles, archive recordings. Album on Mystery Circles (2024). Has collaborated with Robot Koch, Studio Ghibli\'s Priscilla Ahn, and Alcest. Trained as a film composer.',
    whyYou: 'Direct line to your ambient/electronic sensibility — closer to Sakamoto\'s late electronic work or Robot Koch than to classical piano. If you choose Snorri at 6 AM Sunday, skip Stegonaute.',
    isAlt: false,
  },
  // SUNDAY
  {
    id: 'snorri',
    day: 'sun',
    dayLabel: 'Sun · 17 May',
    dayNumber: '03',
    dayTitle: 'Sunrise to Tigran',
    time: '06:00',
    duration: 'ALBA',
    title: 'Snorri Hallgrímsson — Sunrise concert',
    program: 'Icelandic neoclassical · Deutsche Grammophon',
    venue: 'Velodromo Maspes-Vigorelli',
    address: 'Via Arona 19 · Zone 8',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Velodromo+Vigorelli+Via+Arona+19+Milano',
    badges: ['free', 'walkin'],
    isStar: true,
    description: 'Co-composed the BAFTA-winning Broadchurch soundtrack with Ólafur Arnalds. Trained at Reykjavík Iceland Academy of the Arts and Berklee. Signed to Deutsche Grammophon in 2024; The Importance of Birds (2025). Icelandic melancholy with electronic hints, performed at sunrise inside Milan\'s historic 1935 cycling velodrome.',
    whyYou: 'The concert the festival made for you. Set an alarm for 5:00. Worth every minute of lost sleep.',
    isAlt: false,
  },
  {
    id: 'trabace',
    day: 'sun',
    dayLabel: 'Sun · 17 May',
    dayNumber: '03',
    dayTitle: 'Sunrise to Tigran',
    time: '11:00',
    duration: '~60 min',
    title: 'Angelo Trabace — "Orfeo"',
    program: 'Original soundtrack · Buzzati\'s Poema a fumetti · CAM Sugar',
    venue: 'Armani / Silos',
    address: 'Via Bergognone 40 · Zone 6',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Armani+Silos+Via+Bergognone+40+Milano',
    badges: ['free', 'walkin'],
    description: 'Original score for Virgilio Villoresi\'s film adaptation of Dino Buzzati\'s Poema a fumetti — premiered at Venice 2025, shortlisted for the David di Donatello. Floating string orchestrations, impressionist atmosphere. Trabace is part of experimental collective Metameccanici.',
    whyYou: 'Buzzati + dream-world soundtrack inside Armani/Silos. Aesthetic coherence: minimalist architecture, impressionist score, surreal source text.',
    isAlt: false,
  },
  {
    id: 'mashimo',
    day: 'sun',
    dayLabel: 'Sun · 17 May',
    dayNumber: '03',
    dayTitle: 'Sunrise to Tigran',
    time: '14:30',
    duration: '~50 min',
    title: 'Wataru Mashimo — Rising Stars',
    program: 'Japanese pianist · classical recital',
    venue: 'Museo Bagatti Valsecchi',
    address: 'Via Gesù 5 · Zone 1',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museo+Bagatti+Valsecchi+Via+Ges%C3%B9+5+Milano',
    badges: ['free', 'walkin'],
    description: 'Selected for the Rising Stars program. Recital inside one of Milan\'s most beautifully preserved late-19th-century private museums — a Renaissance-revival palazzo with intact period rooms.',
    whyYou: 'Japanese pianist + Bagatti Valsecchi. Two of your loves intersecting in 50 minutes.',
    isAlt: false,
  },
  {
    id: 'bof',
    day: 'sun',
    dayLabel: 'Sun · 17 May',
    dayNumber: '03',
    dayTitle: 'Sunrise to Tigran',
    time: '17:00',
    duration: 'PARTIAL',
    title: 'Alberto Bof — "The Distance Between Us"',
    program: 'Synthwave + grand piano + modular synths',
    venue: 'Piscina Cozzi',
    address: 'Via Tunisia 35 · Zone 1 · your neighborhood',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Piscina+Cozzi+Via+Tunisia+35+Milano',
    badges: ['free', 'walkin'],
    description: 'Bof composed and arranged "Shallow" for Bradley Cooper / Lady Gaga in A Star Is Born — 100M+ streams. Live, he alternates electronic console, modular synths, master keyboard, grand piano. Inside the historic 1930s rationalist swimming pool.',
    whyYou: 'Architecturally Cozzi is gorgeous — be ready to leave mid-set if you\'re going to Eno.',
    isAlt: false,
  },
  {
    id: 'eno',
    day: 'sun',
    dayLabel: 'Sun · 17 May',
    dayNumber: '03',
    dayTitle: 'Sunrise to Tigran',
    time: '18:00',
    duration: '~50 min',
    title: 'Enrico Gabrielli — Brian Eno\'s Music for Airports',
    program: 'Eno\'s 1979 ambient album — solo piano + loops',
    venue: 'ADI Design Museum',
    address: 'Via Ceresio 7 · Zone 9',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=ADI+Design+Museum+Via+Ceresio+7+Milano',
    badges: ['walkin', 'nolate'],
    isStar: true,
    description: 'The first album ever explicitly labeled "ambient music." Gabrielli — born 1976, student of Danilo Lorenzini, friend of Franco Battiato — performs the entire Ambient 1: Music for Airports alone using only piano and loops. Conceived as silent listening close to sleep.',
    whyYou: 'Eno + minimalism + ADI Design Museum. Three of your aesthetic anchors compressed into ~50 minutes. Arrive 17:45 minimum.',
    isAlt: false,
  },
  {
    id: 'tigran',
    day: 'sun',
    dayLabel: 'Sun · 17 May',
    dayNumber: '03',
    dayTitle: 'Sunrise to Tigran',
    time: '22:00',
    duration: '~90 min',
    title: 'Tigran Hamasyan — Festival close',
    program: 'Armenian folk × jazz × prog rock × electronics',
    venue: 'GAM Main Stage',
    address: 'Via Palestro 18 · Zone 1',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=GAM+Galleria+d%27Arte+Moderna+Via+Palestro+16+Milano',
    badges: ['priority', 'walkin'],
    isStar: true,
    description: 'Born Gyumri 1987. Won Montreux Jazz piano competition at 16, Thelonious Monk International Jazz Piano at 17. Recorded for Nonesuch, ECM, Naïve. Latest project The Bird of a Thousand Voices (2024) — transmedia music-theatre with shadow play, programmed voices, premiered at Holland Festival. Praised by Herbie Hancock, Brad Mehldau, Chick Corea.',
    whyYou: 'The closing concert of the entire festival, and arguably the single most original pianist alive working at your favorite intersections: ancient folk, electronics, jazz harmony, prog structure. Arrive at GAM by 21:15.',
    isAlt: false,
  },
];

const alternatesData = [
  {
    id: 'alt-emelyanov',
    day: 'sat',
    time: '12:10',
    title: 'Konstantin Emelyanov — Rising Stars',
    venue: 'GAM Piano Giardino',
    booking: 'Free, walk-in',
    description: 'Imola Academy student in the GAM English garden — open-air mid-morning recital.',
    whyNot: 'Overlaps with Liszt marathon at Besana, and Liszt wins. Swap in if you skip Liszt and want a relaxed garden listen.',
  },
  {
    id: 'alt-faust',
    day: 'sat',
    time: '17:00',
    title: 'Liszt 140 — Faust Symphony (two pianos)',
    venue: 'Rotonda della Besana',
    booking: 'Free, walk-in',
    description: 'Gaston Polle Ansaldi & Matteo Chiambretto — two-piano arrangement of Liszt\'s Faust Symphony.',
    whyNot: 'Conflicts with Ji Liu Glass+Bowie. The Glass set wins. Swap in if you want a deep-Liszt day instead.',
  },
  {
    id: 'alt-aysedeniz',
    day: 'sat',
    time: '21:00',
    title: 'AyseDeniz — "Frozen In Time"',
    venue: 'GAM Main Stage',
    booking: 'Free, walk-in',
    description: 'Turkish-British contemporary pianist, GRAMMY voting member.',
    whyNot: 'Sits between Ji Liu and the Khalifés — adding it makes the day too dense. Swap in if Istanbul left a strong imprint.',
  },
  {
    id: 'alt-guarrera',
    day: 'sat',
    time: '17:00',
    title: 'Giuseppe Guarrera — Brendel tribute',
    venue: 'Teatro alla Scala, Ridotto dei Palchi',
    booking: 'Booking required',
    description: 'Brendel tribute inside La Scala\'s Ridotto dei Palchi — small, ornate, historic.',
    whyNot: 'Conflicts with Ji Liu. Swap in if playing inside La Scala matters more than Glass+Bowie.',
  },
  {
    id: 'alt-boccadoro',
    day: 'sun',
    time: '11:00',
    title: 'Carlo Boccadoro — "Italia-Germania 5-3"',
    venue: 'ADI Design Museum',
    booking: 'Check for booking',
    description: 'Italian-vs-German contemporary face-off: Stockhausen Klavierstücke IX, Lachenmann Guero, Henze, Silvia Colasanti, Boccadoro himself. Boccadoro is founder of Sentieri Selvaggi.',
    whyNot: 'Conflicts with Trabace. Swap in if you want a heavy contemporary morning at ADI (Stockhausen first, Eno same evening — deeply coherent contemporary day).',
  },
  {
    id: 'alt-martinelli',
    day: 'sun',
    time: '17:00',
    title: 'Daniele Martinelli — Schumann + Prokofiev',
    venue: 'Teatro alla Scala, Ridotto dei Palchi',
    booking: 'Booking required (~150 seats)',
    description: '2004-born Premio Venezia winner. Schumann Kreisleriana + Prokofiev Sarcasms in one of La Scala\'s most beautiful intimate rooms.',
    whyNot: 'Conflicts with Bof/Eno. The elegant alternative if you skip both — beautiful single anchor, total opposite to synthwave/ambient.',
  },
  {
    id: 'alt-conte',
    day: 'sun',
    time: '11:20',
    title: 'Davide Conte — Rising Stars',
    venue: 'GAM Piano Laghetto',
    booking: 'Free, walk-in',
    description: 'Rising Stars in the GAM English garden\'s lakeside pavilion. Outdoor mid-morning.',
    whyNot: 'Conflicts with Trabace. Swap in for a slower Sunday morning in the GAM gardens after the velodrome alba.',
  },
  {
    id: 'alt-gevisser',
    day: 'sun',
    time: '17:20',
    title: 'Leo Gevisser — "Son continu"',
    venue: 'GAM Piano Giardino',
    booking: 'Free, walk-in',
    description: 'Rising Stars open-air recital in the GAM English garden.',
    whyNot: 'Overlaps Bof + Eno. Swap in if you skip Bof and want a calm transitional concert before Eno.',
  },
  {
    id: 'alt-bacchetti',
    day: 'sun',
    time: '19:00',
    title: 'Andrea Bacchetti & Dado Moroni — "Two Pianos One Soul"',
    venue: 'GAM Main Stage',
    booking: 'Free, walk-in',
    description: 'Classical pianist meets jazz pianist. Bach, Schubert, Debussy on one side; Monk, Peterson, Bill Evans on the other.',
    whyNot: 'Sits between Eno and Tigran — physically tight. Swap in if you skip Eno and camp at GAM Sunday evening.',
  },
  {
    id: 'alt-horvitz',
    day: 'sun',
    time: '21:00',
    title: 'Wayne Horvitz',
    venue: 'GAM Main Stage',
    booking: 'Free, walk-in',
    description: 'Key figure of NY Downtown scene. Jazz / contemporary / experimental.',
    whyNot: 'Would chain three GAM sets back-to-back-to-back before Tigran. Too dense.',
  },
  {
    id: 'alt-rahman',
    day: 'sun',
    time: '20:00',
    title: 'Zoe Rahman',
    venue: 'GAM Main Stage',
    booking: 'Free, walk-in',
    description: 'British-Bengali jazz pianist with classical underpinnings, world-music palette.',
    whyNot: 'Same — sits in the GAM-camp window before Tigran.',
  },
  {
    id: 'alt-horvath',
    day: 'sun',
    time: '15:30',
    title: 'Nicolas Horvath — Assassin\'s Creed Piano Collection',
    venue: 'Torri bianche del Gratosoglio',
    booking: 'Check for booking',
    description: 'Game-soundtrack solo piano in the Gratosoglio social housing towers — strange, brilliantly chosen venue.',
    whyNot: 'Conflicts with Mashimo, and the Gratosoglio is far. Swap in if architectural-statement-venue beats Japanese pianist + palazzo.',
  },
];

const dayConfig = {
  thu: { number: '00', title: 'Prelude', label: 'Thu · 14 May', accent: '#E85478' },
  fri: { number: '01', title: 'Opening', label: 'Fri · 15 May', accent: '#E85478' },
  sat: { number: '02', title: 'Marathon', label: 'Sat · 16 May', accent: '#E85478' },
  sun: { number: '03', title: 'Catharsis', label: 'Sun · 17 May', accent: '#E85478' },
};

const badgeConfig = {
  priority: { label: '★ Priority', bg: '#E85478', color: '#fff' },
  walkin: { label: 'Free, walk-in', bg: 'transparent', color: '#C96830', border: '#C96830' },
  free: { label: 'Free', bg: 'transparent', color: '#C96830', border: '#C96830' },
  booking: { label: 'Booking required', bg: '#E85478', color: '#fff' },
  nolate: { label: 'No late entry', bg: '#F4F2CE', color: '#252518' },
  booked: { label: '✓ Already booked', bg: '#7A3018', color: '#fff' },
};

export default function PianoCityProgram() {
  const [activeDay, setActiveDay] = useState('all');
  const [going, setGoing] = useState({
    belli: true, animalia: true, pamart: true, liszt1: true, liszt2: true,
    jiliu: true, khalife: true, stegonaute: true, snorri: true, trabace: true,
    mashimo: true, bof: true, eno: true, tigran: true,
  });
  const [expanded, setExpanded] = useState({});
  const [showAlternatesFor, setShowAlternatesFor] = useState(null);
  const [swapped, setSwapped] = useState({});

  const toggleGoing = (id) => {
    setGoing(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredConcerts = useMemo(() => {
    return concertsData.filter(c => activeDay === 'all' || c.day === activeDay);
  }, [activeDay]);

  const goingCount = Object.values(going).filter(Boolean).length;
  const totalConcerts = concertsData.length;

  const getAlternatesForDay = (day) => alternatesData.filter(a => a.day === day);

  const concertsByDay = useMemo(() => {
    const grouped = { thu: [], fri: [], sat: [], sun: [] };
    filteredConcerts.forEach(c => grouped[c.day]?.push(c));
    return grouped;
  }, [filteredConcerts]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#252518',
      color: '#F4F2CE',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontWeight: 400,
      padding: '2rem 1rem 6rem',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .mono { font-family: 'JetBrains Mono', monospace; font-weight: 500; }
        .display { font-family: 'Fraunces', Georgia, serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        .concert-card { animation: fadeUp 0.4s ease-out backwards; }
        .heart-pulse { animation: pulse 0.4s ease; }
        button:focus-visible { outline: 2px solid #E85478; outline-offset: 2px; }
      `}</style>

      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ borderBottom: '1px solid rgba(244,242,206,0.25)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C96830', marginBottom: '1rem' }}>
            14 — 17 maggio 2026 · for Varia
          </div>
          <h1 className="display" style={{
            fontWeight: 600,
            fontSize: 'clamp(2.4rem, 8vw, 3.6rem)',
            lineHeight: 1.0,
            margin: 0,
            marginBottom: '0.8rem',
            letterSpacing: '-0.02em',
          }}>
            Piano City Milano<br />
            <em style={{ color: '#E85478', fontWeight: 500, fontStyle: 'italic' }}>Varia's pick choices</em>
          </h1>

          {/* Counter */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.7rem',
            marginTop: '1.2rem',
            paddingTop: '1rem',
            borderTop: '1px dashed rgba(244,242,206,0.2)',
          }}>
            <Heart size={16} style={{ color: '#E85478', fill: '#E85478' }} />
            <span className="mono" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: '#C96830' }}>
              GOING TO
            </span>
            <span className="display" style={{ fontSize: '2rem', fontWeight: 700, color: '#E85478', lineHeight: 1 }}>
              {goingCount}
            </span>
            <span className="mono" style={{ fontSize: '0.75rem', color: '#C96830' }}>
              of {totalConcerts}
            </span>
          </div>
        </header>

        {/* Day filter */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '0.4rem',
          WebkitOverflowScrolling: 'touch',
        }}>
          {[
            { key: 'all', label: 'All' },
            { key: 'thu', label: 'Thu' },
            { key: 'fri', label: 'Fri' },
            { key: 'sat', label: 'Sat' },
            { key: 'sun', label: 'Sun' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveDay(key)}
              className="mono"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.65rem 1.1rem',
                fontWeight: 600,
                background: activeDay === key ? '#F4F2CE' : 'transparent',
                color: activeDay === key ? '#252518' : '#F4F2CE',
                border: '1px solid rgba(244,242,206,0.4)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                fontWeight: 500,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Days */}
        {(['thu', 'fri', 'sat', 'sun']).map((day) => {
          const dayConcerts = concertsByDay[day];
          if (!dayConcerts || dayConcerts.length === 0) return null;
          const cfg = dayConfig[day];

          return (
            <section key={day} style={{ marginBottom: '3.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.8rem',
                borderBottom: '1px solid rgba(244,242,206,0.2)',
                paddingBottom: '0.5rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}>
                <span className="mono" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C96830' }}>
                  Day {cfg.number}
                </span>
                <span className="display" style={{ fontSize: '1.5rem', fontStyle: 'italic', flex: 1, minWidth: 0, fontWeight: 500 }}>
                  {cfg.title}
                </span>
                <span className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#C96830' }}>
                  {cfg.label}
                </span>
              </div>

              {dayConcerts.map((concert, idx) => {
                const isGoing = going[concert.id];
                const isExpanded = expanded[concert.id];
                const isSwappedOut = swapped[concert.id];

                return (
                  <div
                    key={concert.id}
                    className="concert-card"
                    style={{
                      animationDelay: `${idx * 0.05}s`,
                      marginBottom: '1.2rem',
                      background: isGoing ? 'rgba(232, 84, 120, 0.05)' : 'transparent',
                      border: isGoing ? '1px solid rgba(232, 84, 120, 0.35)' : '1px solid rgba(244,242,206,0.1)',
                      padding: '1.2rem',
                      transition: 'all 0.3s',
                      opacity: isSwappedOut ? 0.4 : 1,
                      position: 'relative',
                    }}
                  >
                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.6rem' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="mono" style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.2rem', color: '#F4F2CE' }}>
                          {concert.time} <span style={{ fontSize: '0.6rem', color: '#C96830', letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: '0.4rem' }}>{concert.duration}</span>
                        </div>
                        <h3 className="display" style={{
                          fontSize: '1.3rem',
                          fontWeight: 600,
                          margin: 0,
                          lineHeight: 1.2,
                          marginBottom: '0.3rem',
                        }}>
                          {concert.title}
                          {concert.isStar && <Star size={14} style={{ marginLeft: '0.4rem', color: '#E85478', fill: '#E85478' }} />}
                        </h3>
                        <p style={{ fontStyle: 'italic', color: '#E85478', fontSize: '0.95rem', margin: 0, marginBottom: '0.5rem', fontWeight: 500 }}>
                          {concert.program}
                        </p>
                      </div>

                      {/* Going button */}
                      <button
                        onClick={() => toggleGoing(concert.id)}
                        className={isGoing ? 'heart-pulse' : ''}
                        style={{
                          flexShrink: 0,
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: `1.5px solid ${isGoing ? '#F4F2CE' : 'rgba(244,242,206,0.35)'}`,
                          background: isGoing ? '#F4F2CE' : 'transparent',
                          color: isGoing ? '#252518' : 'rgba(244,242,206,0.5)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                        }}
                        aria-label={isGoing ? 'Remove from going' : 'Mark as going'}
                      >
                        {isGoing ? <Heart size={16} fill="currentColor" /> : <Heart size={16} />}
                      </button>
                    </div>

                    {/* Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.7rem' }}>
                      {concert.badges.map(b => {
                        const cfg = badgeConfig[b];
                        return (
                          <span
                            key={b}
                            className="mono"
                            style={{
                              fontSize: '0.55rem',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              padding: '0.25rem 0.5rem',
                              background: cfg.bg,
                              color: cfg.color,
                              border: cfg.border ? `1px solid ${cfg.border}` : `1px solid ${cfg.bg}`,
                              fontWeight: 500,
                            }}
                          >
                            {cfg.label}
                          </span>
                        );
                      })}
                    </div>

                    {/* Venue */}
                    <div className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: '#C96830', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                      <MapPin size={10} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                      <strong style={{ color: '#F4F2CE' }}>{concert.venue}</strong> · {concert.address}
                    </div>

                    {/* Map link */}
                    <a
                      href={concert.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono"
                      style={{
                        display: 'inline-block',
                        fontSize: '0.6rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#E85478',
                        textDecoration: 'none',
                        borderBottom: '1px dotted #E85478',
                        marginBottom: '0.7rem',
                      }}
                    >
                      ↗ Open in Maps
                    </a>

                    {/* Expand toggle */}
                    <button
                      onClick={() => toggleExpand(concert.id)}
                      className="mono"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        background: 'none',
                        border: 'none',
                        color: '#C96830',
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        padding: 0,
                        marginTop: '0.3rem',
                      }}
                    >
                      {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                      {isExpanded ? 'Less' : 'Why this one'}
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div style={{
                        marginTop: '0.8rem',
                        paddingTop: '0.8rem',
                        borderTop: '1px solid rgba(244,242,206,0.1)',
                        animation: 'fadeUp 0.3s ease',
                      }}>
                        <p style={{ fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '0.6rem', margin: 0, fontWeight: 400 }}>
                          {concert.description}
                        </p>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '0.95rem',
                          color: '#C96830',
                          borderLeft: '3px solid #E85478',
                          paddingLeft: '0.8rem',
                          marginTop: '0.7rem',
                          marginBottom: 0,
                          lineHeight: 1.55,
                          fontWeight: 500,
                        }}>
                          · {concert.whyYou}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Alternates toggle for this day */}
              {getAlternatesForDay(day).length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <button
                    onClick={() => setShowAlternatesFor(showAlternatesFor === day ? null : day)}
                    className="mono"
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      background: 'transparent',
                      border: '1px dashed #C96830',
                      color: '#C96830',
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,242,206,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <ArrowLeftRight size={12} />
                    {showAlternatesFor === day ? 'Hide alternates' : `${getAlternatesForDay(day).length} alternates considered`}
                  </button>

                  {showAlternatesFor === day && (
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                      {getAlternatesForDay(day).map((alt) => (
                        <div
                          key={alt.id}
                          style={{
                            background: '#1E1E12',
                            padding: '1rem',
                            borderLeft: '3px solid #C96830',
                            fontSize: '0.88rem',
                            animation: 'fadeUp 0.3s ease',
                          }}
                        >
                          <div className="mono" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#C96830', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                            {alt.time} · {alt.venue} · {alt.booking}
                          </div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 500, margin: 0, marginBottom: '0.4rem' }}>
                            {alt.title}
                          </h4>
                          <p style={{ margin: 0, marginBottom: '0.4rem', lineHeight: 1.5 }}>
                            {alt.description}
                          </p>
                          <p style={{
                            fontStyle: 'italic',
                            color: '#C96830',
                            fontSize: '0.82rem',
                            margin: 0,
                            paddingTop: '0.4rem',
                            borderTop: '1px solid rgba(244,242,206,0.1)',
                            lineHeight: 1.5,
                          }}>
                            <strong style={{ fontStyle: 'normal', color: '#F4F2CE' }}>Why not:</strong> {alt.whyNot}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}

        {/* Bof–Eno special note */}
        {(activeDay === 'all' || activeDay === 'sun') && (
          <div style={{
            marginTop: '2rem',
            background: 'rgba(232, 84, 120, 0.07)',
            borderLeft: '3px solid #E85478',
            padding: '1.2rem',
            fontSize: '0.92rem',
          }}>
            <div className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.6rem', fontWeight: 500 }}>
              ★ Big note · Bof + Eno
            </div>
            <p style={{ margin: 0, marginBottom: '0.5rem', lineHeight: 1.5 }}>
              You said: try both. Cozzi 17:00 → ADI 18:00 (no late entry). The plan: arrive Cozzi 16:30, watch ~30 min of Bof, leave by 17:35 absolute latest. Walk to Repubblica → M3 Centrale → M5 Monumentale (~15 min total). Arrive ADI ~18:00.
            </p>
            <p style={{ margin: 0, lineHeight: 1.5 }}>
              <strong>If you have to pick one: Eno.</strong> Music for Airports + ADI Design Museum is once-only. Bof can be a future Spotify session.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer style={{
          marginTop: '4rem',
          paddingTop: '2.5rem',
          borderTop: '1px solid rgba(244,242,206,0.25)',
          textAlign: 'center',
          fontStyle: 'italic',
          color: '#C96830',
        }}>
          <p className="display" style={{ margin: 0, marginBottom: '0.4rem', fontSize: '1.15rem', fontWeight: 500 }}>
            Four days. Twelve concerts. One sunrise.
          </p>
          <p style={{ margin: 0 }}>Set the 5 AM alarm.</p>
          <div className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1.5rem', color: '#F4F2CE' }}>
            — for Varia · may 2026
          </div>
        </footer>

      </div>
    </div>
  );
}
