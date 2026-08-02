import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'aufwind_session';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 Tage
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-only-insecure-secret-change-me';

if (!process.env.SESSION_SECRET && process.env.NODE_ENV === 'production') {
    console.warn(
        'SESSION_SECRET ist nicht gesetzt. Bitte in den Netlify-Umgebungsvariablen einen zufälligen, geheimen Wert hinterlegen.'
    );
}

function sign(value) {
    return crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('hex');
}

function timingSafeEqualStrings(a, b) {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

export function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return { salt, hash };
}

export function verifyPassword(password, salt, hash) {
    const candidate = crypto.scryptSync(password, salt, 64).toString('hex');
    return timingSafeEqualStrings(candidate, hash);
}

export async function createSession(email) {
    const payload = Buffer.from(JSON.stringify({ email, iat: Date.now() })).toString('base64url');
    const signature = sign(payload);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, `${payload}.${signature}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE
    });
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
    const cookieStore = await cookies();
    const raw = cookieStore.get(COOKIE_NAME)?.value;
    if (!raw) return null;

    const [payload, signature] = raw.split('.');
    if (!payload || !signature || !timingSafeEqualStrings(sign(payload), signature)) return null;

    try {
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        return data?.email ? data : null;
    } catch {
        return null;
    }
}
