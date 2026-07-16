export const metadata = {
    title: 'Impressum'
};

export default function ImpressumPage() {
    return (
        <div className="flex flex-col max-w-2xl gap-4 py-8">
            <h1>Impressum</h1>
            <p className="text-neutral-300">
                Platzhalterseite – bitte vor Veröffentlichung durch die vollständigen Angaben gemäß § 5 TMG ersetzen:
                Firmenname, ladungsfähige Anschrift, Vertretungsberechtigte, Kontaktdaten, Registereintrag,
                Umsatzsteuer-ID sowie ggf. Berufsbezeichnung und Aufsichtsbehörde.
            </p>
        </div>
    );
}
