'use client';

import { useState } from 'react';
import { Alert } from './alert';
import { Card } from './card';

export function ContactForm() {
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

    return (
        <div className="w-full md:max-w-md">
            <Card title="Nachricht senden">
                <form name="kontakt" onSubmit={handleFormSubmit} className="flex flex-col gap-3 align-center">
                    <input type="hidden" name="form-name" value="kontakt" />
                    <input name="name" type="text" placeholder="Dein Name" required className="input" />
                    <input name="email" type="email" placeholder="Deine E-Mail-Adresse" required className="input" />
                    <textarea
                        name="message"
                        placeholder="Was beschäftigt dich gerade?"
                        required
                        rows={4}
                        className="input"
                    />
                    <label className="flex items-center gap-2 text-sm text-neutral-700">
                        <input name="erstgespraech" type="checkbox" value="ja" className="w-4 h-4" />
                        Ich interessiere mich für ein kostenloses Erstgespräch
                    </label>
                    <button className="btn" type="submit" disabled={status === 'pending'}>
                        {status === 'pending' ? 'Wird gesendet…' : 'Absenden'}
                    </button>
                    {status === 'ok' && <Alert type="success">Danke! Ich melde mich so schnell wie möglich bei dir.</Alert>}
                    {status === 'error' && <Alert type="error">{error}</Alert>}
                </form>
            </Card>
        </div>
    );
}
