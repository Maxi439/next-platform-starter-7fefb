const LEVEL_LABELS = {
    1: 'Sehr niedrig',
    2: 'Niedrig',
    3: 'Mittel',
    4: 'Gut',
    5: 'Sehr gut'
};

export function EnergyBadge({ energy }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-1" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((level) => (
                    <span
                        key={level}
                        className={`w-2.5 h-4 rounded-sm ${level <= energy ? 'bg-accent' : 'bg-neutral-200'}`}
                    />
                ))}
            </div>
            <span className="text-sm text-neutral-500">{LEVEL_LABELS[energy] || energy}</span>
        </div>
    );
}
