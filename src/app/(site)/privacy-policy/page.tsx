import type {Metadata} from 'next';
import {PageHero} from '@/components/blocks';

export const metadata: Metadata = {title: 'Privacy policy'};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" text="Initial template · Company-specific details and legal terms require review before publication." />
      <section className="section section-tight">
        <div className="wrap prose prose-narrow">
          <h2>Information we collect</h2>
          <p>When you make a booking, FixNow receives the details you enter: your name, phone number, the service and problem, your preferred date and time, the property address and location notes, and any description or photos you choose to send.</p>
          <h2>How bookings are sent</h2>
          <p>The booking page does not store your details on our servers. It prepares a message that you send to FixNow through WhatsApp, a service operated by Meta. WhatsApp’s own privacy policy applies to messages sent through it.</p>
          <h2>How we use information</h2>
          <p>We use this information to respond to your booking, discuss requirements, arrange inspections, prepare quotations, schedule work, manage payments and provide customer support.</p>
          <h2>Sharing and retention</h2>
          <p>Information may be shared with authorised FixNow staff who need it to manage your booking. Retention periods, processors and deletion procedures must be confirmed by the company before launch.</p>
          <h2>Security and contact</h2>
          <p>FixNow should apply appropriate access controls and security safeguards. Add the responsible legal entity, privacy contact, effective date and applicable rights after legal review.</p>
        </div>
      </section>
    </>
  );
}
