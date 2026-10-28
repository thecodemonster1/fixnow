import Link from 'next/link';
import {ArrowRight, ArrowUpRight, Building2, CalendarDays, Check, ClipboardCheck, MessageCircle, ShieldCheck} from 'lucide-react';
import {CtaBand, Marquee} from '@/components/blocks';
import {ServiceIcon, WhatsAppIcon} from '@/components/icons';
import {ServiceCard} from '@/components/service-card';
import {services} from '@/lib/services';
import {photos, unsplash} from '@/lib/site';

const why = [
  [ShieldCheck, 'Our own team', 'FixNow staff do the work — not strangers from a marketplace. We assign, manage and stand behind every job.'],
  [ClipboardCheck, 'Quote before work', 'For bigger jobs we inspect first and send a clear quotation in LKR. Nothing starts until you approve it.'],
  [MessageCircle, 'One WhatsApp thread', 'Booking, visit time, photos and questions all live in the chat you already use every day.'],
  [Building2, 'Homes and workplaces', 'From a single dripping tap to planned upkeep for buildings and offices.'],
] as const;

const after = [
  ['We read your booking', 'Your WhatsApp message reaches our manager with every detail needed — no back-and-forth to explain the job.'],
  ['We confirm the visit', 'We reply in the same chat to confirm your date and time, or offer the nearest free slot.'],
  ['Inspect and quote', 'Simple jobs get a price before we start. Bigger ones get an inspection and a written quotation first.'],
  ['Done, then followed up', 'Our team completes the work and we check in afterwards to make sure it’s right.'],
];

