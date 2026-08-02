import Link from 'next/link';

const footerLinks = [
    { linkText: 'Programm', href: '/programm' },
    { linkText: 'Über mich', href: '/ueber-mich' },
    { linkText: 'Preise', href: '/preise' },
    { linkText: 'Kontakt', href: '/kontakt' }
];

export function Footer() {
    return (
        <footer className="flex flex-col gap-4 pt-16 pb-12 text-sm sm:pt-24 sm:pb-16">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {footerLinks.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href}>{item.linkText}</Link>
                    </li>
                ))}
            </ul>
            <p className="max-w-2xl text-neutral-400">
                AUFWIND ist ein Mindset-Coaching-Angebot und ersetzt keine medizinische oder psychotherapeutische
                Behandlung. Bei anhaltender Erschöpfung oder gesundheitlichen Beschwerden wende dich bitte zusätzlich an
                eine Ärztin, einen Arzt oder eine Psychotherapiepraxis.
            </p>
            <p className="text-neutral-500">&copy; {new Date().getFullYear()} AUFWIND Coaching</p>
        </footer>
    );
}
