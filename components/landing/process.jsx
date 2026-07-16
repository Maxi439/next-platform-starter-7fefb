const steps = [
    {
        number: '1',
        title: 'Kostenloses Erstgespräch',
        text: 'Wir klären Ihre Ziele, Ihre Ausgangslage und ob eine Immobilien-Kapitalanlage grundsätzlich zu Ihnen passt.'
    },
    {
        number: '2',
        title: 'Individuelle Analyse & Auswahl',
        text: 'Sie erhalten passende Optionen mit offen dargestellten Chancen und Risiken – verständlich aufbereitet.'
    },
    {
        number: '3',
        title: 'Begleitung bis zur Übergabe',
        text: 'Wir begleiten Finanzierung und Abwicklung und bleiben auch danach Ihr Ansprechpartner.'
    }
];

export function Process() {
    return (
        <section id="ablauf" className="flex flex-col gap-8 scroll-mt-8">
            <h2>So läuft die Zusammenarbeit ab</h2>
            <ol className="grid gap-6 sm:grid-cols-3">
                {steps.map((step) => (
                    <li key={step.number} className="flex flex-col gap-3 p-6 rounded-sm bg-white/5">
                        <span className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-primary text-primary-content">
                            {step.number}
                        </span>
                        <h3>{step.title}</h3>
                        <p className="text-neutral-300">{step.text}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
