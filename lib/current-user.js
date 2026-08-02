import { redirect } from 'next/navigation';
import { getSession } from './auth';
import { getSafeUser } from './users';

export async function requireUser() {
    const session = await getSession();
    if (!session?.email) redirect('/login');

    const user = await getSafeUser(session.email);
    if (!user) redirect('/login');

    return user;
}
