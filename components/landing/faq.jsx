const faqs = [
    {
        question: 'Wie hoch ist das Risiko bei einer Immobilien-Kapitalanlage?',
        answer: 'Wie jede Kapitalanlage ist auch eine Immobilie mit Chancen und Risiken verbunden – eine Rendite- oder Wertentwicklungsgarantie gibt es nicht. Im Erstgespräch ordnen wir Chancen und Risiken für Ihre konkrete Situation offen ein, damit Sie auf dieser Basis entscheiden können.'
    },
    {
        question: 'Wie lange ist mein Kapital gebunden?',
        answer: 'Immobilien sind grundsätzlich langfristig angelegte Sachwerte. Wie lang Ihr Kapital im Einzelfall gebunden ist, hängt von Finanzierung und persönlicher Strategie ab und besprechen wir individuell mit Ihnen.'
    },
    {
        question: 'Wie läuft die Zusammenarbeit konkret ab?',
        answer: 'Auf ein kostenloses, unverbindliches Erstgespräch folgt eine individuelle Analyse mit passenden Optionen. Erst wenn Sie sich für einen Schritt entscheiden, begleiten wir Sie bei Finanzierung und Abwicklung.'
    },
    {
        question: 'Für wen eignet sich diese Beratung?',
        answer: 'Angesprochen sind Anleger, die Vermögen strukturiert aufbauen oder absichern möchten. Ob eine Immobilien-Kapitalanlage zu Ihrer individuellen Situation passt, prüfen wir gemeinsam im Erstgespräch.'
    },
    {
        question: 'Wie transparent sind Kosten und Konditionen?',
        answer: 'Alle Kosten und Konditionen legen wir vor einer Entscheidung offen und verständlich dar – ohne versteckte Positionen.'
    },
    {
        question: 'Ist die Erstberatung wirklich kostenlos und unverbindlich?',
        answer: 'Ja. Das Erstgespräch dient dem gegenseitigen Kennenlernen und der Klärung Ihrer Ausgangslage – ohne Kosten und ohne Verpflichtung zu einem weiteren Schritt.'
    }
];

export function Faq() {
    return (
        <section id="faq" className="flex flex-col gap-6 scroll-mt-8">
            <h2>Häufige Fragen</h2>
            <div className="flex flex-col gap-3">
                {faqs.map((faq) => (
                    <details key={faq.question} className="p-4 rounded-sm group bg-white/5">
                        <summary className="font-bold cursor-pointer list-none marker:content-none">
                            <span className="inline-flex items-center justify-between w-full gap-4">
                                {faq.question}
                                <span className="text-primary group-open:rotate-45" aria-hidden="true">
                                    +
                                </span>
                            </span>
                        </summary>
                        <p className="mt-3 text-neutral-300">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
