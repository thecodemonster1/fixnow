import type {Metadata} from 'next';
import {CtaBand, PageHero} from '@/components/blocks';
import {photos, unsplash} from '@/lib/site';

export const metadata: Metadata = {title: 'About'};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="About FixNow" title={<>Maintenance that feels <span className="hl">manageable.</span></>} text="FixNow brings home, garden, building and office maintenance together under one in-house team — and makes booking it as easy as sending a message." />
      <section className="section section-tight">
        <div className="wrap about-grid">
          <figure className="about-photo"><img src={unsplash(photos.electrician, 900)} alt="A FixNow technician checking an electrical meter" loading="lazy" /></figure>
          <div className="prose">
            <h2>Our approach</h2>
            <p>We make it simple to get maintenance work assessed, priced and done. Our manager reads every booking, decides whether a site inspection is useful, prepares a quotation where needed, and assigns FixNow’s own team once you approve.</p>
            <h2>Our mission</h2>
            <p>To make property maintenance in Sri Lanka easy to request and simple to manage, with clear communication at every stage — in the app you already use.</p>
            <h2>Our workforce</h2>
            <p>FixNow manages its own workers and teams. We don’t pass your job to unknown contractors; our staff coordinate the right people for every approved job.</p>
            <h2>Company information</h2>
            <p>Company registration details, office location, service coverage and management contacts will be listed here.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
