import Link from 'next/link';

export const metadata = {
    title: 'MRE Instagram System'
};

const files = [
    {
        id: 1,
        href: '/instagram/setup',
        badge: 'START HIER',
        title: 'Komplettes Setup',
        subtitle: '10 Phasen: Von Bio bis 10k Follower',
        items: [
            'Phase 0: Account Setup (Bio, Profilbild, Links)',
            'Phase 1–2: Content Pillars & 12-Wochen-Kalender',
            'Phase 3–5: Engagement, DM & Analytics',
            'Phase 6–10: Algorithmus, Skalierung & Compliance',
        ],
    },
    {
        id: 2,
        href: '/instagram/reels',
        badge: null,
        title: 'Reel-Skripte',
        subtitle: '8 fertige Copy-Paste Konzepte',
        items: [
            'Reel #1: Finanzierungs-Vergleich (Makler vs. Off-Market)',
            'Reel #2: Setter vs. Closer Erklärvideo',
            'Reel #3–5: Quiz, Success Story, Fehler-Liste',
            'Reel #6–8: Day-in-Life, Deal-Showcase, Verkäufer-Appeal',
        ],
    },
    {
        id: 3,
        href: '/instagram/dm',
        badge: null,
        title: 'DM-Automation',
        subtitle: 'Vollständige DM → Termin Automation',
        items: [
            '7 Auto-Reply Templates (OFFMARKET, MATCH, DEAL…)',
            'n8n Workflow JSON (deploy-fähig)',
            'HubSpot + Calendly Integration',
            'Kosten: ~€30–50/Monat',
        ],
    },
    {
        id: 4,
        href: '/instagram/week1',
        badge: null,
        title: 'Woche 1 Checkliste',
        subtitle: 'Tag-für-Tag Umsetzungsplan (7 Tage)',
        items: [
            'Mo: Account Setup + CapCut + Reel #1 drehen',
            'Di: n8n deployen + Auto-Reply Templates',
            'Mi–Fr: Reels 2–3 + Analytics + Recruiting',
            'WE: Content Batching + Performance Review',
        ],
    },
];

const results = [
    { metric: 'Follower', w2: '50–100', w4: '200–300', w8: '1.500', w12: '5.000–10.000' },
    { metric: 'Leads / Woche', w2: '10–20', w4: '30–50', w8: '120–200', w12: '500–700' },
    { metric: 'Termine / Woche', w2: '2–5', w4: '8–15', w8: '30–50', w12: '60–100' },
    { metric: 'Deals / Monat', w2: '1–2', w4: '3–5', w8: '15–20', w12: '30–60' },
    { metric: 'Deal-Volumen', w2: '€50–150k', w4: '€200–400k', w8: '€1–1,5M', w12: '€2–4M+' },
];

const costs = [
    { item: 'Instagram Business Account', price: '€0' },
    { item: 'n8n (Self-Hosted) oder Zapier', price: '€0 / €20–30' },
    { item: 'HubSpot Free Plan', price: '€0' },
    { item: 'Calendly Pro', price: '€12/Mo' },
    { item: 'Linktree', price: '€0–10/Mo' },
    { item: 'CapCut Pro + Canva Pro', price: '€15/Mo' },
];

const successFactors = [
    { factor: 'Konsistenz', detail: '5x Reels pro Woche — nicht 2x' },
    { factor: 'Authentizität', detail: 'Dein Gesicht, nicht Stockfotos' },
    { factor: 'Direct Response', detail: 'Harte CTAs, nicht "Link in Bio"' },
    { factor: 'Automation', detail: 'DM-System läuft ohne dich' },
    { factor: 'Analytics', detail: 'Weekly Review + schnelle Anpassungen' },
    { factor: 'Team', detail: 'Kevin + Mehmet müssen das System verstehen' },
];

