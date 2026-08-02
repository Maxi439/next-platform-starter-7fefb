export function ProgressBar({ percent, label, onLight = false }) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <div className={`flex justify-between text-sm ${onLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    <span>{label}</span>
                    <span>{percent}%</span>
                </div>
            )}
            <div className={`w-full h-2 overflow-hidden rounded-full ${onLight ? 'bg-neutral-200' : 'bg-white/10'}`}>
                <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}
