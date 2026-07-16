const painPoints = [
    'Die Inflation entwertet Erspartes, während Tagesgeld und klassische Anlagen kaum Ausgleich bieten.',
    'Bankberatung wirkt unpersönlich und selten auf die eigene Situation zugeschnitten.',
    'Angebote im Netz sind schwer vergleichbar – welche Lage, welche Konditionen sind wirklich passend?',
    'Bei einer Investition in dieser Größenordnung will niemand eine Fehlentscheidung treffen.',
    'Für eine eigenständige Marktanalyse fehlt neben Beruf und Familie schlicht die Zeit.'
];

export function Problem() {
    return (
        <section className="flex flex-col gap-6">
            <h2>Kennen Sie das?</h2>
            <p className="max-w-2xl text-neutral-200">
                Viele angehende Kapitalanleger stehen vor denselben Fragen, bevor sie den ersten Schritt wagen.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
                {painPoints.map((point, index) => (
                    <li key={index} className="flex gap-3 p-4 rounded-sm bg-white/5">
                        <span className="text-primary" aria-hidden="true">
                            —
                        </span>
                        <span className="text-neutral-200">{point}</span>
                    </li>
                ))}
            </ul>
            <p className="max-w-2xl font-bold text-neutral-100">
                Was Sie sich stattdessen wünschen: Klarheit über Zahlen und Risiken, einen Ansprechpartner, der zuhört,
                und eine Entscheidung, mit der Sie ruhig schlafen können.
            </p>
        </section>
    );
}
