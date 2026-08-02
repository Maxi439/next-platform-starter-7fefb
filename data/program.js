export const PHASES = [
    {
        id: 'standortbestimmung',
        number: 1,
        title: 'Standortbestimmung',
        duration: 'Woche 1–2',
        teaser: 'Erkennen, wo deine Energie gerade wirklich hingeht.',
        description:
            'Bevor wir etwas aufbauen, schauen wir ehrlich hin: Wie erschöpft bist du wirklich, wo genau verlierst du Energie, und welche kleinen Ressourcen hast du noch? Kein Druck, keine Bewertung – nur Klarheit als Ausgangspunkt.',
        tasks: [
            { id: 'energie-check', label: 'Ersten Energie-Check-in im Dashboard ausfüllen' },
            { id: 'energiefresser', label: 'Die drei größten "Energiefresser" im Alltag notieren' },
            { id: 'ressourcen', label: 'Drei Dinge aufschreiben, die dir noch (etwas) Kraft geben' },
            { id: 'ist-zustand', label: 'Kurze Standortbestimmung: Wo stehe ich gerade, ohne Selbstkritik?' }
        ]
    },
    {
        id: 'fundament',
        number: 2,
        title: 'Fundament & Basis-Energie',
        duration: 'Woche 3–4',
        teaser: 'Die körperliche Basis stabilisieren, bevor das Mindset trägt.',
        description:
            'Mindset-Arbeit auf leerem Tank funktioniert nicht. In dieser Phase bauen wir ein realistisches Fundament aus Schlaf, Mikro-Pausen und Bewegung – in kleinen, machbaren Schritten, nicht als weiteres To-do, das Druck macht.',
        tasks: [
            { id: 'schlafroutine', label: 'Eine feste, realistische Schlafenszeit für diese Woche festlegen' },
            { id: 'mikropausen', label: 'Zwei Mikro-Pausen (5 Min.) fest im Tagesablauf verankern' },
            { id: 'bewegung', label: 'Eine kleine Bewegungseinheit einbauen, die wirklich guttut' },
            { id: 'grenzen-basis', label: 'Eine Verpflichtung identifizieren, die diese Woche gestrichen oder verschoben wird' }
        ]
    },
    {
        id: 'glaubenssaetze',
        number: 3,
        title: 'Glaubenssätze & Denkmuster',
        duration: 'Woche 5–7',
        teaser: 'Die inneren Sätze hinterfragen, die dir heimlich Energie ziehen.',
        description:
            'Viele Erschöpfungs-Spiralen werden durch Gedanken wie "Ich muss das allein schaffen" oder "Ausruhen ist Schwäche" befeuert. Wir machen diese Glaubenssätze sichtbar und entwickeln gemeinsam freundlichere, tragfähigere Alternativen.',
        tasks: [
            { id: 'glaubenssaetze-sammeln', label: 'Drei wiederkehrende, energieraubende Gedanken sammeln' },
            { id: 'reframing', label: 'Für einen Glaubenssatz eine mitfühlendere Formulierung finden' },
            { id: 'selbstmitgefuehl', label: 'Eine Übung zu Selbstmitgefühl ausprobieren' },
            { id: 'innerer-kritiker', label: 'Bemerken und notieren, wann der "innere Kritiker" am lautesten ist' }
        ]
    },
    {
        id: 'gewohnheiten',
        number: 4,
        title: 'Neue Gewohnheiten & Fokus',
        duration: 'Woche 8–10',
        teaser: 'Kleine, tragfähige Rituale statt großer Vorsätze.',
        description:
            'Jetzt entstehen neue, alltagstaugliche Routinen: klare Prioritäten, bewusstes Nein-Sagen und ein Fokus-Ritual, das dir hilft, Energie gezielt einzusetzen statt sie zu verzetteln.',
        tasks: [
            { id: 'prioritaeten', label: 'Die drei wichtigsten Prioritäten der Woche festlegen' },
            { id: 'nein-sagen', label: 'Einmal bewusst Nein zu einer zusätzlichen Aufgabe sagen' },
            { id: 'fokus-ritual', label: 'Ein kleines Start-Ritual für konzentrierte Arbeitsphasen einführen' },
            { id: 'abend-reflexion', label: 'An drei Abenden kurz reflektieren: Was hat heute Energie gegeben?' }
        ]
    },
    {
        id: 'integration',
        number: 5,
        title: 'Integration & Wachstum',
        duration: 'Woche 11–12',
        teaser: 'Das neue Mindset stabilisieren und rückfallsicher machen.',
        description:
            'Zum Abschluss verbinden wir alle Bausteine zu einem persönlichen System, das auch an schwierigen Tagen trägt. Wir planen bewusst für Rückschritte und setzen dir ein klares, motivierendes Ziel für die Zeit danach.',
        tasks: [
            { id: 'rueckfallplan', label: 'Einen persönlichen Plan für energiearme Tage aufschreiben' },
            { id: 'system', label: 'Die drei wichtigsten neuen Routinen als festes System zusammenfassen' },
            { id: 'rueckblick', label: 'Rückblick: Vergleiche deinen ersten mit deinem letzten Energie-Check-in' },
            { id: 'naechstes-ziel', label: 'Ein konkretes, motivierendes Ziel für die nächsten drei Monate festlegen' }
        ]
    }
];

export function getPhase(phaseId) {
    return PHASES.find((phase) => phase.id === phaseId);
}

export function getTotalTaskCount() {
    return PHASES.reduce((sum, phase) => sum + phase.tasks.length, 0);
}

export function computeProgress(progress = {}) {
    const totalTasks = getTotalTaskCount();
    let completedTasks = 0;

    const perPhase = PHASES.map((phase) => {
        const done = phase.tasks.filter((task) => progress?.[phase.id]?.[task.id]).length;
        completedTasks += done;
        return {
            ...phase,
            completedCount: done,
            totalCount: phase.tasks.length,
            percent: Math.round((done / phase.tasks.length) * 100)
        };
    });

    return {
        perPhase,
        totalTasks,
        completedTasks,
        percent: totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
}

export function getCurrentPhase(progress = {}) {
    const { perPhase } = computeProgress(progress);
    return perPhase.find((phase) => phase.percent < 100) || perPhase[perPhase.length - 1];
}
