'use client';

import { useEffect, useState } from 'react';
import { NumberField, Pillar, ProgressBar, Toggle } from './controls';
import {
    BENCH_BASELINE_KG,
    UNITS_TARGET,
    MISSION_TOTAL_DAYS,
    buildAudit,
    daysRemaining,
    defaultDaily,
    todayKey
} from './mission';

function useLocalStorageState(key, initialValue) {
    const [value, setValue] = useState(initialValue);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(key);
            if (raw !== null) setValue(JSON.parse(raw));
        } catch {
            // ignore corrupt storage
        }
        setHydrated(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    useEffect(() => {
        if (!hydrated) return;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // storage unavailable
        }
    }, [key, value, hydrated]);

    return [value, setValue];
}

export function BakfitDashboard() {
    const [remaining, setRemaining] = useState(MISSION_TOTAL_DAYS);

    useEffect(() => {
        setRemaining(daysRemaining());
    }, []);

    const [daily, setDaily] = useLocalStorageState(`bakfit:${todayKey()}`, defaultDaily);
    const [benchWeight, setBenchWeight] = useLocalStorageState('bakfit:benchWeight', BENCH_BASELINE_KG);
    const [unitsCompleted, setUnitsCompleted] = useLocalStorageState('bakfit:unitsCompleted', 0);
    const [languageLog, setLanguageLog] = useLocalStorageState('bakfit:languageLog', []);
    const [taterDraft, setTaterDraft] = useState('');
    const [schutzDraft, setSchutzDraft] = useState('');

    const patchDaily = (patch) => setDaily((prev) => ({ ...prev, ...patch }));

    const elapsed = MISSION_TOTAL_DAYS - remaining;
    const missionPercent = (elapsed / MISSION_TOTAL_DAYS) * 100;

    const corrections = buildAudit({ daily, unitsCompleted, remaining });
    const isCompliant = corrections.length === 0;

    const unitsPercent = (unitsCompleted / UNITS_TARGET) * 100;
    const unitsRemaining = Math.max(0, UNITS_TARGET - unitsCompleted);
    const weeklyPace = remaining > 0 ? ((unitsRemaining / remaining) * 7).toFixed(1) : '0.0';

    function submitLanguageEntry() {
        if (!taterDraft.trim() || !schutzDraft.trim()) return;
        setLanguageLog((prev) => [
            { date: todayKey(), tater: taterDraft.trim(), schutz: schutzDraft.trim() },
            ...prev
        ]);
        setTaterDraft('');
        setSchutzDraft('');
    }

    return (
        <div className="-mx-6 -my-6 sm:-mx-12 bg-black px-6 py-10 sm:px-12 sm:py-16 text-neutral-200 font-sans">
            <div className="flex flex-col max-w-3xl gap-10 mx-auto">
                <header className="flex flex-col gap-6 pb-8 border-b border-neutral-800">
                    <div>
                        <p className="font-mono text-xs tracking-[0.3em] text-neutral-600">CINEMATIC NOIR / OPERATIONS-SYSTEM</p>
                        <h1 className="text-4xl font-bold tracking-tight text-neutral-50 sm:text-5xl">BAKFIT</h1>
                        <p className="mt-2 text-neutral-500">Disziplinäre Härte. Physische Dominanz. Keine Ausreden.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-baseline justify-between">
                            <span className="font-mono text-sm text-neutral-500">2. Juli 2026 → 31. Dezember 2026</span>
                            <span className="font-mono text-2xl font-bold text-primary">{remaining} Tage übrig</span>
                        </div>
                        <ProgressBar percent={missionPercent} />
                    </div>
                </header>

                <div
                    className={[
                        'border px-5 py-4 font-mono text-sm',
                        isCompliant ? 'border-primary bg-primary/10 text-primary' : 'border-red-700 bg-red-950/40 text-red-400'
                    ].join(' ')}
                >
                    <p className="mb-2 font-bold tracking-wide">
                        {isCompliant ? 'MISSION KONFORM.' : `${corrections.length} ABWEICHUNG${corrections.length > 1 ? 'EN' : ''} ERKANNT.`}
                    </p>
                    {!isCompliant && (
                        <ul className="flex flex-col gap-1.5 text-neutral-300">
                            {corrections.map((line, i) => (
                                <li key={i}>— {line}</li>
                            ))}
                        </ul>
                    )}
                </div>

                <Pillar index="01" title="Physische Architektur">
                    <NumberField
                        label="Schritte heute"
                        unit="Schritte"
                        value={daily.steps}
                        onChange={(v) => patchDaily({ steps: v })}
                        placeholder="10.000–20.000"
                    />
                    <NumberField
                        label="Bankdrücken Arbeitsgewicht"
                        unit="kg"
                        value={benchWeight}
                        onChange={setBenchWeight}
                    />
                    <p className="text-xs text-neutral-600">
                        Baseline {BENCH_BASELINE_KG} kg —{' '}
                        {benchWeight >= BENCH_BASELINE_KG
                            ? `+${(benchWeight - BENCH_BASELINE_KG).toFixed(1)} kg mechanische Progression`
                            : `${(benchWeight - BENCH_BASELINE_KG).toFixed(1)} kg unter Benchmark`}
                    </p>
                    <Toggle
                        label="Macebell / Kettlebell-Flow vor der schweren Einheit"
                        checked={daily.warmupDone}
                        onChange={(v) => patchDaily({ warmupDone: v })}
                    />
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <Toggle label="Muscle-Ups" checked={daily.muscleUps} onChange={(v) => patchDaily({ muscleUps: v })} />
                        <Toggle label="Dips" checked={daily.dips} onChange={(v) => patchDaily({ dips: v })} />
                        <Toggle label="Core-Dominanz" checked={daily.core} onChange={(v) => patchDaily({ core: v })} />
                    </div>
                </Pillar>

                <Pillar index="02" title="Biochemischer Treibstoff">
                    <Toggle label="Zucker & Junkfood eliminiert" checked={daily.sugarFree} onChange={(v) => patchDaily({ sugarFree: v })} />
                    <NumberField
                        label="Hydration"
                        unit="Liter"
                        value={daily.hydrationLiters}
                        onChange={(v) => patchDaily({ hydrationLiters: v })}
                        placeholder="≥ 3"
                    />
                    <NumberField
                        label="Protein"
                        unit="g"
                        value={daily.proteinGrams}
                        onChange={(v) => patchDaily({ proteinGrams: v })}
                    />
                    <Toggle
                        label="Unverarbeitete, dichte Energiequellen"
                        checked={daily.wholeFoods}
                        onChange={(v) => patchDaily({ wholeFoods: v })}
                    />
                </Pillar>

                <Pillar index="03" title="Die Dopamin-Maschine">
                    <Toggle
                        label="Morgen begann mit Fokus, nicht mit Konsum"
                        checked={daily.noConsumMorning}
                        onChange={(v) => patchDaily({ noConsumMorning: v })}
                    />
                    <NumberField
                        label="Abgeschlossene Einheiten (Jahresziel)"
                        unit={`/ ${UNITS_TARGET}`}
                        value={unitsCompleted}
                        onChange={setUnitsCompleted}
                    />
                    <ProgressBar percent={unitsPercent} label={`${unitsCompleted} von ${UNITS_TARGET} Einheiten`} />
                    <p className="text-xs text-neutral-600">
                        {unitsRemaining} Einheiten offen bei {remaining} verbleibenden Tagen — erforderliches Tempo:{' '}
                        <span className="text-primary">{weeklyPace} / Woche</span>
                    </p>
                </Pillar>

                <Pillar index="04" title="Linguistische Chirurgie">
                    <div className="flex flex-col gap-3">
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs text-neutral-500">Innerer Täter (die Ausrede, der Angriffs-Satz)</span>
                            <textarea
                                value={taterDraft}
                                onChange={(e) => setTaterDraft(e.target.value)}
                                rows={2}
                                className="px-3 py-2 text-sm bg-black border border-neutral-700 text-neutral-100 focus:border-primary focus:outline-none"
                                placeholder="Was hat die Stimme heute gesagt?"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs text-neutral-500">Schutz-Sprache (die chirurgische Extraktion)</span>
                            <textarea
                                value={schutzDraft}
                                onChange={(e) => setSchutzDraft(e.target.value)}
                                rows={2}
                                className="px-3 py-2 text-sm bg-black border border-neutral-700 text-neutral-100 focus:border-primary focus:outline-none"
                                placeholder="Womit wird er ersetzt?"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={submitLanguageEntry}
                            className="self-start px-4 py-2 text-xs font-bold tracking-wide uppercase transition-colors bg-primary text-primary-content hover:bg-primary/85 disabled:cursor-default disabled:bg-neutral-800 disabled:text-neutral-600"
                            disabled={!taterDraft.trim() || !schutzDraft.trim()}
                        >
                            Extraktion protokollieren
                        </button>
                    </div>

                    {languageLog.length > 0 && (
                        <ul className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
                            {languageLog.map((entry, i) => (
                                <li key={i} className="flex flex-col gap-1 px-3 py-2 text-sm border border-neutral-800">
                                    <span className="font-mono text-xs text-neutral-600">{entry.date}</span>
                                    <span className="text-red-400 line-through decoration-red-700">{entry.tater}</span>
                                    <span className="text-primary">{entry.schutz}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </Pillar>

                <footer className="pt-6 text-xs text-center text-neutral-700 border-t border-neutral-900">
                    Jede Anfrage wird gegen die vier Säulen geprüft. Abweichung wird korrigiert, nicht entschuldigt.
                </footer>
            </div>
        </div>
    );
}
