import { Alert } from 'components/alert';
import { Card } from 'components/card';
import { EnergyBadge } from 'components/energy-badge';
import { SubmitButton } from 'components/submit-button';
import { addCheckinAction } from 'lib/actions/dashboard-actions';
import { requireUser } from 'lib/current-user';

export const metadata = {
    title: 'Energie-Tagebuch'
};

const energyOptions = [
    { value: 1, label: 'Sehr niedrig' },
    { value: 2, label: 'Niedrig' },
    { value: 3, label: 'Mittel' },
    { value: 4, label: 'Gut' },
    { value: 5, label: 'Sehr gut' }
];

export default async function DashboardEnergiePage({ searchParams }) {
    const { error, success } = await searchParams;
    const user = await requireUser();
    const checkins = user.checkins || [];

    return (
        <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-2">
                <h1>Energie-Tagebuch</h1>
                <p className="text-neutral-300">
                    Ein täglicher Check-in hilft dir, Muster zu erkennen – ganz ohne Bewertung. Jeder Wert ist okay.
                </p>
            </section>

            <section>
                <Card>
                    <form action={addCheckinAction} className="flex flex-col gap-4">
                        <fieldset className="flex flex-col gap-2">
                            <legend className="mb-1 font-bold text-neutral-900">Wie viel Energie hast du heute?</legend>
                            <div className="flex flex-wrap gap-3">
                                {energyOptions.map((option) => (
                                    <label key={option.value} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="energy"
                                            value={option.value}
                                            required
                                            className="w-4 h-4 accent-primary"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <textarea
                            name="note"
                            placeholder="Möchtest du etwas dazu notieren? (optional)"
                            rows={3}
                            className="input"
                        />
                        <SubmitButton text="Check-in speichern" />
                        {error && <Alert type="error">{error}</Alert>}
                        {success && <Alert type="success">Dein Check-in wurde gespeichert.</Alert>}
                    </form>
                </Card>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Verlauf</h2>
                {checkins.length === 0 && <p className="text-neutral-400">Noch keine Einträge vorhanden.</p>}
                <div className="flex flex-col gap-2">
                    {checkins.map((entry) => (
                        <Card key={entry.id}>
                            <p className="text-sm text-neutral-500">
                                {new Date(entry.date).toLocaleDateString('de-DE', {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}
                            </p>
                            <EnergyBadge energy={entry.energy} />
                            {entry.note && <p className="text-sm italic">&ldquo;{entry.note}&rdquo;</p>}
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
