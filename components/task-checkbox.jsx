'use client';

import { useTransition } from 'react';
import { toggleTaskAction } from 'lib/actions/dashboard-actions';

export function TaskCheckbox({ phaseId, taskId, label, checked }) {
    const [isPending, startTransition] = useTransition();

    return (
        <label className={`flex items-start gap-3 cursor-pointer select-none ${isPending ? 'opacity-60' : ''}`}>
            <input
                type="checkbox"
                defaultChecked={checked}
                disabled={isPending}
                onChange={() => startTransition(() => toggleTaskAction(phaseId, taskId))}
                className="w-4 h-4 mt-1 accent-primary shrink-0"
            />
            <span className={checked ? 'line-through text-neutral-500' : ''}>{label}</span>
        </label>
    );
}
