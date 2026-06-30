import Link from 'next/link';

const nav = [
    { label: 'Dashboard', href: '/instagram' },
    { label: 'Setup-Guide', href: '/instagram/setup' },
    { label: 'Reel-Skripte', href: '/instagram/reels' },
    { label: 'DM-Automation', href: '/instagram/dm' },
    { label: 'Woche 1', href: '/instagram/week1' },
];

export default function InstagramLayout({ children }) {
    return (
        <div className="flex flex-col gap-8">
            <nav className="flex flex-wrap gap-2 p-3 rounded-lg border border-white/10 bg-white/5">
                {nav.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="px-3 py-1.5 text-sm font-medium rounded no-underline border border-transparent hover:border-primary/40 hover:bg-primary/10 transition-colors text-white/70 hover:text-white"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
            {children}
        </div>
    );
}
