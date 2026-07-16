import Link from 'next/link';

const navItems = [
    { linkText: 'Lösung', href: '#loesung' },
    { linkText: 'Ablauf', href: '#ablauf' },
    { linkText: 'FAQ', href: '#faq' }
];

export function Header() {
    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-12 md:pb-24">
            <Link href="/" className="text-lg font-bold no-underline">
                Kapitalwert Immobilien
            </Link>
            {!!navItems?.length && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className="inline-flex px-1.5 py-1 sm:px-3 sm:py-2">
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <Link href="#kontakt" className="btn lg:ml-auto">
                Erstgespräch sichern
            </Link>
        </nav>
    );
}
