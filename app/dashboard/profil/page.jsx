import { Alert } from 'components/alert';
import { Card } from 'components/card';
import { SubmitButton } from 'components/submit-button';
import { updateNameAction } from 'lib/actions/dashboard-actions';
import { requireUser } from 'lib/current-user';

export const metadata = {
    title: 'Profil'
};

export default async function DashboardProfilPage({ searchParams }) {
    const { error, success } = await searchParams;
    const user = await requireUser();

    return (
        <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-2">
                <h1>Profil</h1>
                <p className="text-neutral-300">Deine Kontodaten.</p>
            </section>

            <section className="max-w-md">
                <Card>
                    <form action={updateNameAction} className="flex flex-col gap-3">
                        <label className="flex flex-col gap-1 text-sm">
                            Name
                            <input name="name" type="text" defaultValue={user.name} required className="input" />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            E-Mail-Adresse
                            <input type="email" value={user.email} disabled className="input opacity-60" />
                        </label>
                        <SubmitButton text="Speichern" />
                        {error && <Alert type="error">{error}</Alert>}
                        {success && <Alert type="success">Gespeichert.</Alert>}
                    </form>
                </Card>
            </section>
        </div>
    );
}
