export const MISSION_START = new Date(2026, 6, 2);
export const MISSION_END = new Date(2026, 11, 31);
export const MISSION_TOTAL_DAYS = 183;
export const UNITS_TARGET = 150;
export const BENCH_BASELINE_KG = 70;
export const STEPS_TARGET_MIN = 10000;
export const STEPS_TARGET_MAX = 20000;
export const HYDRATION_TARGET_LITERS = 3;

export function todayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function daysRemaining() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.round((MISSION_END.getTime() - today.getTime()) / 86400000) + 1;
    return Math.max(0, Math.min(MISSION_TOTAL_DAYS, diff));
}

export const defaultDaily = {
    steps: 0,
    warmupDone: false,
    muscleUps: false,
    dips: false,
    core: false,
    sugarFree: false,
    hydrationLiters: 0,
    proteinGrams: 0,
    wholeFoods: false,
    noConsumMorning: false
};

export function buildAudit({ daily, unitsCompleted, remaining }) {
    const corrections = [];

    if (!daily.steps || daily.steps < STEPS_TARGET_MIN) {
        corrections.push('Schritte unter 10.000. Metabolische Konditionierung unterbrochen. Bewege dich.');
    }
    if (!daily.warmupDone) {
        corrections.push('Keine Gelenkpanzerung erfasst. Macebell- und Kettlebell-Flow vor jeder schweren Einheit ist nicht verhandelbar.');
    }
    if (!daily.sugarFree) {
        corrections.push('Zucker nicht eliminiert. Essen ist Baumaterial, kein Trost. Korrigiere die Zufuhr.');
    }
    if (!daily.hydrationLiters || daily.hydrationLiters < HYDRATION_TARGET_LITERS) {
        corrections.push('Hydration unzureichend. Das System braucht Wasser, keine Ausreden.');
    }
    if (!daily.proteinGrams) {
        corrections.push('Kein Protein erfasst. Gewebereparatur steht still.');
    }
    if (!daily.noConsumMorning) {
        corrections.push('Der Morgen begann mit Konsum statt Fokus. Dopamin-Maschine fehlgesteuert.');
    }

    const unitsRemaining = Math.max(0, UNITS_TARGET - unitsCompleted);
    const paceNeeded = remaining > 0 ? unitsRemaining / remaining : unitsRemaining;
    if (paceNeeded > 1.001) {
        corrections.push(
            `Tempo unzureichend für ${UNITS_TARGET} Einheiten. Erforderlich: ${paceNeeded.toFixed(2)} Einheiten/Tag ab jetzt.`
        );
    }

    return corrections;
}
