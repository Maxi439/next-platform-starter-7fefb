import { CopyButton } from 'components/copy-button';

export const metadata = {
    title: 'DM-Automation — MRE Instagram System'
};

const templates = [
    {
        id: 'A',
        name: 'OFFMARKET',
        trigger: 'Kommentar oder DM enthält: "OFFMARKET"',
        useCase: 'Käufer mit Off-Market Interesse',
        delay: 'Sofort (< 60 Sek.)',
        text: `Hey {{Vorname}}! Danke für dein Interesse.

Unser Off-Market System kurz erklärt:
Wir haben direkten Zugang zu Verkäufern, die NICHT öffentlich inserieren. Bedeutet für dich:

— Keine Maklerprovision
— 15–25% unter Marktwert
— Exklusive Deals bevor sie öffentlich werden

Damit ich prüfen kann ob du in unser Netzwerk passt, kurz zwei Fragen:

1. Wie groß ist dein Budget (z.B. 200–500k€)?
2. In welcher Region suchst du (z.B. NRW, Bayern, Berlin)?

Dann schau ich direkt nach was gerade für dich passt.`,
    },
    {
        id: 'B',
        name: 'MATCH',
        trigger: 'Kommentar oder DM enthält: "MATCH" oder "matching"',
        useCase: 'Deal-Matching Anfrage',
        delay: 'Sofort (< 60 Sek.)',
        text: `Hi {{Vorname}}! Super, dass du Interesse am Deal-Matching hast.

Wir verbinden Käufer direkt mit qualifizierten Verkäufern — ohne öffentliches Inserat, ohne Bieterverfahren.

Für das Matching brauche ich kurz drei Angaben:

1. Budget: z.B. 200–500k€
2. Region: z.B. NRW, Bayern, Hamburg
3. Zweck: Eigennutz oder Investment?

Schreib mir die Antworten hier direkt — dann check ich unser aktuelles Portfolio für dich!`,
    },
    {
        id: 'C',
        name: 'DEAL',
        trigger: 'DM nach Deal-Showcase Reel oder enthält "DEAL"',
        useCase: 'Spezifisches Deal-Interesse',
        delay: 'Sofort (< 60 Sek.)',
        text: `Hey! Danke für dein Interesse an diesem Deal.

Dieser spezifische Deal ist {{status: "noch verfügbar / bereits vergeben"}}.

Keine Sorge — wir haben regelmäßig neue Off-Market Deals in Deutschland.

Damit ich dich informiere sobald der nächste passende Deal kommt:

— Dein Budget?
— Welche Region?
— Bis wann möchtest du kaufen?

Dauert 2 Minuten — spart dir Wochen der Suche.`,
    },
    {
        id: 'D',
        name: 'SETTER',
        trigger: 'Kommentar oder DM enthält: "SETTER" oder "CLOSER" oder "TEAM"',
        useCase: 'Recruiting Anfrage',
        delay: 'Sofort (< 60 Sek.)',
        text: `Hi {{Vorname}}! Klasse, dass du dich für das Team interessierst.

Bei uns verdienen Top-Setter 3.000–8.000€ pro Monat durch Provisionen.

Was du mitbringst:
— Kommunikationsstark (schriftlich + telefonisch)
— Hungrig und eigenmotiviert
— Vollzeit oder Teilzeit — beides möglich
— Erfahrung im Vertrieb von Vorteil, aber kein Muss

Nächster Schritt: 15-minütiges Screening-Gespräch mit mir.

Hier Termin buchen: {{CALENDLY_LINK}}

Freue mich auf das Gespräch!`,
    },
    {
        id: 'E',
        name: 'INFO',
        trigger: 'DM enthält: "INFO" oder allgemeine Anfrage ohne Keyword',
        useCase: 'Allgemeine Infoanfrage',
        delay: '< 5 Minuten',
        text: `Hi {{Vorname}}! Gerne erkläre ich dir unser System.

Kurz zusammengefasst: Wir sind ein Off-Market Immobilien-Netzwerk.

Setter qualifizieren Leads → Closer führen Abschluss-Calls → Deals werden direkt abgewickelt.

Für Käufer: exklusive Deals unter Marktwert, keine Provision.
Für Verkäufer: diskrete, schnelle Abwicklung ohne öffentliches Inserat.
Für Teammitglieder: Provision-basiertes Einkommen als Setter oder Closer.

Was interessiert dich genau?

A) Ich möchte kaufen
B) Ich möchte verkaufen
C) Ich möchte dem Team beitreten

Schreib einfach A, B oder C.`,
    },
    {
        id: 'F',
        name: 'CALLBACK',
        trigger: 'DM enthält: "CALLBACK", "Rückruf" oder "anrufen"',
        useCase: 'Rückruf-Wunsch',
        delay: 'Sofort (< 60 Sek.)',
        text: `Hey {{Vorname}}! Natürlich melde ich mich bei dir.

Damit ich optimal vorbereitet bin, kurz zwei Fragen:

1. Was ist dein Hauptthema?
   (Kaufinteresse / Verkaufsinteresse / Team beitreten / Anderes)

2. Wann bist du am besten erreichbar?
   (Morgen früh 8–10h / Mittags 12–14h / Abends 17–19h)

Alternativ: Hier direkt Termin buchen — dann brauchst du nicht warten:
{{CALENDLY_LINK}}

Bis gleich!`,
    },
    {
        id: 'G',
        name: 'FOLLOWUP',
        trigger: 'Automatisch: keine Antwort nach 72 Stunden',
        useCase: 'Re-Engagement alter Leads',
        delay: '72 Stunden nach letzter Nachricht',
        text: `Hey {{Vorname}}, wollte kurz nachhaken.

Hast du die Infos zu unserem Off-Market System angeschaut?

Falls du noch Fragen hast oder ein kurzes Gespräch willst — ich bin da. Einfach zurückschreiben oder hier direkt Termin buchen:
{{CALENDLY_LINK}}

Viele Grüße!`,
    },
];

