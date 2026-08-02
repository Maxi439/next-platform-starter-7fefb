'use server';

import { redirect } from 'next/navigation';
import { createSession, destroySession } from 'lib/auth';
import { authenticateUser, createUser } from 'lib/users';

const blobsHint =
    'Diese Funktion benötigt Netlify Blobs. Starte die Seite lokal mit `netlify dev` oder öffne die deployte Version.';

export async function registerAction(formData) {
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    if (!name.trim() || !email.trim() || password.length < 8) {
        redirect(
            '/registrieren?error=' +
                encodeURIComponent('Bitte alle Felder ausfüllen. Das Passwort braucht mindestens 8 Zeichen.')
        );
    }

    let user;
    try {
        user = await createUser({ email, name, password });
    } catch (err) {
        const message = err?.message?.includes('existiert bereits') ? err.message : blobsHint;
        redirect('/registrieren?error=' + encodeURIComponent(message));
    }

    await createSession(user.email);
    redirect('/dashboard');
}

export async function loginAction(formData) {
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    if (!email.trim() || !password) {
        redirect('/login?error=' + encodeURIComponent('Bitte E-Mail und Passwort eingeben.'));
    }

    let user;
    try {
        user = await authenticateUser(email, password);
    } catch {
        redirect('/login?error=' + encodeURIComponent(blobsHint));
    }

    if (!user) {
        redirect('/login?error=' + encodeURIComponent('E-Mail oder Passwort ist falsch.'));
    }

    await createSession(user.email);
    redirect('/dashboard');
}

export async function logoutAction() {
    await destroySession();
    redirect('/');
}
