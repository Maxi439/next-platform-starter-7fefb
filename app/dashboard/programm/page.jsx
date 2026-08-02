import { Card } from 'components/card';
import { ProgressBar } from 'components/progress-bar';
import { TaskCheckbox } from 'components/task-checkbox';
import { computeProgress } from 'data/program';
import { requireUser } from 'lib/current-user';

export const metadata = {
    title: 'Mein Programm'
};

export default async function DashboardProgrammPage() {
    const user = await requireUser();
    const { perPhase, percent, completedTasks, totalTasks } = computeProgress(user.progress);

    return (
        <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-2">
                <h1>Mein Programm</h1>
                <p className="text-neutral-300">
                    Hak ab, was du diese Woche geschafft hast. Es gibt keine Reihenfolge, die du erzwingen musst –
                    geh in deinem Tempo.
                </p>
                <ProgressBar percent={percent} label={`Gesamtfortschritt: ${completedTasks}/${totalTasks} Schritte`} />
            </section>

            <section className="flex flex-col gap-6">
                {perPhase.map((phase) => (
                    <Card key={phase.id}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-sm text-neutral-500">
                                    Phase {phase.number} · {phase.duration}
                                </p>
                                <h3 className="text-neutral-900">{phase.title}</h3>
                            </div>
                            <p className="text-sm text-neutral-500">
                                {phase.completedCount}/{phase.totalCount}
                            </p>
                        </div>
                        <p>{phase.description}</p>
                        <div className="flex flex-col gap-3">
                            {phase.tasks.map((task) => (
                                <TaskCheckbox
                                    key={task.id}
                                    phaseId={phase.id}
                                    taskId={task.id}
                                    label={task.label}
                                    checked={!!user.progress?.[phase.id]?.[task.id]}
                                />
                            ))}
                        </div>
                    </Card>
                ))}
            </section>
        </div>
    );
}
