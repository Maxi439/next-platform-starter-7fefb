import { LeadForm } from 'components/landing/lead-form';

export function Cta() {
    return (
        <section id="kontakt" className="flex flex-col gap-8 p-6 rounded-sm sm:p-10 bg-white/5 scroll-mt-8">
            <div className="flex flex-col gap-3">
                <h2>Bereit für den nächsten Schritt?</h2>
                <p className="max-w-2xl text-neutral-200">
                    Vereinbaren Sie ein unverbindliches Erstgespräch. Gemeinsam prüfen wir, ob eine
                    Immobilien-Kapitalanlage zu Ihren Zielen und Ihrer Situation passt.
                </p>
            </div>
            <LeadForm />
            <p className="text-sm text-neutral-400">Unverbindlich · Kostenlos · Ohne Verpflichtung</p>
        </section>
    );
}
