import Link from 'next/link';
import { getSession } from 'lib/auth';

const navItems = [
    { linkText: 'Programm', href: '/programm' },
    { linkText: 'Über mich', href: '/ueber-mich' },
    { linkText: 'Preise', href: '/preise' },
    { linkText: 'Kontakt', href: '/kontakt' }
];

export async function Header() {
    const session = await getSession();

    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-12 md:pb-24">
            <Link href="/" className="text-lg font-bold tracking-tight no-underline">
                AUFWIND
            </Link>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="inline-flex px-1.5 py-1 sm:px-3 sm:py-2">
                            {item.linkText}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex gap-2 lg:ml-auto">
                {session?.email ? (
                    <Link href="/dashboard" className="btn">
                        Mein Dashboard
                    </Link>
                ) : (
                    <>
                        <Link href="/login" className="inline-flex px-1.5 py-1 sm:px-3 sm:py-2">
                            Anmelden
                        </Link>
                        <Link href="/registrieren" className="btn">
                            Kostenlos starten
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
