import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {WhatsAppIcon} from '@/components/icons';
import {services} from '@/lib/services';

export function PageHero({eyebrow, title, text, children}: {eyebrow: string; title: React.ReactNode; text?: string; children?: React.ReactNode}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="eyebrow"><span className="dot" />{eyebrow}</p>
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
    </section>
  );
}

export function Marquee() {
  const items = services.map((s) => s.name);
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {[...items, ...items].map((name, i) => <span key={i}>{name}<i>✱</i></span>)}
      </div>
    </div>
  );
}

export function CtaBand({title = 'Need something fixed?', text = 'Pick the job and a date. Your booking goes straight to our manager on WhatsApp.'}: {title?: string; text?: string}) {
  return (
    <section className="cta-band">
      <div className="wrap cta-inner">
        <div>
          <p className="eyebrow"><span className="dot dot-ink" />Takes about a minute</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link href="/book" className="button button-lg"><WhatsAppIcon /> Book on WhatsApp</Link>
          <Link href="/services" className="text-link">See all services <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
