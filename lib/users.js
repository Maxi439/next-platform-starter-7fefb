import { randomUUID } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { hashPassword, verifyPassword } from './auth';

function usersStore() {
    return getStore({ name: 'coaching-users', consistency: 'strong' });
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

export async function getUserByEmail(email) {
    return usersStore().get(normalizeEmail(email), { type: 'json' });
}

export async function createUser({ email, name, password }) {
    const key = normalizeEmail(email);
    const store = usersStore();
    const existing = await store.get(key, { type: 'json' });
    if (existing) {
        throw new Error('Für diese E-Mail-Adresse existiert bereits ein Konto.');
    }

    const { salt, hash } = hashPassword(password);
    const user = {
        email: key,
        name: name.trim(),
        passwordSalt: salt,
        passwordHash: hash,
        createdAt: new Date().toISOString(),
        progress: {},
        checkins: []
    };
    await store.setJSON(key, user);
    return user;
}

export async function authenticateUser(email, password) {
    const user = await getUserByEmail(email);
    if (!user) return null;
    if (!verifyPassword(password, user.passwordSalt, user.passwordHash)) return null;
    return user;
}

export async function getSafeUser(email) {
    const user = await getUserByEmail(email);
    if (!user) return null;
    const { passwordHash, passwordSalt, ...safeUser } = user;
    return safeUser;
}

export async function toggleTask(email, phaseId, taskId) {
    const key = normalizeEmail(email);
    const store = usersStore();
    const user = await store.get(key, { type: 'json' });
    if (!user) throw new Error('Nutzer nicht gefunden.');

    user.progress ||= {};
    user.progress[phaseId] ||= {};
    if (user.progress[phaseId][taskId]) {
        delete user.progress[phaseId][taskId];
    } else {
        user.progress[phaseId][taskId] = true;
    }
    await store.setJSON(key, user);
    return user.progress;
}

export async function addCheckin(email, { energy, note }) {
    const key = normalizeEmail(email);
    const store = usersStore();
    const user = await store.get(key, { type: 'json' });
    if (!user) throw new Error('Nutzer nicht gefunden.');

    const entry = {
        id: randomUUID(),
        date: new Date().toISOString(),
        energy,
        note: note?.trim() || ''
    };
    user.checkins ||= [];
    user.checkins.unshift(entry);
    user.checkins = user.checkins.slice(0, 60);
    await store.setJSON(key, user);
    return entry;
}

export async function updateName(email, name) {
    const key = normalizeEmail(email);
    const store = usersStore();
    const user = await store.get(key, { type: 'json' });
    if (!user) throw new Error('Nutzer nicht gefunden.');

    user.name = name.trim();
    await store.setJSON(key, user);
}
