import type {Metadata} from 'next';
import {CtaBand, PageHero} from '@/components/blocks';

export const metadata: Metadata = {title: 'FAQ'};

const faqs = [
  ['How do I book a service?', 'Open the booking page, choose the service and problem, pick a date and time window, add your details, then tap “Book on WhatsApp”. WhatsApp opens with your booking written out — press Send.'],
  ['Do I need an app or an account?', 'No. You only need WhatsApp on your phone or computer.'],
  ['Is my booking confirmed once I send it?', 'A booking is a request. Our manager replies on WhatsApp to confirm the visit time, or suggests the nearest available slot.'],
  ['What if WhatsApp didn’t open?', 'On the confirmation screen you can open WhatsApp again or copy the booking message and paste it into a chat with us.'],
  ['How are prices worked out?', 'Prices depend on the job, materials, access and location. We confirm the price, or send a written quotation for bigger jobs, before any work starts.'],
  ['Do you use your own workers?', 'Yes. FixNow manages its own workforce and assigns our teams to approved jobs.'],
  ['Can I ask for a site inspection?', 'Yes. Mention it in the job description, or ask in the WhatsApp chat. We arrange inspections when they’re needed to quote accurately.'],
  ['Which locations do you serve?', 'We work across Sri Lanka. Add your city and district in the booking and we’ll confirm availability in your area.'],
  ['How do I pay?', 'Payment methods and timing are confirmed with your quotation. Nothing is charged on this website.'],
  ['Can I change or cancel a booking?', 'Yes — just reply in the same WhatsApp chat as early as you can. Cancellation terms for approved quotations are shared with the quote.'],
  ['What if I’m not happy with the work?', 'Message us in the same chat with your booking reference and we’ll review it with you.'],
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Help & answers" title={<>Frequently asked <span className="soft">questions.</span></>} text="Everything about booking on WhatsApp, pricing and what happens after you send." />
      <section className="section section-tight">
        <div className="wrap faq-page">
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}<span className="faq-plus" aria-hidden /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Still unsure?" text="Send a booking anyway — our manager will answer any questions in the chat before anything is confirmed." />
    </>
  );
}
