'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSession } from 'lib/auth';
import { addCheckin, toggleTask, updateName } from 'lib/users';

async function requireEmail() {
    const session = await getSession();
    if (!session?.email) redirect('/login');
    return session.email;
}

export async function toggleTaskAction(phaseId, taskId) {
    const email = await requireEmail();
    await toggleTask(email, phaseId, taskId);
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/programm');
}

export async function addCheckinAction(formData) {
    const email = await requireEmail();
    const energy = Number(formData.get('energy'));
    const note = formData.get('note')?.toString() || '';

    if (!energy || energy < 1 || energy > 5) {
        redirect('/dashboard/energie?error=' + encodeURIComponent('Bitte einen Energie-Wert zwischen 1 und 5 wählen.'));
    }

    await addCheckin(email, { energy, note });
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/energie');
    redirect('/dashboard/energie?success=1');
}

export async function updateNameAction(formData) {
    const email = await requireEmail();
    const name = formData.get('name')?.toString() || '';

    if (!name.trim()) {
        redirect('/dashboard/profil?error=' + encodeURIComponent('Bitte einen Namen angeben.'));
    }

    await updateName(email, name);
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/profil');
    redirect('/dashboard/profil?success=1');
}
