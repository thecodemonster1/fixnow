import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowRight, Check} from 'lucide-react';
import {CtaBand} from '@/components/blocks';
import {ServiceIcon, WhatsAppIcon} from '@/components/icons';
import {ServiceCard} from '@/components/service-card';
import {services} from '@/lib/services';

export function generateStaticParams() {
  return services.map((s) => ({slug: s.slug}));
}

export function generateMetadata({params}: {params: {slug: string}}): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  return service ? {title: service.name, description: `${service.description} Book FixNow ${service.name.toLowerCase()} on WhatsApp.`} : {};
}

export default function ServiceDetail({params}: {params: {slug: string}}) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();
  const index = services.indexOf(service);
  const related = services.filter((s) => s.group === service.group && s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <section className="page-hero service-hero">
        <div className="wrap service-hero-grid">
          <div>
            <p className="eyebrow"><span className="dot" />Services / {service.group}</p>
            <h1>{service.name}</h1>
            <p className="lead">{service.description} Book a visit from FixNow’s own team and get a clear price before any work starts.</p>
            <div className="hero-actions">
              <Link href={`/book?service=${service.slug}`} className="button button-wa button-lg"><WhatsAppIcon /> Book {service.name.toLowerCase()}</Link>
              <Link href="/services" className="button button-ghost button-lg">All services</Link>
            </div>
          </div>
          <div className="service-hero-mark" aria-hidden>
            <span className="mono">{String(index + 1).padStart(2, '0')} / {services.length}</span>
            <ServiceIcon name={service.icon} size={120} />
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap detail-grid">
          <div>
            <p className="eyebrow"><span className="dot" />Common jobs</p>
            <h2>What we take care of.</h2>
            <ul className="job-list">
              {service.issues.map((issue) => (
                <li key={issue}><Link href={`/book?service=${service.slug}`}><span>{issue}</span><ArrowRight size={18} /></Link></li>
              ))}
            </ul>
            <p className="muted-note">Not listed? Book anyway and describe the job — we handle most {service.name.toLowerCase()} work.</p>
          </div>
          <aside className="detail-card">
            <h3>How a {service.name.toLowerCase()} booking works</h3>
            <ol>
              <li><Check size={16} strokeWidth={3} /> Choose the job, a date and a time window.</li>
              <li><Check size={16} strokeWidth={3} /> Send the booking to our manager on WhatsApp.</li>
              <li><Check size={16} strokeWidth={3} /> We confirm the visit and the price before starting.</li>
              <li><Check size={16} strokeWidth={3} /> Our in-house team completes the work.</li>
            </ol>
            <Link href={`/book?service=${service.slug}`} className="button button-wa"><WhatsAppIcon /> Book on WhatsApp</Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-tint section-tight">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow"><span className="dot" />Related</p>
                <h2>Often booked with {service.name.toLowerCase()}.</h2>
              </div>
            </div>
            <div className="service-grid">
              {related.map((s) => <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
