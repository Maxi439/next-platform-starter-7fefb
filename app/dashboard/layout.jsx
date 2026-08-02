import Link from 'next/link';
import { ContextAlert } from 'components/context-alert';
import { logoutAction } from 'lib/actions/auth-actions';
import { requireUser } from 'lib/current-user';

const navItems = [
    { href: '/dashboard', label: 'Übersicht' },
    { href: '/dashboard/programm', label: 'Mein Programm' },
    { href: '/dashboard/energie', label: 'Energie-Tagebuch' },
    { href: '/dashboard/profil', label: 'Profil' }
];

export default async function DashboardLayout({ children }) {
    const user = await requireUser();

    return (
        <div className="flex flex-col gap-8 pb-24 sm:flex-row">
            <aside className="flex flex-col gap-4 shrink-0 sm:w-56">
                <p className="text-sm text-neutral-400">Hallo, {user.name.split(' ')[0] || user.name}</p>
                <nav className="flex flex-row flex-wrap gap-2 sm:flex-col">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="inline-flex px-3 py-2 text-sm rounded-sm bg-white/5 hover:bg-white/10"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="w-full px-3 py-2 text-sm text-left no-underline rounded-sm cursor-pointer bg-white/5 hover:bg-white/10"
                        >
                            Abmelden
                        </button>
                    </form>
                </nav>
            </aside>
            <div className="flex flex-col grow gap-8">
                <ContextAlert />
                {children}
            </div>
        </div>
    );
}
