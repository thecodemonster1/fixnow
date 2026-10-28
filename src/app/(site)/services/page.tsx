import type {Metadata} from 'next';
import {CtaBand, PageHero} from '@/components/blocks';
import {ServiceDirectory} from '@/components/service-directory';

export const metadata: Metadata = {title: 'Services'};

export default function Services() {
  return (
    <>
      <PageHero eyebrow="20 services · one team" title={<>Every fix your place needs. <span className="soft">Booked in a minute.</span></>} text="Home, garden, building and office maintenance from FixNow’s own team. Find your service and book it straight on WhatsApp." />
      <section className="section section-tight">
        <div className="wrap"><ServiceDirectory /></div>
      </section>
      <CtaBand title="Can’t find it?" text="Pick the closest service and describe the job in your own words — our manager will sort out the rest." />
    </>
  );
}
