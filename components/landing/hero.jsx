import Link from 'next/link';

export function Hero() {
    return (
        <section className="flex flex-col gap-6 pt-4 pb-4 sm:pt-8">
            <p className="text-sm font-bold tracking-wide text-primary uppercase">Immobilien-Kapitalanlage mit Beratung</p>
            <h1 className="max-w-3xl">Sachwerte, die für Sie arbeiten – Immobilien als Kapitalanlage, klar durchdacht</h1>
            <p className="max-w-2xl text-lg text-neutral-200">
                Persönliche Begleitung für Anleger, die ihr Vermögen mit Immobilien absichern und strukturiert aufbauen
                möchten. Ohne Verkaufsdruck, mit nachvollziehbaren Zahlen und einem festen Ansprechpartner.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
                <Link href="#kontakt" className="btn btn-lg sm:min-w-64">
                    Kostenlose Erstanalyse sichern
                </Link>
                <Link
                    href="#ablauf"
                    className="inline-flex items-center justify-center px-6 py-4 font-bold text-center no-underline transition-colors border rounded-sm cursor-pointer border-neutral-500 hover:border-neutral-300"
                >
                    So läuft&apos;s ab
                </Link>
            </div>
            <p className="mt-4 text-sm text-neutral-400">
                Persönliche Betreuung · Regionale Marktkenntnis · Transparente Beratung ohne Kaufdruck
            </p>
        </section>
    );
}