const n8nWorkflow = `{
  "name": "MRE Instagram DM Automation",
  "nodes": [
    {
      "name": "Instagram DM Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "instagram-dm",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Keyword Router",
      "type": "n8n-nodes-base.switch",
      "parameters": {
        "dataPropertyName": "={{ $json.message.text.toUpperCase() }}",
        "rules": [
          { "value": "OFFMARKET", "output": 0 },
          { "value": "MATCH", "output": 1 },
          { "value": "DEAL", "output": 2 },
          { "value": "SETTER", "output": 3 },
          { "value": "CLOSER", "output": 3 },
          { "value": "TEAM", "output": 3 },
          { "value": "CALLBACK", "output": 5 },
          { "value": "RÜCKRUF", "output": 5 }
        ],
        "fallbackOutput": 4
      }
    },
    {
      "name": "Send Template A (OFFMARKET)",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://graph.facebook.com/v18.0/me/messages",
        "method": "POST",
        "body": {
          "recipient": { "id": "={{ $json.sender.id }}" },
          "message": { "text": "Hey {{Vorname}}! [Template A Text...]" }
        }
      }
    },
    {
      "name": "Create HubSpot Lead",
      "type": "n8n-nodes-base.hubspot",
      "parameters": {
        "resource": "contact",
        "operation": "create",
        "additionalFields": {
          "instagramId": "={{ $json.sender.id }}",
          "leadSource": "Instagram DM",
          "leadType": "={{ $node['Keyword Router'].json.keyword }}"
        }
      }
    },
    {
      "name": "Telegram Notification (heißer Lead)",
      "type": "n8n-nodes-base.telegram",
      "parameters": {
        "chatId": "YOUR_TELEGRAM_CHAT_ID",
        "text": "Neuer Lead: {{ $json.sender.id }} — Keyword: {{ $json.keyword }}"
      }
    }
  ]
}`;

const integrations = [
    {
        name: 'n8n',
        role: 'Workflow Automation',
        setup: 'cloud.n8n.io oder self-hosted (Docker)',
        cost: '€0 self-hosted / €20/Mo Cloud',
        steps: [
            'Account erstellen auf cloud.n8n.io',
            'Instagram-Webhook konfigurieren',
            'Workflow-JSON importieren (unten)',
            'Keyword-Routen testen',
        ],
    },
    {
        name: 'HubSpot',
        role: 'CRM & Lead-Management',
        setup: 'app.hubspot.com (Free Plan reicht)',
        cost: '€0 (Free Plan)',
        steps: [
            'Account erstellen, Pipeline "Instagram Leads" anlegen',
            'Stages: Neu → Qualifiziert → Termin → Deal → Closed',
            'n8n HubSpot-Node mit API-Key verbinden',
            'Lead-Eigenschaften: Budget, Region, Keyword, Quelle',
        ],
    },
    {
        name: 'Calendly',
        role: 'Terminbuchung',
        setup: 'calendly.com',
        cost: '€12/Mo (Pro Plan für Team-Kalender)',
        steps: [
            'Pro Plan aktivieren (für Team-Buchungen)',
            'Event "15-Min Screening" erstellen',
            'Event "30-Min Abschluss-Call" erstellen',
            'Links in alle DM-Templates einbauen',
        ],
    },
    {
        name: 'Telegram Bot',
        role: 'Push-Notifications für heiße Leads',
        setup: '@BotFather auf Telegram',
        cost: '€0',
        steps: [
            'Neuen Bot bei @BotFather anlegen',
            'Bot-Token in n8n Telegram-Node eintragen',
            'Chat-ID deines persönlichen Chats eintragen',
            'Trigger: Leads mit Budget > €500k oder SETTER-Keyword',
        ],
    },
];

