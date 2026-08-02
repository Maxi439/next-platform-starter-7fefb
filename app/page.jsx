import Link from 'next/link';
import { Card } from 'components/card';
import { PhaseCard } from 'components/phase-card';
import { PHASES } from 'data/program';

const symptoms = [
    'Du stehst morgens schon müde auf, egal wie viel du geschlafen hast.',
    'Kleine Aufgaben fühlen sich an wie große Berge.',
    'Du funktionierst, aber irgendwie nicht mehr richtig für dich.',
    'Motivation kommt und geht – meistens geht sie schneller, als sie kam.'
];

const steps = [
    {
        title: 'Ankommen',
        text: 'Im kostenlosen Erstgespräch schauen wir gemeinsam, wo du gerade stehst – ohne Druck, ohne Bewertung.'
    },
    {
        title: 'Aufbauen',
        text: 'In 12 Wochen durchläufst du 5 aufeinander aufbauende Phasen, begleitet von deinem persönlichen Dashboard.'
    },
    {
        title: 'Tragen',
        text: 'Am Ende hast du kein kurzfristiges Motivationshoch, sondern ein Mindset, das auch an schwachen Tagen trägt.'
    }
];

const testimonials = [
    {
        quote:
            'Ich dachte, ich brauche einfach mehr Schlaf. Tatsächlich brauchte ich ein anderes Mindset – und die kleinen Schritte, die ich mir zugetraut habe.',
        name: 'Julia, 34'
    },
    {
        quote: 'Zum ersten Mal seit Jahren habe ich das Gefühl, dass mein Alltag zu mir passt und nicht umgekehrt.',
        name: 'Markus, 41'
    },
    {
        quote: 'Kein "Reiß dich zusammen", sondern echte, machbare Schritte. Genau das habe ich gebraucht.',
        name: 'Sofia, 29'
    }
];

export const metadata = {
    title: 'Mindset-Coaching für neue Energie'
};

export default function HomePage() {
    return (
        <div className="flex flex-col gap-24 pb-24 sm:gap-32">
            <section className="flex flex-col items-start gap-6">
                <p className="font-bold tracking-wide uppercase text-primary">Mindset-Coaching für neue Energie</p>
                <h1 className="max-w-3xl">Vom Energietief zurück zu einem Mindset, das dich trägt.</h1>
                <p className="max-w-2xl text-lg text-neutral-300">
                    AUFWIND begleitet dich in 12 Wochen, Schritt für Schritt, vom ersten ehrlichen Blick auf deinen
                    Energiehaushalt bis zu einem stabilen Mindset, das auch dann trägt, wenn der Alltag wieder anstrengend
                    wird.
                </p>
                <div className="flex flex-wrap gap-3">
                    <Link href="/registrieren" className="btn btn-lg">
                        Kostenlos starten
                    </Link>
                    <Link href="/kontakt" className="btn btn-lg bg-white/10 text-white hover:bg-white/15">
                        Erstgespräch anfragen
                    </Link>
                </div>
            </section>

            <section className="flex flex-col gap-8">
                <h2>Kennst du das?</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {symptoms.map((symptom) => (
                        <Card key={symptom}>
                            <p>{symptom}</p>
                        </Card>
                    ))}
                </div>
                <p className="max-w-2xl text-neutral-300">
                    Das ist kein persönliches Versagen. Es ist ein Zeichen, dass dein System nach einer neuen,
                    tragfähigeren Grundlage verlangt – und genau daran arbeiten wir gemeinsam.
                </p>
            </section>

            <section className="flex flex-col gap-8">
                <h2>So funktioniert AUFWIND</h2>
                <div className="grid gap-6 sm:grid-cols-3">
                    {steps.map((step, index) => (
                        <div key={step.title} className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                            <h3>{step.title}</h3>
                            <p className="text-neutral-300">{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2>Dein Weg in 5 Phasen</h2>
                    <Link href="/programm">Das ganze Programm ansehen →</Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {PHASES.map((phase) => (
                        <PhaseCard key={phase.id} phase={phase} />
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-8">
                <h2>Stimmen aus dem Programm</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name}>
                            <p className="italic">&ldquo;{testimonial.quote}&rdquo;</p>
                            <p className="text-sm text-neutral-500">{testimonial.name}</p>
                        </Card>
                    ))}
                </div>
                <p className="text-sm text-neutral-500">
                    Anonymisierte, sinngemäße Erfahrungsberichte auf Basis früherer Coachings.
                </p>
            </section>

            <section className="flex flex-col items-start gap-6">
                <h2>Bereit für den ersten kleinen Schritt?</h2>
                <p className="max-w-2xl text-neutral-300">
                    Du musst nicht schon wieder voller Energie sein, um zu starten. Du musst nur bereit sein, dir dein
                    eigenes Dashboard einzurichten und den ersten Energie-Check-in zu machen.
                </p>
                <Link href="/registrieren" className="btn btn-lg">
                    Kostenloses Konto erstellen
                </Link>
            </section>
        </div>
    );
}
