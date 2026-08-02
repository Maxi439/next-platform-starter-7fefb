export const QUOTES = [
    'Du musst nicht voller Energie starten – nur bereit sein, den ersten kleinen Schritt zu gehen.',
    'Ruhe ist keine Unterbrechung deines Weges, sie ist Teil davon.',
    'Kleine, ehrliche Schritte tragen weiter als große, die du nicht durchhältst.',
    'Energie kehrt nicht von einem Tag auf den anderen zurück – aber sie kehrt zurück.',
    'Du darfst langsamer gehen und trotzdem vorankommen.',
    'Ein guter Tag beginnt oft mit einer kleinen, freundlichen Entscheidung für dich selbst.',
    'Nicht jede Erschöpfung ist Schwäche – manchmal ist sie ein ehrliches Signal.',
    'Fortschritt zeigt sich selten laut. Meistens zeigt er sich leise, im Alltag.',
    'Du musst nicht alles auf einmal ändern. Ein Baustein nach dem anderen genügt.',
    'Selbstmitgefühl ist kein Umweg zur Stärke, sondern der direkte Weg dorthin.'
];

export function getQuoteOfDay(date = new Date()) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return QUOTES[dayOfYear % QUOTES.length];
}
