import { Week1Checklist } from './checklist';

export const metadata = {
    title: 'Woche 1 Checkliste — MRE Instagram System'
};

export default function Week1Page() {
    return (
        <div className="flex flex-col gap-10">
            <section>
                <div className="mb-3 text-xs font-mono tracking-widest uppercase text-primary">File #4</div>
                <h1 className="mb-4">Woche 1 Checkliste</h1>
                <p className="text-lg text-white/60 max-w-2xl">
                    Tag-für-Tag Umsetzungsplan für die erste Woche. Hake jeden Task ab sobald er erledigt ist —
                    Fortschritt wird im Browser gespeichert.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                        { label: 'Gesamt-Tasks', value: '60' },
                        { label: 'Reels produziert', value: '3–4' },
                        { label: 'System live', value: 'Tag 2' },
                    ].map((s) => (
                        <div key={s.label} className="p-4 border border-white/10 rounded-lg bg-white/5">
                            <div className="text-2xl font-bold text-primary mb-1">{s.value}</div>
                            <div className="text-xs text-white/40">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <Week1Checklist />
        </div>
    );
}
