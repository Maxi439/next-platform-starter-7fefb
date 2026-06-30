import { CopyButton } from 'components/copy-button';

export const metadata = {
    title: 'MRE Setup-Guide — Instagram System'
};

const BIO_TEMPLATE = `Off-Market Immobilien | Deutschland
43+ Deals in Pipeline | Setter-Closer System
Kostenloses Gespräch buchen
Für Käufer & Verkäufer — Link unten`;

const phases = [
    {
        id: 0,
        title: 'Account Setup',
        subtitle: 'Bio, Profilbild, Links einrichten',
        duration: '2 Stunden',
        steps: [
            {
                heading: 'Business Account einrichten',
                items: [
                    'Einstellungen → Account → Zu professionellem Konto wechseln',
                    'Kategorie wählen: "Immobilien" oder "Finanzdienstleistungen"',
                    'Kontaktdaten hinterlegen: E-Mail, WhatsApp Business, Website',
                    'Instagram mit Facebook-Seite verknüpfen (für Ads später)',
                ],
            },
            {
                heading: 'Bio optimieren',
                bio: BIO_TEMPLATE,
                items: [
                    'Max. 150 Zeichen — jedes Wort muss arbeiten',
                    'Keywords: Off-Market, Immobilien, Deals, Setter-Closer',
                    'Harter CTA in letzter Zeile (Verben: buchen, schreiben, klicken)',
                    'Social Proof einbauen: konkrete Zahlen (43 Deals, 47 in Pipeline)',
                ],
            },
            {
                heading: 'Profilbild',
                items: [
                    'Professionelles Headshot — kein Logo, dein Gesicht',
                    'Neutraler oder weißer Hintergrund für maximale Klarheit',
                    'Kleidung: Business-Casual (kein Anzug, kein T-Shirt)',
                    'Bildgröße: mind. 320×320px, wird als Kreis angezeigt',
                ],
            },
            {
                heading: 'Link-in-Bio (Linktree)',
                items: [
                    'Link 1: Calendly-Termin (Kostenloses Erstgespräch)',
                    'Link 2: WhatsApp Business direkt',
                    'Link 3: Website / Landing Page',
                    'Link 4: "Ich bin Verkäufer" — separates Formular',
                ],
            },
            {
                heading: 'Highlights einrichten (5 Stück)',
                items: [
                    'Highlight 1: "Deals" — aktuelle Off-Market Deals',
                    'Highlight 2: "System" — wie Setter-Closer funktioniert',
                    'Highlight 3: "Team" — Kevin, Mehmet, du',
                    'Highlight 4: "FAQ" — häufigste Fragen',
                    'Highlight 5: "Testimonials" — Käufer/Verkäufer-Feedback',
                ],
            },
        ],
    },
    {
        id: 1,
        title: 'Content Pillars',
        subtitle: '5 thematische Fokus-Bereiche',
        duration: '1 Stunde Setup',
        steps: [
            {
                heading: 'Pillar 1 — Off-Market Deals (40%)',
                items: [
                    'Exklusive Deals die NICHT auf Immoscout/Kleinanzeigen stehen',
                    'Format: Reel mit Objekt-Details + Zahlen (Preis, Größe, Rendite)',
                    'CTA immer: "Schreib OFFMARKET in die Kommentare"',
                    '2 Reels/Woche aus diesem Pillar',
                ],
            },
            {
                heading: 'Pillar 2 — Setter-Closer Education (25%)',
                items: [
                    'Erkläre wie das System funktioniert — Transparenz schafft Vertrauen',
                    'Format: Talking-Head Reel, 30–60 Sekunden',
                    'Themen: Setter vs. Closer, Pipeline, Daily Workflow, Verdienst',
                    '1–2 Reels/Woche aus diesem Pillar',
                ],
            },
            {
                heading: 'Pillar 3 — Social Proof & Ergebnisse (15%)',
                items: [
                    'Konkrete Deal-Zahlen, Pipeline-Status, Testimonials',
                    'Format: Before/After, Success Story, Screenshot (anonymisiert)',
                    'Keine Übertreibung — echte Zahlen wirken stärker',
                    '1 Reel/Woche aus diesem Pillar',
                ],
            },
            {
                heading: 'Pillar 4 — Markt-Education (10%)',
                items: [
                    'Finanzierungstipps, Marktentwicklung, steuerliche Aspekte',
                    'Positioniert dich als Experte — nicht nur als Verkäufer',
                    'Format: Erklärvideo, Infografik-Reel, "Wusstest du?"-Format',
                    '0–1 Reel/Woche aus diesem Pillar',
                ],
            },
            {
                heading: 'Pillar 5 — Behind The Scenes (10%)',
                items: [
                    'Ein Tag als Setter, Team-Meeting, Deal-Besichtigung',
                    'Baut parasoziale Beziehung auf — Zuschauer fühlen dein Leben',
                    'Format: Day-in-Life, Vlog-Clips, spontane Stories',
                    '0–1 Reel/Woche aus diesem Pillar',
                ],
            },
        ],
    },
    {
        id: 2,
        title: '12-Wochen Content-Kalender',
        subtitle: 'Foundation → Growth → Scale',
        duration: '3 Phasen',
        steps: [
            {
                heading: 'Phase A: Foundation (Woche 1–4)',
                items: [
                    'Ziel: 200–500 Follower, Konsistenz aufbauen',
                    'Frequenz: 5 Reels/Woche (Mo, Di, Mi, Fr, Sa)',
                    'Fokus: Account bekannt machen, erste Leads generieren',
                    'Daily Stories: 3–5 Stories/Tag für Story-Algorithmus',
                    'Engagement: Täglich 30 Min. Kommentare auf relevanten Accounts',
                ],
            },
            {
                heading: 'Phase B: Growth (Woche 5–8)',
                items: [
                    'Ziel: 500–2.000 Follower, erste viralen Reels',
                    'Frequenz: 7–8 Reels/Woche',
                    'Strategie: Top-Performer aus Phase A replizieren + verbessern',
                    'Collaborations: 1–2 Collabs/Woche mit komplementären Accounts',
                    'Hashtag-Optimierung: Wechsle auf besser performende Tags',
                ],
            },
            {
                heading: 'Phase C: Scale (Woche 9–12)',
                items: [
                    'Ziel: 2.000–10.000 Follower',
                    'Frequenz: 10+ Reels/Woche (Team produziert mit)',
                    'Strategie: Viral-Formate skalieren, Setter produzieren Content',
                    'Optional: Instagram Ads auf Top-Performer (€5–15/Tag)',
                    'Kevin + Mehmet: jeweils 2 Reels/Woche beisteuern',
                ],
            },
        ],
    },
    {
        id: 3,
        title: 'Engagement-Strategie',
        subtitle: 'Comment Seeding, Follow-Back, Stories',
        duration: '30 Min./Tag',
        steps: [
            {
                heading: 'Comment Seeding (täglich 20 Min.)',
                items: [
                    'Target: Kommentare auf Accounts mit 10k–100k Followern in Immo-Nische',
                    'Accounts: @immoscout24, @baufi24, Finanzberater, Immo-Creator',
                    'Format: Mehrwert-Kommentar (nicht "nice post!") — mind. 2 Sätze',
                    'Ziel: Sichtbarkeit bei deren Followern → eigene Follower-Gewinne',
                ],
            },
            {
                heading: 'Hashtag-Strategie',
                items: [
                    'Mix: 10 kleine (< 50k Posts) + 10 mittlere + 10 große Tags',
                    'Immer nutzen: #offmarketimmobilien #immobilieninvestment #immobiliendeutschland',
                    'Wechsle 5–10 Tags pro Reel — Algorithmus bevorzugt Variation',
                    'Ort-Tags nutzen: Stadt + "Immobilien" (z.B. #berlinerimmobilien)',
                ],
            },
            {
                heading: 'Story-Engagement (täglich)',
                items: [
                    'Täglich mindestens 5 Stories posten (Algorithmus-Signal)',
                    'Wöchentlich: 1 Poll ("Makler oder Off-Market?"), 1 Q&A',
                    'Story-Replies beantworten innerhalb von 2 Stunden',
                    'Close Friends Liste: 50 heißeste Leads für exklusive Deals',
                ],
            },
        ],
    },
    {
        id: 4,
        title: 'DM-Automation Integration',
        subtitle: 'n8n + HubSpot + Calendly',
        duration: '4 Stunden Setup (einmalig)',
        steps: [
            {
                heading: 'Trigger-Wörter definieren',
                items: [
                    'OFFMARKET → Template A (Off-Market Interesse)',
                    'MATCH → Template B (Deal-Matching)',
                    'DEAL → Template C (Deal-Details)',
                    'SETTER / CLOSER → Template D (Recruiting)',
                    'INFO / FRAGE → Template E (Allgemein)',
                ],
            },
            {
                heading: 'Lead-Routing-Logik',
                items: [
                    'Käufer: → Matching-Formular → HubSpot Deal anlegen',
                    'Verkäufer: → Bewertungs-Call mit Calendly-Link',
                    'Team-Kandidat: → 15-Min-Screening-Call',
                    'Unbekannt: → Template E + manuelle Nachqualifizierung',
                ],
            },
            {
                heading: 'Automation-Stack',
                items: [
                    'n8n (Webhooks) → Empfängt Instagram DMs via Graph API',
                    'HubSpot → CRM: Lead anlegen, Pipeline pflegen',
                    'Calendly → Terminbuchung ohne Back-and-Forth',
                    'Telegram → Push-Notification bei heißen Leads',
                ],
            },
        ],
    },
    {
        id: 5,
        title: 'Analytics Dashboard',
        subtitle: 'Daily, Weekly, Monthly KPIs',
        duration: '15 Min./Tag',
        steps: [
            {
                heading: 'Tägliche KPIs (5 Min.)',
                items: [
                    'Story Views (Benchmark: > 10% deiner Follower)',
                    'Neue DM-Anfragen und Kommentare',
                    'Follower-Delta (Gewinn minus Verlust)',
                    'Reel Watch-Time > 50% (Algorithmus-Signal)',
                ],
            },
            {
                heading: 'Wöchentliche KPIs (10 Min., jeden Montag)',
                items: [
                    'Reichweite und Impressions pro Reel',
                    'Saves und Shares (höherwertig als Likes)',
                    'Profilbesuche und Link-Klicks',
                    'Lead-Qualität: Wie viele DMs wurden zu Terminen?',
                ],
            },
            {
                heading: 'Monatliche KPIs (30 Min., 1. des Monats)',
                items: [
                    'Follower-Wachstum vs. Plan (aus Phase 2)',
                    'Lead → Termin → Deal Conversion Rate',
                    'Cost-per-Lead (Zeit investiert / Leads generiert)',
                    'Top 3 Reels des Monats analysieren und skalieren',
                ],
            },
        ],
    },
    {
        id: 6,
        title: 'Algorithmus-Hacking',
        subtitle: 'Ranking-Faktoren & Optimierungen',
        duration: 'Laufend',
        steps: [
            {
                heading: 'Reel-Ranking-Faktoren (in Priorität)',
                items: [
                    '1. Watch-Time: Wie viel % schauen zu Ende? (Ziel: > 50%)',
                    '2. Saves: Werden Reels gespeichert? (wertvollstes Signal)',
                    '3. Shares: Wird dein Reel geteilt / per DM verschickt?',
                    '4. Comments: Echte Interaktion > Emoji-Kommentare',
                ],
            },
            {
                heading: 'Hook-Formeln (erste 3 Sekunden)',
                items: [
                    '"Zahle nicht X, bevor du das weißt…" (Neugier + Angst)',
                    '"Ich habe in X Wochen Y Deals gemacht — so:" (Proof)',
                    '"Der Fehler den 90% machen:" (Fehler-Pattern)',
                    '"Was Makler dir nicht sagen:" (Insider-Wissen)',
                ],
            },
            {
                heading: 'Posting-Timing',
                items: [
                    'Beste Zeiten: Di–Do, 08:00–10:00 Uhr und 18:00–20:00 Uhr',
                    'Story täglich um 07:30 posten (Morgen-Routine deiner Follower)',
                    'Niemals Reels unter 7 Sekunden — kein SEO-Indexing',
                    'Optimale Reel-Länge: 15–30 Sekunden (höchste Completion Rate)',
                ],
            },
        ],
    },
    {
        id: 7,
        title: 'Skalierung Playbook',
        subtitle: 'Monat 1, 2 & 3',
        duration: '3 Monate',
        steps: [
            {
                heading: 'Monat 1: Foundation (0 → 500 Follower)',
                items: [
                    'Fokus: Konsistenz etablieren, ersten Stil finden',
                    'Aufgabe: 5 Reels/Woche selbst drehen und editieren',
                    'Ziel: 10–20 Leads/Woche, 2–5 Termine, 1–2 erste Deals',
                    'Kevin + Mehmet: Learn the system, ersten Calls führen',
                ],
            },
            {
                heading: 'Monat 2: Growth (500 → 2.000 Follower)',
                items: [
                    'Fokus: Top-Performer skalieren, Collab-Strategie',
                    'Aufgabe: Kevin + Mehmet je 2 Reels/Woche übernehmen',
                    'Ziel: 30–50 Leads/Woche, 8–15 Termine, 3–5 Deals/Monat',
                    'DM-System läuft vollautomatisch, du fokussierst Abschlüsse',
                ],
            },
            {
                heading: 'Monat 3: Scale (2.000 → 10.000 Follower)',
                items: [
                    'Fokus: Viralen Content systematisch replizieren',
                    'Optional: €5–15/Tag Instagram Ads auf Top-Reels',
                    'Ziel: 120–200 Leads/Woche, 30–50 Termine, 15–30 Deals',
                    'Setter-Team auf 3–5 Personen ausbauen',
                ],
            },
        ],
    },
    {
        id: 8,
        title: 'Content-Produktion Setup',
        subtitle: 'Equipment, Software & Batching',
        duration: '1x/Woche Batch-Tag',
        steps: [
            {
                heading: 'Equipment-Liste (einmalig ~€110)',
                items: [
                    'Ring Light mit Stativ: €40–80 (Amazon, Neewer oder ähnlich)',
                    'Lavalier Mikrofon für Smartphone: €20–40 (RODE SmartLav+)',
                    'Smartphone-Halterung / Stativ-Adapter: €10–20',
                    'Optional: DJI Osmo Pocket für B-Roll: €250 (nicht Pflicht)',
                ],
            },
            {
                heading: 'Software-Stack (kostenlos / günstig)',
                items: [
                    'CapCut (Handy): Schnitt, Untertitel, Musik — kostenlos',
                    'Canva Pro (€15/Mo): Highlight-Cover, Story-Templates',
                    'InShot (Alternative zu CapCut): für schnelle Edits',
                    'Notion oder Google Sheets: Content-Kalender verwalten',
                ],
            },
            {
                heading: 'Batching-Workflow (jeden Donnerstag oder Freitag)',
                items: [
                    '09:00–10:00: Scripts lesen, Outfits wechseln, Licht aufbauen',
                    '10:00–12:00: 4–5 Reels in einem Take aufnehmen',
                    '12:00–14:00: CapCut-Schnitt, Untertitel, Musik hinzufügen',
                    '14:00–15:00: Thumbnails in Canva, Captions schreiben, vorplanen',
                ],
            },
        ],
    },
    {
        id: 9,
        title: 'Compliance & Legal',
        subtitle: 'Pflichten, DSGVO & Kennzeichnung',
        duration: '2 Stunden Setup',
        steps: [
            {
                heading: 'Impressumspflicht',
                items: [
                    'Gewerbliche Instagram-Accounts benötigen Impressum',
                    'Lösung: Link-in-Bio → Linktree → "Impressum" (Website-Seite)',
                    'Inhalt: Name, Adresse, E-Mail, Handelsregister (falls GmbH)',
                    'Empfehlung: eRecht24 Generator nutzen (kostenlos)',
                ],
            },
            {
                heading: 'DSGVO-Anforderungen',
                items: [
                    'WhatsApp Business: Datenschutz-Hinweis in erster Nachricht',
                    'HubSpot CRM: DSGVO-konform einrichten (EU-Server wählen)',
                    'Formulare: Opt-In mit Checkbox ("Ich stimme der Datenschutzrichtlinie zu")',
                    'Keine Fotos von Leads/Kunden ohne schriftliche Einwilligung',
                ],
            },
            {
                heading: 'Werbekennzeichnung',
                items: [
                    'Eigene Produkte / Dienstleistungen: "Anzeige" oder "#werbung" taggen',
                    'Bezahlte Kooperationen: Immer in der Caption kennzeichnen',
                    'Empfehlung ohne Bezahlung: Freiwillig kennzeichnen ("*Empfehlung")',
                    'Stand 2024: Medienstaatsvertrag gilt auch für Instagram',
                ],
            },
        ],
    },
    {
        id: 10,
        title: 'Monitoring & Optimization',
        subtitle: 'Weekly Review, A/B Testing, Pivot',
        duration: '30 Min./Woche',
        steps: [
            {
                heading: 'Weekly Review (jeden Montag morgen)',
                items: [
                    'Top 3 Reels der Woche identifizieren (nach Saves + Shares)',
                    'Bottom 2 analysieren: Hook? Länge? Thema? Was fehlte?',
                    'Nächste Woche: 2 Varianten des Top-Reels produzieren',
                    'Lead-Qualität: Wie viele DMs → Termine → Deals diese Woche?',
                ],
            },
            {
                heading: 'A/B Testing Protokoll',
                items: [
                    'Nur EINE Variable testen pro Test (Hook, Länge ODER Thema)',
                    'Mindestens 3 Tage Laufzeit vor Urteil',
                    'Benchmark: > 2x Durchschnittswerte = Winner',
                    'Winner replizieren, Loser verwerfen — keine emotionalen Entscheidungen',
                ],
            },
            {
                heading: 'Pivot-Signale erkennen',
                items: [
                    'Wenn 3 aufeinanderfolgende Reels unter Durchschnitt: Hook-Strategie ändern',
                    'Wenn DMs explodieren aber keine Terminbuchungen: DM-Template prüfen',
                    'Wenn Follower wachsen aber keine Leads: CTA zu schwach',
                    'Wenn Leads keine Deals: Closer-Training, nicht mehr Content',
                ],
            },
        ],
    },
];

