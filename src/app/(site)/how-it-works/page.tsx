import type {Metadata} from 'next';
import {CtaBand, PageHero} from '@/components/blocks';

export const metadata: Metadata = {title: 'How it works'};

const steps = [
  ['Pick the service', 'Choose from 20 services and tap the problems that apply — or describe it in your own words.'],
  ['Choose a date and time', 'Pick a day within the next two months and a time window: morning, midday, afternoon or evening.'],
  ['Add your details', 'Your name, number and the address for the visit, plus a nearby landmark to help our team find you.'],
  ['Send it on WhatsApp', 'We format everything into one clear message. WhatsApp opens with it ready — you press Send.'],
  ['We confirm the visit', 'Our manager replies in the same chat to confirm the time, or suggests the nearest free slot.'],
  ['Inspect, quote, fix', 'We agree the price before any work starts. Our in-house team completes the job, then we follow up.'],
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="How it works" title={<>From “it’s broken” to booked <span className="soft">in about a minute.</span></>} text="No app, no account, no call centre. Your booking is a WhatsApp message to our manager — and every reply comes back in that same chat." />
      <section className="section section-tight">
        <div className="wrap">
          <ol className="process-grid">
            {steps.map(([title, text], i) => (
              <li key={title} className="process-card reveal" data-wa={i === 3 || undefined}>
                <span className="how-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="note-card">
            <h2>A booking is a request, not a contract.</h2>
            <p>Sending a booking doesn’t commit you to anything or charge you. Our manager confirms the visit time with you, and for bigger jobs we inspect first and send a written quotation. Work starts only after you approve the price.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
