'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {ArrowUpRight, Menu, Wrench, X} from 'lucide-react';
import {WhatsAppIcon} from '@/components/icons';
import {ZTechCredit} from '@/components/ztech-credit';
import {services} from '@/lib/services';
import {site, whatsappLink} from '@/lib/site';

const links = [
  ['/services', 'Services'],
  ['/how-it-works', 'How it works'],
  ['/our-work', 'Our work'],
  ['/about', 'About'],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact'],
];

export function Logo() {
  return (
    <span className="brand">
      <span className="brand-mark"><Wrench size={18} strokeWidth={2.25} /></span>
      <span className="brand-name">FixNow</span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <header className="header">
      <a href="#main" className="skip">Skip to content</a>
      <div className="wrap header-bar">
        <Link href="/" aria-label="FixNow home"><Logo /></Link>
        <nav className="nav" aria-label="Main">
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined}>{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/book" className="button button-wa button-small"><WhatsAppIcon size={17} /> Book now</Link>
          <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="wrap" aria-label="Mobile">
          {links.map(([href, label], i) => (
            <Link key={href} href={href}><span className="mono">{String(i + 1).padStart(2, '0')}</span>{label}</Link>
          ))}
          <Link href="/book" className="button button-wa button-lg"><WhatsAppIcon /> Book on WhatsApp</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" aria-label="FixNow home"><Logo /></Link>
            <p>One in-house team for home, garden, building and office maintenance across Sri Lanka. Book in a minute on WhatsApp.</p>
            <Link href="/book" className="button button-accent"><WhatsAppIcon /> Book on WhatsApp</Link>
          </div>
          <div>
            <b className="mono">Services</b>
            {services.slice(0, 6).map((s) => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}
            <Link href="/services">All 20 services <ArrowUpRight size={14} /></Link>
          </div>
          <div>
            <b className="mono">Company</b>
            {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          </div>
          <div>
            <b className="mono">Get in touch</b>
            <a href={whatsappLink('Hi FixNow, I have a question.')} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            {site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>}
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            <span>Sri Lanka</span>
          </div>
        </div>
        <div className="footer-word" aria-hidden>FixNow</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FixNow. All rights reserved.</span>
          <span><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></span>
        </div>
      </div>
      <ZTechCredit />
    </footer>
  );
}

export function WhatsAppFab() {
  if (usePathname() === '/book') return null;
  return (
    <a className="fab" href={whatsappLink('Hi FixNow, I have a question about a service.')} target="_blank" rel="noopener noreferrer" aria-label="Chat with FixNow on WhatsApp">
      <WhatsAppIcon size={26} />
    </a>
  );
}
