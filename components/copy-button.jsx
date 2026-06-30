'use client';
import { useState } from 'react';

export function CopyButton({ text, label = 'Kopieren', className = '' }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            const timeout = new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 2000));
            await Promise.race([navigator.clipboard.writeText(text), timeout]);
        } catch {
            try {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            } catch {}
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <button
            onClick={handleCopy}
            className={`px-3 py-1.5 text-xs font-medium border rounded transition-colors cursor-pointer ${
                copied
                    ? 'border-green-500/50 bg-green-500/10 text-green-400'
                    : 'border-white/20 bg-white/5 hover:bg-white/15 text-white/70'
            } ${className}`}
        >
            {copied ? 'Kopiert!' : label}
        </button>
    );
}
