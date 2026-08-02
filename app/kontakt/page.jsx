import { ContactForm } from 'components/contact-form';

export const metadata = {
    title: 'Kontakt'
};

export default function KontaktPage() {
    return (
        <div className="flex flex-col gap-12 pb-24">
            <section className="flex flex-col gap-4">
                <h1>Kontakt</h1>
                <p className="max-w-2xl text-lg text-neutral-300">
                    Schreib mir kurz, was dich gerade beschäftigt. Ich melde mich in der Regel innerhalb von 2
                    Werktagen bei dir – auch wenn du dir noch unsicher bist, ob Coaching das Richtige für dich ist.
                </p>
            </section>
            <section className="flex justify-center sm:justify-start">
                <ContactForm />
            </section>
        </div>
    );
}
