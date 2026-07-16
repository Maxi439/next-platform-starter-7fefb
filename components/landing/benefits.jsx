const benefits = [
    {
        title: 'Klarheit statt Fachchinesisch',
        text: 'Jede Kennzahl wird verständlich erklärt, bevor Sie eine Entscheidung treffen.'
    },
    {
        title: 'Ein fester Ansprechpartner',
        text: 'Sie sprechen während des gesamten Prozesses mit derselben Person – keine wechselnden Kontakte.'
    },
    {
        title: 'Geprüfte Lagen und Objekte',
        text: 'Keine Zufallsangebote, sondern eine Auswahl, die vorab auf Substanz geprüft wurde.'
    },
    {
        title: 'Strukturiertes Vorgehen',
        text: 'Analyse, Auswahl, Umsetzung und Betreuung folgen einem klaren, nachvollziehbaren Ablauf.'
    },
    {
        title: 'Steuerliche Aspekte eingeordnet',
        text: 'In Zusammenarbeit mit unabhängigen Steuerberatern ordnen wir relevante Aspekte für Sie ein.'
    },
    {
        title: 'Unverbindlicher Einstieg',
        text: 'Das Erstgespräch ist kostenlos und ohne jede Verpflichtung – Sie entscheiden in Ihrem Tempo.'
    }
];

export function Benefits() {
    return (
        <section className="flex flex-col gap-6">
            <h2>Warum sich der Weg über eine persönliche Beratung lohnt</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit) => (
                    <li key={benefit.title} className="flex flex-col gap-2 p-6 rounded-sm bg-white/5">
                        <h3>{benefit.title}</h3>
                        <p className="text-neutral-300">{benefit.text}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
