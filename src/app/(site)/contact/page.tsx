import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight, Mail, MapPin, Phone} from 'lucide-react';
import {PageHero} from '@/components/blocks';
import {WhatsAppIcon} from '@/components/icons';
import {site, whatsappLink} from '@/lib/site';

export const metadata: Metadata = {title: 'Contact'};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>We’re a message away.</>} text="The fastest way to reach us is WhatsApp. For a repair or service, use the booking page so we get every detail in one go." />
      <section className="section section-tight">
        <div className="wrap contact-grid">
          <Link href="/book" className="contact-card contact-card-wa">
            <WhatsAppIcon size={30} />
            <h2>Book a service</h2>
            <p>Pick the job and a date — your booking is sent to our manager on WhatsApp.</p>
            <span className="text-link">Start booking <ArrowUpRight size={16} /></span>
          </Link>
          <a href={whatsappLink('Hi FixNow, I have a question.')} target="_blank" rel="noopener noreferrer" className="contact-card">
            <WhatsAppIcon size={30} />
            <h2>Ask a question</h2>
            <p>General questions, quotes or an existing booking — chat with us directly.</p>
            <span className="text-link">Open WhatsApp <ArrowUpRight size={16} /></span>
          </a>
          <div className="contact-card contact-card-plain">
            <ul className="contact-list">
              <li><Phone size={18} /> {site.phone ? <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a> : <span>Phone number coming soon</span>}</li>
              <li><Mail size={18} /> {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <span>Email coming soon</span>}</li>
              <li><MapPin size={18} /> <span>Serving customers across Sri Lanka</span></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
