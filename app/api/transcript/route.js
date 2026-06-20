import { YoutubeTranscript } from 'youtube-transcript';
import { NextResponse } from 'next/server';

function extractVideoId(input) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
        const match = input.match(pattern);
        if (match) return match[1];
    }
    return null;
}

export async function POST(request) {
    try {
        const { url } = await request.json();

        if (!url?.trim()) {
            return NextResponse.json({ error: 'Bitte eine YouTube-URL eingeben.' }, { status: 400 });
        }

        const videoId = extractVideoId(url.trim());
        if (!videoId) {
            return NextResponse.json({ error: 'Ungültige YouTube-URL.' }, { status: 400 });
        }

        const transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'de' })
            .catch(() => YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' }))
            .catch(() => YoutubeTranscript.fetchTranscript(videoId));

        if (!transcript?.length) {
            return NextResponse.json(
                { error: 'Kein Transkript verfügbar. Das Video hat möglicherweise keine Untertitel.' },
                { status: 404 }
            );
        }

        const fullText = transcript.map((entry) => entry.text).join(' ');
        const withTimestamps = transcript.map((entry) => ({
            time: Math.floor(entry.offset / 1000),
            text: entry.text
        }));

        return NextResponse.json({
            videoId,
            fullText,
            withTimestamps,
            wordCount: fullText.split(/\s+/).filter(Boolean).length,
            duration: Math.floor((transcript.at(-1)?.offset ?? 0) / 1000)
        });
    } catch (err) {
        const msg = err?.message ?? '';
        if (msg.includes('disabled') || msg.includes('No transcript')) {
            return NextResponse.json(
                { error: 'Dieses Video hat keine Untertitel oder Transkripte aktiviert.' },
                { status: 404 }
            );
        }
        return NextResponse.json({ error: 'Fehler beim Abrufen des Transkripts.' }, { status: 500 });
    }
}
