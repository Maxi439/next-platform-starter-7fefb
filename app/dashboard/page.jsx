import Link from 'next/link';
import { Card } from 'components/card';
import { EnergyBadge } from 'components/energy-badge';
import { ProgressBar } from 'components/progress-bar';
import { getQuoteOfDay } from 'data/quotes';
import { computeProgress, getCurrentPhase } from 'data/program';
import { requireUser } from 'lib/current-user';

export const metadata = {
    title: 'Dashboard'
};

export default async function DashboardOverviewPage() {
    const user = await requireUser();
    const { percent, completedTasks, totalTasks } = computeProgress(user.progress);
    const currentPhase = getCurrentPhase(user.progress);
    const lastCheckin = user.checkins?.[0];
    const quote = getQuoteOfDay();

    return (
        <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-2">
                <h1>Willkommen zurück, {user.name.split(' ')[0] || user.name}</h1>
                <p className="text-neutral-300">
                    Schön, dass du da bist – egal wie viel Energie du heute mitbringst.
                </p>
            </section>

            <section>
                <Card>
                    <p className="italic text-neutral-700">&ldquo;{quote}&rdquo;</p>
                </Card>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <h3 className="text-neutral-900">Dein Gesamtfortschritt</h3>
                    <ProgressBar percent={percent} onLight />
                    <p className="text-sm">
                        {completedTasks} von {totalTasks} Schritten geschafft.
                    </p>
                    {currentPhase && (
                        <p className="text-sm">
                            Aktuelle Phase: <strong>{currentPhase.title}</strong>
                        </p>
                    )}
                    <Link href="/dashboard/programm" className="text-sm">
                        Zum Programm →
                    </Link>
                </Card>

                <Card>
                    <h3 className="text-neutral-900">Energie-Tagebuch</h3>
                    {lastCheckin ? (
                        <>
                            <p className="text-sm">Letzter Eintrag:</p>
                            <EnergyBadge energy={lastCheckin.energy} />
                            {lastCheckin.note && <p className="text-sm italic">&ldquo;{lastCheckin.note}&rdquo;</p>}
                        </>
                    ) : (
                        <p className="text-sm">Du hast noch keinen Energie-Check-in gemacht.</p>
                    )}
                    <Link href="/dashboard/energie" className="text-sm">
                        Heutigen Check-in machen →
                    </Link>
                </Card>
            </section>
        </div>
    );
}