function PhaseCard({ phase }) {
    return (
        <div className="border border-white/10 rounded-lg overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border-b border-white/10">
                <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {phase.id}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-primary mb-0.5">{phase.title}</h3>
                    <p className="text-sm text-white/40">{phase.subtitle}</p>
                </div>
                <div className="text-xs font-mono text-white/30 flex-shrink-0">{phase.duration}</div>
            </div>
            <div className="px-6 py-5 space-y-6">
                {phase.steps.map((step, i) => (
                    <div key={i}>
                        <h4 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">
                            {step.heading}
                        </h4>
                        {step.bio && (
                            <div className="mb-3 relative">
                                <pre className="p-4 rounded border border-primary/20 bg-primary/5 text-sm text-white/80 font-mono whitespace-pre-wrap leading-relaxed">
                                    {step.bio}
                                </pre>
                                <div className="absolute top-3 right-3">
                                    <CopyButton text={step.bio} label="Bio kopieren" />
                                </div>
                            </div>
                        )}
                        <ul className="space-y-2">
                            {step.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2.5 text-sm text-white/60">
                                    <span className="text-primary mt-1 flex-shrink-0">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                                            <circle cx="5" cy="5" r="3" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function SetupPage() {
    return (
        <div className="flex flex-col gap-10">
            <section>
                <div className="mb-3 text-xs font-mono tracking-widest uppercase text-primary">File #1</div>
                <h1 className="mb-4">Komplettes Setup-System</h1>
                <p className="text-lg text-white/60 max-w-2xl">
                    10 Phasen von Account-Erstellung bis zur Skalierung auf 10.000 Follower.
                    Befolge die Phasen in Reihenfolge — jede Phase baut auf der vorherigen auf.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                    {phases.map((p) => (
                        <a
                            key={p.id}
                            href={`#phase-${p.id}`}
                            className="px-3 py-1 text-xs rounded border border-white/20 bg-white/5 hover:border-primary/40 no-underline text-white/50 hover:text-white transition-colors"
                        >
                            Phase {p.id}
                        </a>
                    ))}
                </div>
            </section>

            <div className="flex flex-col gap-6">
                {phases.map((phase) => (
                    <div key={phase.id} id={`phase-${phase.id}`}>
                        <PhaseCard phase={phase} />
                    </div>
                ))}
            </div>
        </div>
    );
}
