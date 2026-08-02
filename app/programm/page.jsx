import Link from 'next/link';
import { PhaseCard } from 'components/phase-card';
import { PHASES } from 'data/program';

export const metadata = {
    title: 'Programm'
};

export default function ProgrammPage() {
    return (
        <div className="flex flex-col gap-12 pb-24">
            <section className="flex flex-col gap-4">
                <h1>Das AUFWIND-Programm</h1>
                <p className="max-w-2xl text-lg text-neutral-300">
                    12 Wochen, 5 Phasen, ein gemeinsames Ziel: ein Mindset, das dich trägt – auch an Tagen, an denen
                    wenig Energie da ist. Jede Phase baut auf der vorherigen auf und ist bewusst in kleine, machbare
                    Schritte unterteilt.
                </p>
            </section>

            <section className="flex flex-col gap-6">
                {PHASES.map((phase) => (
                    <PhaseCard key={phase.id} phase={phase} detailed />
                ))}
            </section>

            <section className="flex flex-col items-start gap-4">
                <h2>Bereit, deine Reise zu beginnen?</h2>
                <p className="max-w-2xl text-neutral-300">
                    Leg dir ein kostenloses Konto an, um deinen Fortschritt phasenweise zu verfolgen, oder vereinbare
                    zuerst ein unverbindliches Erstgespräch.
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
        </div>
    );
}
