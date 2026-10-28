import type {Metadata} from 'next';
import {BookingFlow} from '@/components/booking-flow';
import {services} from '@/lib/services';

export const metadata: Metadata = {
  title: 'Book on WhatsApp',
  description: 'Pick a service, choose a date and time, and send your FixNow booking to our manager on WhatsApp.',
};

export default function BookPage({searchParams}: {searchParams: {service?: string}}) {
  const initial = services.find((s) => s.slug === searchParams.service)?.name;
  return (
    <section className="book">
      <div className="wrap">
        <div className="book-head">
          <p className="eyebrow"><span className="dot" />Booking · takes about a minute</p>
          <h1>Book a fix on WhatsApp.</h1>
          <p className="lead">Tell us what’s wrong and when suits you. We turn it into one clear WhatsApp message for our manager — you just press Send.</p>
        </div>
        <BookingFlow key={initial} initialService={initial} />
      </div>
    </section>
  );
}
