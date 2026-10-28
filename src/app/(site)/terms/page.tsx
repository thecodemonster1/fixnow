import type {Metadata} from 'next';
import {PageHero} from '@/components/blocks';

export const metadata: Metadata = {title: 'Terms and conditions'};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms and conditions" text="Initial template · These terms need review by a Sri Lankan legal professional before publication." />
      <section className="section section-tight">
        <div className="wrap prose prose-narrow">
          <h2>Bookings and quotations</h2>
          <p>A booking sent through WhatsApp is a request and does not confirm a visit. FixNow will confirm the date and time with the customer, may inspect the site where useful, and will provide a price or quotation. Work proceeds after the customer accepts the price and scheduling is confirmed.</p>
          <h2>Scheduling and access</h2>
          <p>Customers should provide accurate job and location details and arrange reasonable access for agreed work. Preferred dates and time windows are subject to confirmation by FixNow.</p>
          <h2>Changes, cancellation and payment</h2>
          <p>Cancellation terms, payment timing, accepted methods, changes to scope and additional charges should be stated in the approved quotation or a written agreement.</p>
          <h2>Complaints and responsibilities</h2>
          <p>Customers may contact FixNow to raise concerns about completed work. Add the legal company identity, liability provisions, governing law, dispute process and other required provisions after legal review.</p>
        </div>
      </section>
    </>
  );
}
