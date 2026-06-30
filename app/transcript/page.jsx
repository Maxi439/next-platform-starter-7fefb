'use client';

import { useState, useRef } from 'react';

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function TranscriptPage() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [view, setView] = useState('full');
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/transcript', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Unbekannter Fehler');
            } else {
                setResult(data);
                setView('full');
            }
        } catch {
            setError('Netzwerkfehler. Bitte erneut versuchen.');
        } finally {
            setLoading(false);
        }
    }

    async function handleCopy() {
        const text = view === 'full' ? result.fullText : result.withTimestamps.map((e) => `[${formatTime(e.time)}] ${e.text}`).join('\n');
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handleDownload() {
        const text = view === 'full' ? result.fullText : result.withTimestamps.map((e) => `[${formatTime(e.time)}] ${e.text}`).join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `transkript-${result.videoId}.txt`;
        a.click();
    }

    return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">YouTube Transkript</h1>
                <p className="text-blue-200 text-sm">
                    YouTube-URL eingeben — Transkript wird automatisch extrahiert, auch für Shorts.
                </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=... oder https://youtu.be/..."
                        className="flex-1 bg-blue-900 border border-blue-600 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400 text-sm"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !url.trim()}
                        className="px-6 py-3 bg-green-500 hover:bg-green-400 disabled:bg-blue-700 disabled:text-blue-400 text-black font-semibold rounded-lg transition-colors text-sm whitespace-nowrap"
                    >
                        {loading ? 'Lädt...' : 'Transkript holen'}
                    </button>
                </div>
                <p className="text-xs text-blue-400">
                    Unterstützt: youtube.com/watch, youtu.be, youtube.com/shorts
                </p>
            </form>

            {/* Loading */}
            {loading && (
                <div className="flex items-center gap-3 text-blue-300">
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Transkript wird abgerufen...</span>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-900/40 border border-red-600 rounded-lg px-4 py-3 text-red-300 text-sm">
                    {error}
                </div>
            )}

            {/* Result */}
            {result && (
                <div className="flex flex-col gap-4">
                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 text-xs">
                        <span className="bg-blue-800 px-3 py-1 rounded-full text-blue-200">
                            Video-ID: {result.videoId}
                        </span>
                        <span className="bg-blue-800 px-3 py-1 rounded-full text-blue-200">
                            {result.wordCount.toLocaleString()} Wörter
                        </span>
                        {result.duration > 0 && (
                            <span className="bg-blue-800 px-3 py-1 rounded-full text-blue-200">
                                Länge: {formatTime(result.duration)}
                            </span>
                        )}
                    </div>

                    {/* View Toggle + Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex gap-1 bg-blue-900 rounded-lg p-1">
                            <button
                                onClick={() => setView('full')}
                                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                                    view === 'full' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'
                                }`}
                            >
                                Volltext
                            </button>
                            <button
                                onClick={() => setView('timestamps')}
                                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                                    view === 'timestamps' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'
                                }`}
                            >
                                Mit Zeitstempeln
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors"
                            >
                                {copied ? 'Kopiert!' : 'Kopieren'}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors"
                            >
                                Download .txt
                            </button>
                        </div>
                    </div>

                    {/* Transcript Text */}
                    {view === 'full' && (
                        <div className="bg-blue-950 border border-blue-700 rounded-xl p-5 max-h-[500px] overflow-y-auto text-sm text-blue-100 leading-relaxed whitespace-pre-wrap">
                            {result.fullText}
                        </div>
                    )}

                    {view === 'timestamps' && (
                        <div className="bg-blue-950 border border-blue-700 rounded-xl p-5 max-h-[500px] overflow-y-auto flex flex-col gap-2">
                            {result.withTimestamps.map((entry, i) => (
                                <div key={i} className="flex gap-3 text-sm">
                                    <span className="text-green-400 font-mono shrink-0 pt-0.5">
                                        {formatTime(entry.time)}
                                    </span>
                                    <span className="text-blue-100 leading-relaxed">{entry.text}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* YouTube Embed */}
                    <details className="group">
                        <summary className="cursor-pointer text-sm text-blue-400 hover:text-blue-200 transition-colors select-none">
                            Video anzeigen
                        </summary>
                        <div className="mt-3 rounded-xl overflow-hidden aspect-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${result.videoId}`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </details>
                </div>
            )}
        </div>
    );
}
