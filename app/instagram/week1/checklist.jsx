'use client';
import { useState, useEffect } from 'react';

const days = [
    {
        day: 1,
        name: 'Montag',
        subtitle: 'Account Setup + Erstes Reel',
        tasks: [
            { id: 'mon-1', time: '09:00', duration: '15 Min', task: 'Instagram auf Business Account umstellen (Einstellungen → Konto)' },
            { id: 'mon-2', time: '09:15', duration: '20 Min', task: 'Bio ausfüllen — Template aus File #1 Phase 0 verwenden' },
            { id: 'mon-3', time: '09:35', duration: '15 Min', task: 'Professionelles Profilbild hochladen' },
            { id: 'mon-4', time: '09:50', duration: '30 Min', task: 'Linktree einrichten: Calendly + WhatsApp + Website verlinken' },
            { id: 'mon-5', time: '10:20', duration: '20 Min', task: '5 leere Highlights anlegen und Cover-Bilder in Canva erstellen' },
            { id: 'mon-6', time: '10:40', duration: '10 Min', task: 'CapCut herunterladen und Einführungsvideo anschauen' },
            { id: 'mon-7', time: '11:00', duration: '30 Min', task: 'Reel #1 Skript lesen + Equipment aufbauen (Ring Light, Mic)' },
            { id: 'mon-8', time: '11:30', duration: '30 Min', task: 'Reel #1 drehen (Finanzierungs-Vergleich) — mind. 3 Takes' },
            { id: 'mon-9', time: '14:00', duration: '45 Min', task: 'Reel #1 in CapCut schneiden + Untertitel + Musik hinzufügen' },
            { id: 'mon-10', time: '14:45', duration: '15 Min', task: 'Caption aus File #2 kopieren + Hashtags hinzufügen' },
        ],
    },
    {
        day: 2,
        name: 'Dienstag',
        subtitle: 'n8n Setup + Auto-Reply Templates',
        tasks: [
            { id: 'tue-1', time: '09:00', duration: '20 Min', task: 'n8n Account erstellen (cloud.n8n.io) oder VPS bestellen (Hetzner)' },
            { id: 'tue-2', time: '09:20', duration: '15 Min', task: 'HubSpot Account erstellen + Pipeline "Instagram Leads" anlegen' },
            { id: 'tue-3', time: '09:35', duration: '20 Min', task: 'Calendly Pro Setup + zwei Events erstellen (15-Min + 30-Min)' },
            { id: 'tue-4', time: '09:55', duration: '30 Min', task: 'DM Template A (OFFMARKET) in n8n einrichten + testen' },
            { id: 'tue-5', time: '10:25', duration: '20 Min', task: 'DM Template B (MATCH) und C (DEAL) einrichten' },
            { id: 'tue-6', time: '10:45', duration: '15 Min', task: 'Telegram Bot erstellen + n8n-Notification für heiße Leads' },
            { id: 'tue-7', time: '09:00', duration: '(abends)', task: 'Reel #1 um 09:00 Uhr publishen — Caption + Hashtags prüfen' },
            { id: 'tue-8', time: 'laufend', duration: '30 Min', task: 'Auf 10 relevante Accounts kommentieren (Comment Seeding)' },
            { id: 'tue-9', time: 'abends', duration: '15 Min', task: 'Erste Story posten (Reel teilen + "Was denkst du?" Poll)' },
        ],
    },
    {
        day: 3,
        name: 'Mittwoch',
        subtitle: 'Reel #2 drehen + Analytics check',
        tasks: [
            { id: 'wed-1', time: '08:00', duration: '10 Min', task: 'Reel #1 Analytics checken: Views, Saves, Shares, Kommentare' },
            { id: 'wed-2', time: '08:10', duration: '5 Min', task: 'DM-Postfach prüfen: Neue Anfragen in HubSpot anlegen' },
            { id: 'wed-3', time: '09:00', duration: '30 Min', task: 'Reel #2 Skript lesen (Setter vs. Closer) + Aufnahme' },
            { id: 'wed-4', time: '09:30', duration: '45 Min', task: 'Reel #2 in CapCut bearbeiten + exportieren' },
            { id: 'wed-5', time: '10:15', duration: '30 Min', task: 'n8n Workflow testen: Test-DM mit "OFFMARKET" senden' },
            { id: 'wed-6', time: '10:45', duration: '20 Min', task: 'HubSpot Pipeline prüfen: Leads aus DMs korrekt angelegt?' },
            { id: 'wed-7', time: '11:05', duration: '15 Min', task: 'WhatsApp Business Number in Linktree + DM-Templates hinterlegen' },
            { id: 'wed-8', time: '14:00', duration: '30 Min', task: '20 potenzielle Leads manuell kontaktieren (DM-Outreach)' },
            { id: 'wed-9', time: 'abends', duration: '15 Min', task: '3 Stories posten + Story-Poll schalten' },
        ],
    },
    {
        day: 4,
        name: 'Donnerstag',
        subtitle: 'Reel #3 + Hashtag-Strategie',
        tasks: [
            { id: 'thu-1', time: '08:00', duration: '15 Min', task: 'Analytics: Reel #1 vs. Benchmark vergleichen (Saves, Watch-Time)' },
            { id: 'thu-2', time: '08:15', duration: '10 Min', task: 'Alle DM-Antworten beantworten / Leads qualifizieren' },
            { id: 'thu-3', time: '09:00', duration: '30 Min', task: 'Reel #3 drehen (Quiz-Matching) — kurzes Format (20–30 Sek.)' },
            { id: 'thu-4', time: '09:30', duration: '30 Min', task: 'Reel #3 in CapCut schneiden' },
            { id: 'thu-5', time: '10:00', duration: '20 Min', task: 'Hashtag-Liste erstellen: 10 klein + 10 mittel + 10 groß' },
            { id: 'thu-6', time: '10:20', duration: '20 Min', task: 'DM Template D (SETTER) für Kevin + Mehmet Recruiting aktivieren' },
            { id: 'thu-7', time: '10:40', duration: '30 Min', task: 'Kevin + Mehmet über das System briefen (Prozess + DM-Antworten)' },
            { id: 'thu-8', time: '14:00', duration: '20 Min', task: 'Reel #2 als Story resharen + "Was ist deine Rolle?" Poll' },
            { id: 'thu-9', time: 'abends', duration: '20 Min', task: 'Comment Seeding: 10 echte Kommentare auf relevante Accounts' },
        ],
    },
    {
        day: 5,
        name: 'Freitag',
        subtitle: 'Reel #2 live + Setter Recruiting',
        tasks: [
            { id: 'fri-1', time: '09:00', duration: '5 Min', task: 'Reel #2 publishen (Setter vs. Closer) — Caption + Hashtags' },
            { id: 'fri-2', time: '09:05', duration: '15 Min', task: 'DM-Postfach checken + neue Leads qualifizieren' },
            { id: 'fri-3', time: '09:20', duration: '30 Min', task: 'Reel #4 Skript vorbereiten (Success Story — persönlich anpassen)' },
            { id: 'fri-4', time: '09:50', duration: '20 Min', task: 'Story Q&A starten: "Stell mir eine Frage zum Off-Market System"' },
            { id: 'fri-5', time: '10:10', duration: '30 Min', task: 'Lead Review: alle neuen DMs → HubSpot Kontakte anlegen' },
            { id: 'fri-6', time: '10:40', duration: '30 Min', task: 'Setter Recruiting Pitch vorbereiten (für Kevin + Mehmet oder neue)' },
            { id: 'fri-7', time: '14:00', duration: '20 Min', task: 'Reel #3 publishen (Quiz-Matching) — Kommentare sofort beantworten' },
            { id: 'fri-8', time: '14:20', duration: '20 Min', task: 'Q&A-Antworten aus Story als Reel-Ideen festhalten' },
        ],
    },
    {
        day: 6,
        name: 'Samstag',
        subtitle: 'Content Batching + Highlights fertig',
        tasks: [
            { id: 'sat-1', time: '09:00', duration: '60 Min', task: 'Content Batch: Reel #5 (Fehler-Liste) drehen und editieren' },
            { id: 'sat-2', time: '10:00', duration: '60 Min', task: 'Content Batch: Reel #6 (Day-in-Life) mit B-Roll drehen' },
            { id: 'sat-3', time: '11:00', duration: '30 Min', task: 'Highlight Cover in Canva designen (5 Highlights fertigstellen)' },
            { id: 'sat-4', time: '11:30', duration: '30 Min', task: 'Reel #3 Analytics: Wie viele Kommentare mit 1/2/3/4?' },
            { id: 'sat-5', time: '12:00', duration: '30 Min', task: 'Woche 1 Analytics zusammenfassen (Google Sheet oder Notion)' },
            { id: 'sat-6', time: '14:00', duration: '60 Min', task: 'Content-Kalender Woche 2 planen (welche Reels an welchem Tag)' },
            { id: 'sat-7', time: '15:00', duration: '20 Min', task: 'Alle geplanten Reels in CapCut finalisieren und exportieren' },
        ],
    },
    {
        day: 7,
        name: 'Sonntag',
        subtitle: 'Performance Review + Woche 2 planen',
        tasks: [
            { id: 'sun-1', time: '10:00', duration: '30 Min', task: 'Performance Review: Top-Reel der Woche identifizieren' },
            { id: 'sun-2', time: '10:30', duration: '20 Min', task: 'Bottom-Performer analysieren: Was hat nicht funktioniert?' },
            { id: 'sun-3', time: '10:50', duration: '20 Min', task: 'Woche 2 Hook-Varianten für Top-Reel entwickeln (A/B Test)' },
            { id: 'sun-4', time: '11:10', duration: '15 Min', task: 'n8n Workflow Optimierungen (Antwort-Templates anpassen)' },
            { id: 'sun-5', time: '11:25', duration: '15 Min', task: 'HubSpot Pipeline Status: Leads, Termine, Deals?' },
            { id: 'sun-6', time: '11:40', duration: '20 Min', task: 'Team-Meeting Agenda für Montag vorbereiten' },
            { id: 'sun-7', time: '12:00', duration: '15 Min', task: 'Alle Reels für Woche 2 in Instagram vorplanen (Creator Studio)' },
        ],
    },
];

function CheckIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="text-primary-content">
            <path d="M8.5 2.5L4 7.5 1.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    );
}

export function Week1Checklist() {
    const [checked, setChecked] = useState({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const saved = localStorage.getItem('mre-week1-v1');
            if (saved) setChecked(JSON.parse(saved));
        } catch {}
    }, []);

    function toggle(id) {
        const next = { ...checked, [id]: !checked[id] };
        setChecked(next);
        try {
            localStorage.setItem('mre-week1-v1', JSON.stringify(next));
        } catch {}
    }

    function resetAll() {
        setChecked({});
        try {
            localStorage.removeItem('mre-week1-v1');
        } catch {}
    }

    const allTasks = days.flatMap((d) => d.tasks);
    const total = allTasks.length;
    const done = mounted ? allTasks.filter((t) => checked[t.id]).length : 0;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;

    return (
        <div>
            <div className="mb-8 p-5 border border-white/10 rounded-lg bg-white/5">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <span className="text-sm text-white/50">Gesamtfortschritt</span>
                        {mounted && (
                            <span className="ml-3 text-sm font-mono font-semibold text-primary">
                                {done}/{total} ({progress}%)
                            </span>
                        )}
                    </div>
                    {mounted && done > 0 && (
                        <button
                            onClick={resetAll}
                            className="text-xs text-white/30 hover:text-white/60 transition-colors"
                        >
                            Zurücksetzen
                        </button>
                    )}
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${mounted ? progress : 0}%` }}
                    />
                </div>
                {mounted && progress === 100 && (
                    <p className="mt-3 text-sm text-primary font-semibold text-center">
                        Woche 1 abgeschlossen — System is live!
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-8">
                {days.map((day) => {
                    const dayDone = mounted ? day.tasks.filter((t) => checked[t.id]).length : 0;
                    const dayComplete = mounted && dayDone === day.tasks.length;

                    return (
                        <div key={day.day}>
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border flex-shrink-0 transition-colors ${
                                        dayComplete
                                            ? 'bg-primary border-primary text-primary-content'
                                            : 'bg-white/5 border-white/20 text-white'
                                    }`}
                                >
                                    {day.day}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold">{day.name}</div>
                                    <div className="text-sm text-white/40">{day.subtitle}</div>
                                </div>
                                {mounted && (
                                    <div className="text-sm font-mono text-white/30 flex-shrink-0">
                                        {dayDone}/{day.tasks.length}
                                    </div>
                                )}
                            </div>

                            <div className="ml-14 flex flex-col gap-2">
                                {day.tasks.map((task) => {
                                    const isDone = mounted && checked[task.id];
                                    return (
                                        <button
                                            key={task.id}
                                            onClick={() => toggle(task.id)}
                                            className={`w-full text-left p-3.5 rounded-lg border transition-all duration-150 cursor-pointer ${
                                                isDone
                                                    ? 'border-primary/20 bg-primary/5'
                                                    : 'border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-white/20'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                                                        isDone
                                                            ? 'border-primary bg-primary'
                                                            : 'border-white/20 bg-white/5'
                                                    }`}
                                                >
                                                    {isDone && <CheckIcon />}
                                                </div>
                                                <span
                                                    className={`flex-1 text-sm transition-colors ${
                                                        isDone ? 'line-through text-white/30' : 'text-white/70'
                                                    }`}
                                                >
                                                    {task.task}
                                                </span>
                                                <div className="flex gap-3 text-xs text-white/25 flex-shrink-0 ml-2">
                                                    <span className="font-mono">{task.time}</span>
                                                    <span>{task.duration}</span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
