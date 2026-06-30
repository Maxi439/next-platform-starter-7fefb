'use client';
import { useState } from 'react';

export function CopyButton({ text, label = 'Kopieren', className = '' }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
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
