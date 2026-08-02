import { Alert } from 'components/alert';
import { Card } from 'components/card';
import { ContextAlert } from 'components/context-alert';
import { SubmitButton } from 'components/submit-button';
import { loginAction } from 'lib/actions/auth-actions';
import Link from 'next/link';

export const metadata = {
    title: 'Anmelden'
};

export default async function LoginPage({ searchParams }) {
    const { error } = await searchParams;

    return (
        <div className="flex flex-col items-center gap-8 pb-24">
            <div className="w-full max-w-md">
                <ContextAlert className="mb-6" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1>Willkommen zurück</h1>
                <p className="max-w-md text-neutral-300">Melde dich an, um an deinem Programm weiterzuarbeiten.</p>
            </div>
            <div className="w-full max-w-md">
                <Card>
                    <form action={loginAction} className="flex flex-col gap-3">
                        <input name="email" type="email" placeholder="Deine E-Mail-Adresse" required className="input" />
                        <input name="password" type="password" placeholder="Passwort" required className="input" />
                        <SubmitButton text="Anmelden" />
                        {error && <Alert type="error">{error}</Alert>}
                    </form>
                </Card>
                <p className="mt-4 text-sm text-center text-neutral-400">
                    Noch kein Konto?{' '}
                    <Link href="/registrieren" className="text-primary">
                        Jetzt kostenlos registrieren
                    </Link>
                </p>
            </div>
        </div>
    );
}
