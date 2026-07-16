import { Hero } from 'components/landing/hero';
import { Problem } from 'components/landing/problem';
import { Solution } from 'components/landing/solution';
import { Benefits } from 'components/landing/benefits';
import { Trust } from 'components/landing/trust';
import { Process } from 'components/landing/process';
import { Faq } from 'components/landing/faq';
import { Cta } from 'components/landing/cta';

export default function Page() {
    return (
        <div className="flex flex-col gap-16 sm:gap-24">
            <Hero />
            <Problem />
            <Solution />
            <Benefits />
            <Trust />
            <Process />
            <Faq />
            <Cta />
        </div>
    );
}
