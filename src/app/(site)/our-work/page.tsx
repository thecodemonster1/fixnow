import type {Metadata} from 'next';
import {CtaBand, PageHero} from '@/components/blocks';
import {photos, unsplash} from '@/lib/site';

export const metadata: Metadata = {title: 'Our work'};

const projects = [
  ['Exterior repaint', 'Painting · Residential', photos.painters],
  ['Bathroom fittings', 'Plumbing · Residential', photos.tap],
  ['Service line upgrade', 'Plumbing · Commercial', photos.pipes],
  ['Deep clean', 'Cleaning · Residential', photos.cleaning],
  ['Interior refresh', 'Painting · Office', photos.roller],
  ['Electrical check', 'Electrical · Residential', photos.electrician],
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Our work" title={<>Care in <span className="hl">every detail.</span></>} text="The kind of jobs our team handles every week. Photos are illustrative and will be replaced with FixNow project photography." />
      <section className="section section-tight">
        <div className="wrap work-grid">
          {projects.map(([title, meta, id], i) => (
            <figure key={title} className="work-card reveal" data-wide={i % 3 === 0 || undefined}>
              <img src={unsplash(id, 900)} alt="" loading="lazy" />
              <figcaption><span className="mono">{meta}</span><b>{title}</b></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
