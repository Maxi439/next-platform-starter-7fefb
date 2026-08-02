import Link from 'next/link';
import { Card } from 'components/card';

export const metadata = {
    title: 'Über mich'
};

const values = [
    {
        title: 'Ehrlich statt beschönigend',
        text: 'Ich verspreche dir keine Wunder über Nacht – sondern einen realistischen, gut begleiteten Weg.'
    },
    {
        title: 'Kleine Schritte statt Druck',
        text: 'Veränderung passiert selten durch Willenskraft allein, sondern durch machbare, wiederholbare Schritte.'
    },
    {
        title: 'Du kennst dich am besten',
        text: 'Ich bringe Struktur und Erfahrung mit – die Antworten für dein Leben findest am Ende du selbst.'
    }
];

export default function UeberMichPage() {
    return (
        <div className="flex flex-col gap-16 pb-24">
            <section className="flex flex-col gap-4">
                <h1>Über mich</h1>
                <p className="max-w-2xl text-lg text-neutral-300">
                    Ich begleite Menschen, die sich erschöpft, antriebslos oder ausgebrannt fühlen, dabei, Schritt für
                    Schritt wieder ein tragfähiges Mindset aufzubauen – ohne toxische Positivität und ohne die
                    Erwartung, sofort wieder &bdquo;funktionieren&ldquo; zu müssen.
                </p>
                <p className="max-w-2xl text-neutral-300">
                    Mein eigener Weg durch eine Phase intensiver Erschöpfung hat mir gezeigt, wie wenig pauschale
                    Tipps helfen und wie viel ein individuell begleiteter, in kleine Schritte zerlegter Prozess
                    bewirken kann. Daraus ist das AUFWIND-Programm entstanden.
                </p>
            </section>

            <section className="flex flex-col gap-8">
                <h2>Wofür ich stehe</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    {values.map((value) => (
                        <Card key={value.title}>
                            <h3 className="text-neutral-900">{value.title}</h3>
                            <p>{value.text}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2>Wichtig zu wissen</h2>
                <p className="max-w-2xl text-neutral-300">
                    AUFWIND ist Coaching, keine Therapie. Bei anhaltender Erschöpfung, Verdacht auf Burnout oder
                    depressiven Symptomen ist der erste Weg immer zu einer Ärztin, einem Arzt oder einer
                    Psychotherapiepraxis sinnvoll – gerne begleite ich dich zusätzlich auf der Mindset-Ebene.
                </p>
            </section>

            <section className="flex flex-col items-start gap-4">
                <h2>Lust auf ein erstes Gespräch?</h2>
                <Link href="/kontakt" className="btn btn-lg">
                    Kontakt aufnehmen
                </Link>
            </section>
        </div>
    );
}
