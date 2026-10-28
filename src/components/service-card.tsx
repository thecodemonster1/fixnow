import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {ServiceIcon} from '@/components/icons';
import type {Service} from '@/lib/services';

export function ServiceCard({service, index}: {service: Service; index: number}) {
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon"><ServiceIcon name={service.icon} /></span>
        <span className="mono">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3><Link href={`/services/${service.slug}`} className="stretched">{service.name}</Link></h3>
      <p>{service.description}</p>
      <Link href={`/book?service=${service.slug}`} className="card-book" aria-label={`Book ${service.name}`}>
        Book <ArrowUpRight size={15} />
      </Link>
    </article>
  );
}