const faqs = [
  ['Do I need to download an app or make an account?', 'No. The booking page writes your request as a WhatsApp message. You press Send in WhatsApp — that’s all.'],
  ['Is my booking confirmed as soon as I send it?', 'Your message is a booking request. Our manager replies on WhatsApp to confirm the visit time, usually suggesting the nearest slot if yours is taken.'],
  ['How much will it cost?', 'It depends on the job, materials and access. We confirm the price or send a quotation before any work starts.'],
  ['Can I send photos of the problem?', 'Yes — after you send the booking, just add photos or a short video in the same WhatsApp chat.'],
  ['Which areas do you cover?', 'We work across Sri Lanka. Add your city and district in the booking and we’ll confirm availability in your area.'],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow rise"><span className="dot" />Home &amp; property maintenance · Sri Lanka</p>
            <h1 className="rise" style={{'--d': '80ms'} as React.CSSProperties}>
              Something broken? <span className="hl">Book the fix</span> on WhatsApp.
            </h1>
            <p className="lead rise" style={{'--d': '160ms'} as React.CSSProperties}>
              Plumbing, electrical, AC, cleaning and 16 more trades from one in-house team. Pick the job, choose a date, and your booking lands with our manager on WhatsApp — no app, no account.
            </p>
            <div className="hero-actions rise" style={{'--d': '240ms'} as React.CSSProperties}>
              <Link href="/book" className="button button-wa button-lg"><WhatsAppIcon /> Book on WhatsApp</Link>
              <Link href="/services" className="button button-ghost button-lg">Browse services <ArrowRight size={17} /></Link>
            </div>
            <ul className="hero-proof rise" style={{'--d': '320ms'} as React.CSSProperties}>
              <li><Check size={15} strokeWidth={3} /> Quote before any work</li>
              <li><Check size={15} strokeWidth={3} /> In-house, managed team</li>
              <li><Check size={15} strokeWidth={3} /> Book in about a minute</li>
            </ul>
          </div>

          <div className="hero-visual rise" style={{'--d': '200ms'} as React.CSSProperties}>
            <div className="hero-photo">
              <img src={unsplash(photos.technician, 900)} srcSet={`${unsplash(photos.technician, 600)} 600w, ${unsplash(photos.technician, 900)} 900w, ${unsplash(photos.technician, 1300)} 1300w`} sizes="(max-width: 992px) 100vw, 45vw" alt="A FixNow technician in a hard hat and safety glasses" fetchPriority="high" />
            </div>
            <div className="chat-card" aria-hidden>
              <div className="chat-head">
                <span className="wa-avatar">FN</span>
                <div><b>FixNow Manager</b><small>online</small></div>
              </div>
              <div className="chat-bubble chat-out">
                <b>New booking request</b>
                <span>🛠 Plumbing — leaking tap</span>
                <span>📅 Saturday · Morning, 8–11 AM</span>
                <span>📍 Dehiwala, Colombo</span>
                <em>9:41 ✓✓</em>
              </div>
              <div className="chat-bubble chat-in">
                Thanks! Saturday 9 AM works — see you then.
                <em>9:43</em>
              </div>
            </div>
            <svg className="badge" viewBox="0 0 120 120" aria-hidden>
              <defs><path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
              <circle cx="60" cy="60" r="58" />
              <text><textPath href="#badge-circle">BOOK ON WHATSAPP ✱ NO APP NEEDED ✱ </textPath></text>
            </svg>
          </div>
        </div>

        <div className="wrap quick">
          <p className="mono">What do you need help with?</p>
          <div className="quick-chips">
            {services.slice(0, 8).map((s) => (
              <Link key={s.slug} href={`/book?service=${s.slug}`} className="quick-chip"><ServiceIcon name={s.icon} size={18} />{s.name}</Link>
            ))}
            <Link href="/services" className="quick-chip quick-more">+{services.length - 8} more <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow"><span className="dot" />How booking works</p>
              <h2>Three steps. <span className="soft">One WhatsApp message.</span></h2>
            </div>
            <Link href="/how-it-works" className="text-link">The full process <ArrowRight size={16} /></Link>
          </div>
          <ol className="how-grid">
            <li className="how-card reveal">
              <span className="how-num">01</span>
              <div className="how-visual how-visual-chips" aria-hidden>
                <span>Plumbing</span><span className="on">Electrical</span><span>AC</span><span>Cleaning</span><span>Painting</span>
              </div>
              <h3>Pick what needs fixing</h3>
              <p>Choose from 20 services and tap the problem — a leaking tap, an AC that won’t cool, a door that won’t close.</p>
            </li>
            <li className="how-card reveal">
              <span className="how-num">02</span>
              <div className="how-visual how-visual-cal" aria-hidden>
                {Array.from({length: 14}, (_, i) => <span key={i} className={i === 9 ? 'on' : i < 3 ? 'off' : ''}>{i + 12}</span>)}
              </div>
              <h3>Choose a date and time</h3>
              <p>Pick a day in the next two months and a time window that suits you. Mark it as an emergency if it can’t wait.</p>
            </li>
            <li className="how-card how-card-wa reveal">
              <span className="how-num">03</span>
              <div className="how-visual how-visual-msg" aria-hidden>
                <span className="line w80" /><span className="line w60" /><span className="line w70" />
                <span className="send"><WhatsAppIcon size={16} /> Send</span>
              </div>
              <h3>Send it on WhatsApp</h3>
              <p>We write every detail into one clear message for our manager. You press Send — and you’re booked in.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow"><span className="dot" />Services</p>
              <h2>Twenty trades. <span className="soft">One team you can message.</span></h2>
            </div>
            <Link href="/services" className="text-link">All {services.length} services <ArrowRight size={16} /></Link>
          </div>
          <div className="service-grid">
            {services.slice(0, 8).map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap why-grid">
          <div className="why-copy">
            <p className="eyebrow"><span className="dot" />Why FixNow</p>
            <h2>No surprises. Quote first, then we work.</h2>
            <p className="lead">FixNow isn’t a directory of strangers. Our manager reads every booking, our own team does the job, and you approve the price before anything starts.</p>
            <Link href="/book" className="button button-accent button-lg">Book a visit <ArrowRight size={17} /></Link>
          </div>
          <ul className="why-list">
            {why.map(([Icon, title, text]) => (
              <li key={title} className="reveal">
                <span className="why-icon"><Icon size={22} strokeWidth={1.75} /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="wrap photo-strip">
          {[[photos.tap, 'A chrome bathroom tap being repaired'], [photos.roller, 'A paint roller on a freshly painted wall'], [photos.cleaning, 'A cleaner wiping a window'], [photos.drill, 'A cordless drill on a worksite floor']].map(([id, alt]) => (
            <figure key={id} className="reveal"><img src={unsplash(id, 700)} alt={alt} loading="lazy" /></figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap after-grid">
          <div className="sticky-head">
            <p className="eyebrow"><span className="dot" />After you press send</p>
            <h2>What happens next.</h2>
            <p className="lead">No call centres or ticket numbers to chase. One conversation, start to finish.</p>
            <div className="mini-cal" aria-hidden><CalendarDays size={18} /> Every reply comes in the same chat</div>
          </div>
          <ol className="timeline">
            {after.map(([title, text], i) => (
              <li key={title} className="reveal">
                <span className="mono">0{i + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap faq-grid">
          <div>
            <p className="eyebrow"><span className="dot" />Questions</p>
            <h2>Good to know.</h2>
            <Link href="/faq" className="text-link">All FAQs <ArrowRight size={16} /></Link>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}<span className="faq-plus" aria-hidden /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
