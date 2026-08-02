import { Alert } from 'components/alert';
import { Card } from 'components/card';
import { ContextAlert } from 'components/context-alert';
import { SubmitButton } from 'components/submit-button';
import { registerAction } from 'lib/actions/auth-actions';
import Link from 'next/link';

export const metadata = {
    title: 'Registrieren'
};

export default async function RegistrierenPage({ searchParams }) {
    const { error } = await searchParams;

    return (
        <div className="flex flex-col items-center gap-8 pb-24">
            <div className="w-full max-w-md">
                <ContextAlert className="mb-6" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1>Konto erstellen</h1>
                <p className="max-w-md text-neutral-300">
                    Kostenlos und in weniger als einer Minute. Du bekommst direkt Zugriff auf dein Dashboard mit dem
                    12-Wochen-Programm und dem Energie-Tagebuch.
                </p>
            </div>
            <div className="w-full max-w-md">
                <Card>
                    <form action={registerAction} className="flex flex-col gap-3">
                        <input name="name" type="text" placeholder="Dein Name" required className="input" />
                        <input name="email" type="email" placeholder="Deine E-Mail-Adresse" required className="input" />
                        <input
                            name="password"
                            type="password"
                            placeholder="Passwort (mind. 8 Zeichen)"
                            required
                            minLength={8}
                            className="input"
                        />
                        <SubmitButton text="Kostenloses Konto erstellen" />
                        {error && <Alert type="error">{error}</Alert>}
                    </form>
                </Card>
                <p className="mt-4 text-sm text-center text-neutral-400">
                    Du hast schon ein Konto?{' '}
                    <Link href="/login" className="text-primary">
                        Jetzt anmelden
                    </Link>
                </p>
            </div>
        </div>
    );
}