export default function InstagramPage() {
    return (
        <div className="flex flex-col gap-14">
            <section>
                <div className="mb-3 text-xs font-mono tracking-widest uppercase text-primary">
                    MRE Instagram System — 4 Files
                </div>
                <h1 className="mb-4">Instagram Playbook</h1>
                <p className="text-lg text-white/60 max-w-2xl">
                    Von Account-Setup bis zu 10.000 Followern, automatisierten DM-Leads und
                    30–60 Deals pro Monat. Alle 4 Dateien hier verfügbar.
                </p>
            </section>

            <section>
                <h2 className="mb-6">Die 4 Dateien</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {files.map((f) => (
                        <Link key={f.id} href={f.href} className="group no-underline">
                            <div className="h-full p-6 border border-white/10 rounded-lg bg-white/5 hover:border-primary/40 hover:bg-white/[0.07] transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-mono text-white/30">FILE #{f.id}</span>
                                    {f.badge && (
                                        <span className="px-2 py-0.5 text-xs font-bold bg-primary text-primary-content rounded">
                                            {f.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="mb-1 text-primary">{f.title}</h3>
                                <p className="mb-4 text-sm text-white/50">{f.subtitle}</p>
                                <ul className="space-y-1.5">
                                    {f.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-white/40">
                                            <span className="text-primary/60 mt-0.5 flex-shrink-0">—</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="mb-6">Erwartete Ergebnisse — 12 Wochen</h2>
                <div className="overflow-x-auto -mx-1">
                    <table className="w-full text-sm min-w-[480px]">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 pr-4 font-medium text-white/40">Metrik</th>
                                <th className="text-right py-3 px-4 font-medium text-white/40">Woche 2</th>
                                <th className="text-right py-3 px-4 font-medium text-white/40">Woche 4</th>
                                <th className="text-right py-3 px-4 font-medium text-white/40">Woche 8</th>
                                <th className="text-right py-3 pl-4 font-medium text-primary">Woche 12</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((row, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 pr-4 font-medium">{row.metric}</td>
                                    <td className="py-3 px-4 text-right text-white/50">{row.w2}</td>
                                    <td className="py-3 px-4 text-right text-white/60">{row.w4}</td>
                                    <td className="py-3 px-4 text-right text-white/70">{row.w8}</td>
                                    <td className="py-3 pl-4 text-right font-semibold text-primary">{row.w12}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="grid gap-8 sm:grid-cols-2">
                <section>
                    <h2 className="mb-6">Investment & Kosten</h2>
                    <div className="space-y-2">
                        {costs.map((c, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-white/60">{c.item}</span>
                                <span className="text-sm font-mono font-medium text-primary">{c.price}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center py-3 border-t border-white/20 mt-2">
                            <span className="font-semibold">Total laufend</span>
                            <span className="font-mono font-bold text-primary">~€50–60/Mo</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-white/60">Equipment (einmalig)</span>
                            <span className="text-sm font-mono text-white/70">~€100–150</span>
                        </div>
                        <div className="mt-4 p-3 rounded border border-primary/30 bg-primary/5 text-sm">
                            <span className="text-white/60">Payback Period: </span>
                            <span className="font-bold text-primary">unter 1 Woche</span>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="mb-6">Critical Success Factors</h2>
                    <div className="space-y-3">
                        {successFactors.map((s, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {i + 1}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold">{s.factor}</div>
                                    <div className="text-xs text-white/40">{s.detail}</div>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 p-3 rounded border border-yellow-500/30 bg-yellow-500/5 text-xs text-yellow-300/80">
                            Wenn eines fehlt, sinkt das Ergebnis um 50–70%
                        </div>
                    </div>
                </section>
            </div>

            <section>
                <h2 className="mb-6">Quick Start — Wenn du ungeduldig bist</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        {
                            label: 'Heute (2h)',
                            steps: [
                                'File #1 Phase 0–1 lesen',
                                'Account Setup-Checkliste abhaken',
                                '3 beste Reels aus File #2 auswählen',
                            ],
                        },
                        {
                            label: 'Morgen (2h)',
                            steps: [
                                'n8n Account + HubSpot Setup',
                                'Erstes Reel-Script ausarbeiten',
                                'Team-Meeting mit Kevin / Mehmet',
                            ],
                        },
                        {
                            label: 'Montag — Go-Live',
                            steps: [
                                'Reel #1 drehen (15–30 Min)',
                                'In CapCut editieren (45 Min)',
                                'Publishen um 9:00 Uhr — System läuft',
                            ],
                        },
                    ].map((block, i) => (
                        <div key={i} className="p-5 border border-white/10 rounded-lg bg-white/5">
                            <div className="text-xs font-mono text-primary uppercase tracking-wider mb-3">
                                {block.label}
                            </div>
                            <ol className="space-y-2">
                                {block.steps.map((s, j) => (
                                    <li key={j} className="flex gap-2 text-sm text-white/60">
                                        <span className="text-primary font-bold flex-shrink-0">{j + 1}.</span>
                                        {s}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </section>

            <div className="p-6 border border-primary/30 rounded-lg bg-primary/5 text-center">
                <p className="text-lg font-bold mb-4">Du hast alles was du brauchst.</p>
                <Link href="/instagram/week1" className="btn btn-lg">
                    Jetzt starten — Woche 1 Checkliste
                </Link>
            </div>
        </div>
    );
}
