import Link from 'next/link';
import { Card } from 'components/card';

export const metadata = {
    title: 'Preise'
};

const packages = [
    {
        name: 'Selbstlauf',
        price: 'Kostenlos',
        description: 'Das komplette 12-Wochen-Programm im eigenen Tempo, mit persönlichem Fortschritts-Dashboard.',
        features: [
            'Zugang zu allen 5 Phasen & Aufgaben',
            'Persönliches Dashboard mit Fortschritt',
            'Tägliches Energie-Tagebuch',
            'Motivierender Impuls des Tages'
        ],
        cta: { label: 'Kostenlos starten', href: '/registrieren' }
    },
    {
        name: 'Begleitet',
        price: 'auf Anfrage',
        highlight: true,
        description: 'Das Selbstlauf-Programm plus persönliche 1:1-Begleitung im wöchentlichen Rhythmus.',
        features: [
            'Alles aus "Selbstlauf"',
            'Wöchentliches 1:1-Gespräch (45 Min.)',
            'Individuelle Anpassung der Übungen',
            'Direkter Austausch zwischen den Terminen'
        ],
        cta: { label: 'Erstgespräch anfragen', href: '/kontakt' }
    },
    {
        name: 'Intensiv',
        price: 'auf Anfrage',
        description: 'Für besonders herausfordernde Phasen: engmaschige Begleitung mit zusätzlichem Support.',
        features: [
            'Alles aus "Begleitet"',
            'Zwei Gespräche pro Woche',
            'Priorisierter Support zwischen Terminen',
            'Individueller Rückfallplan'
        ],
        cta: { label: 'Erstgespräch anfragen', href: '/kontakt' }
    }
];

export default function PreisePage() {
    return (
        <div className="flex flex-col gap-12 pb-24">
            <section className="flex flex-col gap-4">
                <h1>Preise</h1>
                <p className="max-w-2xl text-lg text-neutral-300">
                    Starte kostenlos mit dem Selbstlauf-Programm oder lass dich zusätzlich persönlich begleiten. Alle
                    kostenpflichtigen Pakete besprechen wir individuell in einem unverbindlichen Erstgespräch.
                </p>
            </section>

            <section className="grid gap-6 sm:grid-cols-3">
                {packages.map((pkg) => (
                    <Card key={pkg.name} className={pkg.highlight ? 'ring-2 ring-primary' : undefined}>
                        <h3 className="text-neutral-900">{pkg.name}</h3>
                        <p className="text-2xl font-bold text-neutral-900">{pkg.price}</p>
                        <p>{pkg.description}</p>
                        <ul className="flex flex-col gap-2 text-sm">
                            {pkg.features.map((feature) => (
                                <li key={feature} className="flex gap-2">
                                    <span aria-hidden="true">✓</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href={pkg.cta.href} className="btn mt-2">
                            {pkg.cta.label}
                        </Link>
                    </Card>
                ))}
            </section>

            <section className="flex flex-col gap-2">
                <h2>Fragen zur Finanzierung?</h2>
                <p className="max-w-2xl text-neutral-300">
                    Energie und finanzielle Möglichkeiten hängen oft zusammen. Sprich mich gerne im Erstgespräch
                    offen darauf an – wir finden gemeinsam eine passende Lösung.
                </p>
            </section>
        </div>
    );
}
