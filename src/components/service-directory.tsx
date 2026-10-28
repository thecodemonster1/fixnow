'use client';
import {useState} from 'react';
import {Search} from 'lucide-react';
import {ServiceCard} from '@/components/service-card';
import {services} from '@/lib/services';

const groups = ['All', ...Array.from(new Set(services.map((s) => s.group)))];

export function ServiceDirectory() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');
  const q = query.trim().toLowerCase();
  const rows = services.filter((s) => (group === 'All' || s.group === group) && `${s.name} ${s.description} ${s.issues.join(' ')}`.toLowerCase().includes(q));

  return (
    <>
      <div className="directory-bar">
        <label className="search-field">
          <Search size={18} aria-hidden />
          <span className="sr-only">Search services</span>
          <input type="search" placeholder="Search — e.g. leak, AC, termites" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="chips" role="group" aria-label="Filter by category">
          {groups.map((g) => (
            <button type="button" key={g} className="chip-button" aria-pressed={group === g} onClick={() => setGroup(g)}>{g}</button>
          ))}
        </div>
      </div>
      <div className="service-grid">
        {rows.map((s) => <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} />)}
      </div>
      {!rows.length && <p className="empty">No services match your search. Try another word, or message us on WhatsApp.</p>}
    </>
  );
}
