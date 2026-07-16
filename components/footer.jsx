import Link from 'next/link';

export function Footer() {
    return (
        <footer className="flex flex-col gap-4 pt-16 pb-12 sm:pt-24 sm:pb-16">
            <p className="max-w-2xl text-sm text-neutral-400">
                Immobilien-Kapitalanlagen sind mit Chancen und Risiken verbunden; Wertentwicklung und Rendite werden
                nicht garantiert. Diese Seite stellt keine Anlage-, Steuer- oder Rechtsberatung dar. Alle Angaben ohne
                Gewähr und vorbehaltlich individueller Prüfung im persönlichen Beratungsgespräch.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <Link href="/impressum">Impressum</Link>
                <Link href="/datenschutz">Datenschutz</Link>
                <Link href="#kontakt">Kontakt</Link>
            </div>
            <p className="text-sm text-neutral-500">© {new Date().getFullYear()} Kapitalwert Immobilien</p>
        </footer>
    );
}
