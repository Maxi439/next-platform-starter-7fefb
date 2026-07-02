'use client';

export function Pillar({ index, title, children }) {
    return (
        <section className="border border-neutral-800 bg-neutral-950/60">
            <header className="flex items-baseline gap-3 px-5 py-4 border-b border-neutral-800">
                <span className="font-mono text-sm text-neutral-600">{index}</span>
                <h2 className="text-lg font-bold tracking-tight text-neutral-100 sm:text-xl">{title}</h2>
            </header>
            <div className="flex flex-col gap-4 px-5 py-5">{children}</div>
        </section>
    );
}

export function Toggle({ label, checked, onChange }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={[
                'flex items-center justify-between gap-4 px-4 py-3 text-left text-sm border transition-colors',
                checked
                    ? 'border-primary bg-primary/10 text-neutral-100'
                    : 'border-neutral-800 text-neutral-500 hover:border-neutral-700'
            ].join(' ')}
        >
            <span>{label}</span>
            <span
                className={[
                    'shrink-0 font-mono text-xs px-2 py-0.5',
                    checked ? 'text-primary' : 'text-neutral-700'
                ].join(' ')}
            >
                {checked ? 'ERFÜLLT' : 'OFFEN'}
            </span>
        </button>
    );
}

export function NumberField({ label, unit, value, onChange, placeholder }) {
    return (
        <label className="flex items-center justify-between gap-4 px-4 py-3 border border-neutral-800">
            <span className="text-sm text-neutral-400">{label}</span>
            <span className="flex items-center gap-2">
                <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={value === 0 ? '' : value}
                    placeholder={placeholder ?? '0'}
                    onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                    className="w-24 px-2 py-1 font-mono text-right bg-black border rounded-none border-neutral-700 text-neutral-100 focus:border-primary focus:outline-none"
                />
                <span className="w-10 text-xs text-neutral-600">{unit}</span>
            </span>
        </label>
    );
}

export function ProgressBar({ percent, label }) {
    const clamped = Math.max(0, Math.min(100, percent));
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <div className="flex justify-between font-mono text-xs text-neutral-500">
                    <span>{label}</span>
                    <span>{clamped.toFixed(0)}%</span>
                </div>
            )}
            <div className="h-1.5 w-full bg-neutral-900">
                <div className="h-full bg-primary" style={{ width: `${clamped}%` }} />
            </div>
        </div>
    );
}
