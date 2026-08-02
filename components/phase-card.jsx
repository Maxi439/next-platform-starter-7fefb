import { Card } from './card';

export function PhaseCard({ phase, detailed = false }) {
    return (
        <Card className="h-full">
            <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full shrink-0 bg-primary text-primary-content">
                    {phase.number}
                </span>
                <p className="text-sm text-neutral-500">{phase.duration}</p>
            </div>
            <h3>{phase.title}</h3>
            <p>{detailed ? phase.description : phase.teaser}</p>
            {detailed && (
                <ul className="flex flex-col gap-2 mt-2 text-sm text-neutral-600">
                    {phase.tasks.map((task) => (
                        <li key={task.id} className="flex gap-2">
                            <span aria-hidden="true">•</span>
                            <span>{task.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}
