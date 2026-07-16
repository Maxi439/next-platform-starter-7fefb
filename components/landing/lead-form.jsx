'use client';

import { useState } from 'react';
import { Alert } from 'components/alert';

export function LeadForm() {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            setStatus('pending');
            setError(null);
            const myForm = event.target;
            const formData = new FormData(myForm);
            const res = await fetch('/__forms.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });
            if (res.status === 200) {
                setStatus('ok');
                myForm.reset();
            } else {
                setStatus('error');
                setError(`${res.status} ${res.statusText}`);
            }
        } catch (e) {
            setStatus('error');
            setError(`${e}`);
        }
    };

    if (status === 'ok') {
        return (
            <Alert type="success">
                Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze bei Ihnen, um einen Termin für Ihr unverbindliches
                Erstgespräch zu vereinbaren.
            </Alert>
        );
    }

    return (
        <form
            name="erstgespraech"
            onSubmit={handleFormSubmit}
            className="grid gap-3 sm:grid-cols-2"
        >
            <input type="hidden" name="form-name" value="erstgespraech" />
            <input name="name" type="text" placeholder="Ihr Name" required className="input" />
            <input name="email" type="email" placeholder="E-Mail-Adresse" required className="input" />
            <input name="telefon" type="tel" placeholder="Telefon (optional)" className="input sm:col-span-2" />
            <textarea
                name="nachricht"
                placeholder="Was möchten Sie uns zu Ihrer Situation mitgeben? (optional)"
                rows={4}
                className="input sm:col-span-2"
            />
            <label className="flex items-start gap-2 text-sm text-neutral-300 sm:col-span-2">
                <input name="datenschutz" type="checkbox" required className="mt-1" />
                <span>
                    Ich habe die <a href="/datenschutz">Datenschutzhinweise</a> zur Kenntnis genommen und bin mit der
                    Verarbeitung meiner Angaben zur Terminvereinbarung einverstanden.
                </span>
            </label>
            <button className="btn sm:col-span-2 sm:min-w-64 sm:w-fit" type="submit" disabled={status === 'pending'}>
                {status === 'pending' ? 'Wird gesendet …' : 'Kostenlose Erstberatung anfragen'}
            </button>
            {status === 'error' && <Alert type="error">{error}</Alert>}
        </form>
    );
}