function TemplateCard({ tmpl }) {
    return (
        <div className="border border-white/10 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold flex items-center justify-center">
                            {tmpl.id}
                        </span>
                        <h3 className="text-primary">Template {tmpl.id} — {tmpl.name}</h3>
                    </div>
                    <p className="text-xs text-white/40 ml-11">{tmpl.useCase}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded border border-white/10 text-white/30 flex-shrink-0">
                    {tmpl.delay}
                </span>
            </div>
            <div className="px-6 py-5 space-y-4">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/30 block mb-1">Trigger</span>
                    <span className="text-sm text-white/60 font-mono">{tmpl.trigger}</span>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/30">Nachricht</span>
                        <CopyButton text={tmpl.text} label="Template kopieren" />
                    </div>
                    <pre className="p-4 rounded bg-white/5 border border-white/10 text-sm text-white/70 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto">
                        {tmpl.text}
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default function DmPage() {
    return (
        <div className="flex flex-col gap-12">
            <section>
                <div className="mb-3 text-xs font-mono tracking-widest uppercase text-primary">File #3</div>
                <h1 className="mb-4">DM-Automation System</h1>
                <p className="text-lg text-white/60 max-w-2xl">
                    7 Auto-Reply Templates + n8n Workflow für vollautomatische DM-zu-Termin Konvertierung.
                    Setup einmal — System läuft 24/7.
                </p>
            </section>

            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2>7 Auto-Reply Templates</h2>
                    <span className="text-xs text-white/30 font-mono">
                        {'{{Vorname}}'} = wird automatisch ersetzt
                    </span>
                </div>
                <div className="flex flex-col gap-6">
                    {templates.map((t) => (
                        <TemplateCard key={t.id} tmpl={t} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="mb-6">n8n Workflow JSON</h2>
                <p className="mb-4 text-sm text-white/50">
                    Kopiere diesen Workflow, öffne n8n → Workflow importieren → JSON einfügen.
                    Dann Platzhalter (API-Keys, Calendly-Link, Chat-ID) ersetzen.
                </p>
                <div className="relative">
                    <div className="absolute top-3 right-3 z-10">
                        <CopyButton text={n8nWorkflow} label="JSON kopieren" />
                    </div>
                    <pre className="p-5 rounded-lg bg-neutral-900/80 border border-white/10 text-xs text-green-300/80 whitespace-pre-wrap overflow-x-auto leading-relaxed font-mono">
                        {n8nWorkflow}
                    </pre>
                </div>
                <p className="mt-3 text-xs text-white/30">
                    Vollständiger Workflow inkl. alle Templates: n8n importieren, Templates A–G in die
                    entsprechenden HTTP-Nodes eintragen.
                </p>
            </section>

            <section>
                <h2 className="mb-6">Integrationen & Setup</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {integrations.map((integration) => (
                        <div key={integration.name} className="p-5 border border-white/10 rounded-lg bg-white/5">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-primary">{integration.name}</h3>
                                <span className="text-xs font-mono text-white/40">{integration.cost}</span>
                            </div>
                            <p className="text-xs text-white/40 mb-1">{integration.role}</p>
                            <p className="text-xs font-mono text-white/30 mb-4">{integration.setup}</p>
                            <ol className="space-y-1.5">
                                {integration.steps.map((step, i) => (
                                    <li key={i} className="flex gap-2 text-sm text-white/60">
                                        <span className="text-primary font-bold flex-shrink-0 text-xs mt-0.5">{i + 1}.</span>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="mb-4">Kosten-Übersicht</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-2 pr-4 text-white/40 font-medium">Tool</th>
                                <th className="text-left py-2 px-4 text-white/40 font-medium">Funktion</th>
                                <th className="text-right py-2 pl-4 text-white/40 font-medium">Kosten/Mo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { tool: 'n8n (Self-Hosted)', fn: 'Workflow Automation', cost: '€0' },
                                { tool: 'HubSpot Free', fn: 'CRM + Lead-Tracking', cost: '€0' },
                                { tool: 'Calendly Pro', fn: 'Terminbuchung', cost: '€12' },
                                { tool: 'Telegram Bot', fn: 'Push-Notifications', cost: '€0' },
                                { tool: 'VPS für n8n', fn: 'Hosting (z.B. Hetzner CX11)', cost: '€4–6' },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-white/5">
                                    <td className="py-2 pr-4 font-medium">{row.tool}</td>
                                    <td className="py-2 px-4 text-white/50">{row.fn}</td>
                                    <td className="py-2 pl-4 text-right font-mono text-primary">{row.cost}</td>
                                </tr>
                            ))}
                            <tr className="border-t border-white/20">
                                <td colSpan={2} className="py-3 font-bold">Total</td>
                                <td className="py-3 text-right font-bold font-mono text-primary">€16–18/Mo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mt-3 text-xs text-white/30">
                    Mit n8n Cloud statt self-hosted: +€20/Mo → ca. €36–38/Mo gesamt.
                </p>
            </section>
        </div>
    );
}
