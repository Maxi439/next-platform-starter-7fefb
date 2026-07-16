const trustPoints = [
    'Persönliche Betreuung durch einen festen Ansprechpartner',
    'Regionale Marktkenntnis statt anonymer Massenangebote',
    'Transparente, nachvollziehbare Abläufe von Anfang an',
    'Zusammenarbeit mit unabhängigen Steuerberatern und Finanzierungspartnern',
    'Klare Kommunikation – ohne Verkaufsdruck und ohne Zeitdruck',
    'Rechtlich saubere und sorgfältig geprüfte Prozesse'
];

export function Trust() {
    return (
        <section className="flex flex-col gap-6 p-6 rounded-sm sm:p-10 bg-white/5">
            <h2>Worauf Sie sich verlassen können</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
                {trustPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                        <span className="text-primary" aria-hidden="true">
                            ✓
                        </span>
                        <span className="text-neutral-200">{point}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
