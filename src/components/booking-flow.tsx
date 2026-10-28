'use client';
import {useEffect, useMemo, useRef, useState} from 'react';
import {ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Copy, MapPin, Pencil, RotateCcw, Search, User} from 'lucide-react';
import {ServiceIcon, WhatsAppIcon} from '@/components/icons';
import {services} from '@/lib/services';
import {buildMessage, districts, formatDate, formatPhone, isValidPhone, makeReference, propertyTypes, timeSlots, urgencies, type Booking} from '@/lib/booking';
import {whatsappLink} from '@/lib/site';

const steps = ['Service', 'Date & time', 'Your details', 'Send'];
const otherIssue = 'Something else';
const bookingWindowDays = 60;

type Errors = Partial<Record<keyof Booking, string>>;

function blank(service = ''): Booking {
  return {reference: '', service, issues: [], date: null, slot: '', urgency: 'flexible', name: '', phone: '', property: 'House', address: '', city: '', district: '', landmark: '', description: ''};
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function sameDay(a: Date | null, b: Date | null) {
  return !!a && !!b && a.toDateString() === b.toDateString();
}

function validate(step: number, b: Booking): Errors {
  const e: Errors = {};
  if (step === 0 && !b.service) e.service = 'Choose a service to continue.';
  if (step === 1) {
    if (!b.date) e.date = 'Pick a date for the visit.';
    if (!b.slot) e.slot = 'Pick a time window.';
  }
  if (step === 2) {
    if (b.name.trim().length < 2) e.name = 'Enter your name.';
    if (!isValidPhone(b.phone)) e.phone = 'Enter a valid phone number, e.g. 077 123 4567.';
    if (b.address.trim().length < 5) e.address = 'Enter the address for the visit.';
    if (b.city.trim().length < 2) e.city = 'Enter your city or town.';
    if (!b.district) e.district = 'Choose a district.';
  }
  return e;
}

export function BookingFlow({initialService}: {initialService?: string}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Booking>(() => blank(initialService));
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const focusInvalid = useRef(false);

  useEffect(() => setData((d) => (d.reference ? d : {...d, reference: makeReference()})), []);

  useEffect(() => {
    if (!moved.current) return;
    topRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    topRef.current?.focus({preventScroll: true});
  }, [step, sent]);

  useEffect(() => {
    if (!focusInvalid.current) return;
    focusInvalid.current = false;
    document.querySelector<HTMLElement>('.flow [aria-invalid="true"]')?.focus();
  }, [errors]);

  const message = useMemo(() => buildMessage(data), [data]);
  const service = services.find((s) => s.name === data.service);

  function set<K extends keyof Booking>(key: K, value: Booking[K]) {
    setData((d) => ({...d, [key]: value}));
    setErrors((e) => ({...e, [key]: undefined}));
  }

  function go(next: number) {
    moved.current = true;
    if (next > step) {
      for (let s = step; s < next; s++) {
        const e = validate(s, data);
        if (Object.keys(e).length) {
          focusInvalid.current = true;
          setStep(s);
          setErrors(e);
          return;
        }
      }
    }
    setErrors({});
    setStep(next);
  }

  function restart() {
    moved.current = true;
    setData({...blank(), reference: makeReference()});
    setSent(false);
    setStep(0);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (sent) {
    return (
      <div className="flow flow-done" ref={topRef} tabIndex={-1}>
        <div className="done-card">
          <span className="done-icon"><Check size={30} strokeWidth={2.5} /></span>
          <p className="eyebrow">Booking {data.reference}</p>
          <h2>Almost done — press <em>Send</em> in WhatsApp.</h2>
          <p>Your booking is written out in WhatsApp. Once you send it, our manager will reply to confirm the visit time. You can add photos of the problem in the same chat.</p>
          <div className="done-actions">
            <a className="button button-wa button-lg" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Open WhatsApp again</a>
            <button type="button" className="button button-ghost button-lg" onClick={copy}><Copy size={17} /> {copied ? 'Copied' : 'Copy message'}</button>
          </div>
          <button type="button" className="text-link" onClick={restart}><RotateCcw size={15} /> Start a new booking</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flow" ref={topRef} tabIndex={-1}>
      <ol className="flow-steps" aria-label="Booking steps">
        {steps.map((label, i) => (
          <li key={label} data-state={i < step ? 'done' : i === step ? 'current' : 'todo'}>
            <button type="button" onClick={() => go(i)} aria-current={i === step ? 'step' : undefined}>
              <span className="flow-step-num">{i < step ? <Check size={13} strokeWidth={3} /> : `0${i + 1}`}</span>
              <span className="flow-step-label">{label}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="flow-body">
        <div className="flow-main" key={step}>
          {step === 0 && <ServiceStep data={data} errors={errors} set={set} />}
          {step === 1 && <DateStep data={data} errors={errors} set={set} />}
          {step === 2 && <DetailsStep data={data} errors={errors} set={set} />}
          {step === 3 && <ReviewStep data={data} message={message} go={go} copy={copy} copied={copied} />}
        </div>

        <aside className="flow-aside" aria-label="Booking summary">
          <div className="summary">
            <div className="summary-head">
              <span className="mono">Your booking</span>
              <span className="mono summary-ref">{data.reference}</span>
            </div>
            <div className="summary-service">
              <span className="service-icon">{service ? <ServiceIcon name={service.icon} /> : <Search size={20} aria-hidden />}</span>
              <div>
                <b>{data.service || 'No service yet'}</b>
                <small>{data.issues.length ? data.issues.join(', ') : 'Pick what needs fixing'}</small>
              </div>
            </div>
            <dl>
              <div><dt><CalendarDays size={15} aria-hidden /> When</dt><dd>{data.date ? formatDate(data.date) : '—'}{data.slot && <small>{timeSlots.find((t) => t.id === data.slot)?.label}, {timeSlots.find((t) => t.id === data.slot)?.range}</small>}</dd></div>
              <div><dt><MapPin size={15} aria-hidden /> Where</dt><dd>{[data.city, data.district].filter(Boolean).join(', ') || '—'}</dd></div>
              <div><dt><User size={15} aria-hidden /> Who</dt><dd>{data.name || '—'}{data.phone && <small>{formatPhone(data.phone)}</small>}</dd></div>
            </dl>
            <p className="summary-note"><WhatsAppIcon size={15} /> Sent to our manager as a WhatsApp message. Nothing is charged online.</p>
          </div>
        </aside>
      </div>

      <div className="flow-actions">
        {step > 0 ? (
          <button type="button" className="button button-ghost" onClick={() => go(step - 1)}><ArrowLeft size={17} /> Back</button>
        ) : <span />}
        {step < 3 ? (
          <button type="button" className="button" onClick={() => go(step + 1)}>Continue <ArrowRight size={17} /></button>
        ) : (
          <a className="button button-wa" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={() => { moved.current = true; setSent(true); }}>
            <WhatsAppIcon /> Book on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

type StepProps = {data: Booking; errors: Errors; set: <K extends keyof Booking>(key: K, value: Booking[K]) => void};

function StepHead({n, title, text}: {n: number; title: string; text: string}) {
  return (
    <div className="step-head">
      <span className="mono">Step 0{n} / 04</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function FieldError({id, error}: {id: string; error?: string}) {
  return error ? <p className="field-error" id={`${id}-error`} role="alert">{error}</p> : null;
}

function ServiceStep({data, errors, set}: StepProps) {
  const [query, setQuery] = useState('');
  const service = services.find((s) => s.name === data.service);
  const rows = services.filter((s) => `${s.name} ${s.description} ${s.issues.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));

  function choose(name: string) {
    set('service', name);
    set('issues', []);
  }

  function toggleIssue(issue: string) {
    set('issues', data.issues.includes(issue) ? data.issues.filter((x) => x !== issue) : [...data.issues, issue]);
  }

  if (service) {
    return (
      <div className="step">
        <StepHead n={1} title={`What’s going on with your ${service.name.toLowerCase()}?`} text="Tap everything that applies. It helps us send the right person with the right tools." />
        <div className="picked">
          <span className="service-icon service-icon-lg"><ServiceIcon name={service.icon} size={26} /></span>
          <div>
            <span className="mono">Selected service</span>
            <b>{service.name}</b>
            <small>{service.description}</small>
          </div>
          <button type="button" className="button button-ghost button-small" onClick={() => choose('')}><Pencil size={14} /> Change</button>
        </div>
        <fieldset className="chips-field">
          <legend>Common jobs <span>(optional — pick any)</span></legend>
          <div className="chips">
            {[...service.issues, otherIssue].map((issue) => (
              <label key={issue} className="chip">
                <input type="checkbox" checked={data.issues.includes(issue)} onChange={() => toggleIssue(issue)} />
                <span>{data.issues.includes(issue) && <Check size={14} strokeWidth={3} aria-hidden />}{issue}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }

  return (
    <div className="step">
      <StepHead n={1} title="What needs fixing?" text="Choose a service. You can describe the problem in your own words later." />
      <label className="search-field">
        <Search size={18} aria-hidden />
        <span className="sr-only">Search services</span>
        <input type="search" placeholder="Search — e.g. leak, AC, termites" value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <FieldError id="service" error={errors.service} />
      <div className="tile-grid">
        {rows.map((s) => (
          <button type="button" key={s.slug} className="tile" onClick={() => choose(s.name)} aria-invalid={errors.service ? true : undefined}>
            <span className="service-icon"><ServiceIcon name={s.icon} /></span>
            <span className="tile-name">{s.name}</span>
            <ArrowRight className="tile-arrow" size={16} aria-hidden />
          </button>
        ))}
      </div>
      {!rows.length && <p className="empty">No service matches “{query}”. Pick the closest one or choose <button type="button" className="text-link" onClick={() => choose('Moving & Handyman')}>Handyman</button>.</p>}
    </div>
  );
}

function DateStep({data, errors, set}: StepProps) {
  const today = startOfDay(new Date());
  const last = addDays(today, bookingWindowDays);
  const [view, setView] = useState(() => {
    const base = data.date ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const offset = (view.getDay() + 6) % 7;
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = [...Array<null>(offset).fill(null), ...Array.from({length: daysInMonth}, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1))];
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(view.getFullYear(), view.getMonth() + 1, 1) <= last;

  function pick(date: Date) {
    set('date', date);
    setView(new Date(date.getFullYear(), date.getMonth(), 1));
  }

  function setUrgency(id: string) {
    set('urgency', id);
    if (id === 'emergency' && !data.date) pick(today);
  }

  return (
    <div className="step">
      <StepHead n={2} title="When should we come?" text="Choose a day and a time window. Our manager will confirm the exact time on WhatsApp." />

      <fieldset className="choice-field">
        <legend>How urgent is it?</legend>
        <div className="segmented">
          {urgencies.map((u) => (
            <label key={u.id} className="segment" data-tone={u.id}>
              <input type="radio" name="urgency" value={u.id} checked={data.urgency === u.id} onChange={() => setUrgency(u.id)} />
              <span><b>{u.label}</b><small>{u.hint}</small></span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="date-layout">
        <fieldset className="choice-field">
          <legend>Preferred date</legend>
          <div className="quick-dates">
            {[{label: 'Today', date: today}, {label: 'Tomorrow', date: addDays(today, 1)}].map(({label, date}) => (
              <button type="button" key={label} className="chip-button" aria-pressed={sameDay(data.date, date)} onClick={() => pick(date)}>{label}</button>
            ))}
          </div>
          <div className="calendar" aria-invalid={errors.date ? true : undefined} tabIndex={errors.date ? -1 : undefined}>
            <div className="calendar-head">
              <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} disabled={!canPrev} aria-label="Previous month"><ChevronLeft size={18} /></button>
              <b aria-live="polite">{view.toLocaleDateString('en-GB', {month: 'long', year: 'numeric'})}</b>
              <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} disabled={!canNext} aria-label="Next month"><ChevronRight size={18} /></button>
            </div>
            <div className="calendar-grid">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => <span key={d} className="calendar-dow" aria-hidden>{d}</span>)}
              {cells.map((date, i) => date ? (
                <button
                  type="button"
                  key={i}
                  className="calendar-day"
                  disabled={date < today || date > last}
                  aria-pressed={sameDay(data.date, date)}
                  aria-label={formatDate(date)}
                  data-today={sameDay(date, today) || undefined}
                  onClick={() => pick(date)}
                >
                  {date.getDate()}
                </button>
              ) : <span key={i} />)}
            </div>
          </div>
          <FieldError id="date" error={errors.date} />
        </fieldset>

        <fieldset className="choice-field">
          <legend>Time window</legend>
          <div className="slots" aria-invalid={errors.slot ? true : undefined} tabIndex={errors.slot ? -1 : undefined}>
            {timeSlots.map((t) => (
              <label key={t.id} className="slot">
                <input type="radio" name="slot" value={t.id} checked={data.slot === t.id} onChange={() => set('slot', t.id)} />
                <span><b>{t.label}</b><small>{t.range}</small></span>
              </label>
            ))}
          </div>
          <FieldError id="slot" error={errors.slot} />
          {data.urgency === 'emergency' && <p className="hint-box">Emergency bookings are flagged at the top of the message so our manager can prioritise them.</p>}
        </fieldset>
      </div>
    </div>
  );
}

function DetailsStep({data, errors, set}: StepProps) {
  const field = (key: keyof Booking) => ({
    id: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  });

  return (
    <div className="step">
      <StepHead n={3} title="Where, and who should we contact?" text="We only use these details to arrange this job." />
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input {...field('name')} autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Nimal Perera" />
          <FieldError id="name" error={errors.name} />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone / WhatsApp number</label>
          <input {...field('phone')} type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="077 123 4567" />
          <FieldError id="phone" error={errors.phone} />
        </div>
        <fieldset className="field field-wide">
          <legend>Property type</legend>
          <div className="chips">
            {propertyTypes.map((p) => (
              <label key={p} className="chip">
                <input type="radio" name="property" checked={data.property === p} onChange={() => set('property', p)} />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="field field-wide">
          <label htmlFor="address">Address</label>
          <input {...field('address')} autoComplete="street-address" value={data.address} onChange={(e) => set('address', e.target.value)} placeholder="House no., street" />
          <FieldError id="address" error={errors.address} />
        </div>
        <div className="field">
          <label htmlFor="city">City / town</label>
          <input {...field('city')} autoComplete="address-level2" value={data.city} onChange={(e) => set('city', e.target.value)} placeholder="e.g. Dehiwala" />
          <FieldError id="city" error={errors.city} />
        </div>
        <div className="field">
          <label htmlFor="district">District</label>
          <select {...field('district')} value={data.district} onChange={(e) => set('district', e.target.value)}>
            <option value="" disabled>Select district</option>
            {districts.map((d) => <option key={d}>{d}</option>)}
          </select>
          <FieldError id="district" error={errors.district} />
        </div>
        <div className="field field-wide">
          <label htmlFor="landmark">Nearby landmark <span>(optional)</span></label>
          <input id="landmark" value={data.landmark} onChange={(e) => set('landmark', e.target.value)} placeholder="e.g. Opposite the Keells, blue gate" />
        </div>
        <div className="field field-wide">
          <label htmlFor="description">Describe the problem <span>(optional)</span></label>
          <textarea id="description" maxLength={600} value={data.description} onChange={(e) => set('description', e.target.value)} placeholder="e.g. Kitchen tap has been leaking under the sink since yesterday." />
          <small className="field-hint">You can send photos in the WhatsApp chat after booking.</small>
        </div>
      </div>
    </div>
  );
}

function ReviewStep({data, message, go, copy, copied}: {data: Booking; message: string; go: (n: number) => void; copy: () => void; copied: boolean}) {
  const slot = timeSlots.find((t) => t.id === data.slot);
  const urgency = urgencies.find((u) => u.id === data.urgency);
  const rows: [string, React.ReactNode, number][] = [
    ['Service', <>{data.service}{data.issues.length > 0 && <small>{data.issues.join(', ')}</small>}</>, 0],
    ['When', <>{data.date && formatDate(data.date)}<small>{slot?.label}, {slot?.range} · {urgency?.label}</small></>, 1],
    ['Contact', <>{data.name}<small>{formatPhone(data.phone)}</small></>, 2],
    ['Location', <>{data.address}<small>{[data.property, data.city, data.district, data.landmark].filter(Boolean).join(' · ')}</small></>, 2],
  ];

  return (
    <div className="step">
      <StepHead n={4} title="Check it, then send it on WhatsApp." text="This is exactly what our manager will receive. Tap the green button and press Send in WhatsApp." />
      <div className="review">
        <dl className="review-list">
          {rows.map(([label, value, target]) => (
            <div key={label}>
              <dt className="mono">{label}</dt>
              <dd>{value}</dd>
              <button type="button" className="text-link" onClick={() => go(target)} aria-label={`Edit ${label.toLowerCase()}`}><Pencil size={14} /> Edit</button>
            </div>
          ))}
        </dl>
        <div className="wa-preview">
          <div className="wa-bar">
            <span className="wa-avatar">FN</span>
            <div><b>FixNow Manager</b><small>WhatsApp preview</small></div>
          </div>
          <div className="wa-chat">
            <div className="wa-bubble"><WaText text={message} /></div>
          </div>
          <button type="button" className="wa-copy" onClick={copy}><Copy size={14} /> {copied ? 'Copied' : 'Copy message'}</button>
        </div>
      </div>
      <p className="consent">By sending, you agree that FixNow may contact you on this number about this booking. A booking is a request — our manager confirms the time and any quotation before work starts.</p>
    </div>
  );
}

// Renders WhatsApp's *bold* and _italic_ markers the way the app will.
function WaText({text}: {text: string}) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <p key={i}>
          {line.split(/(\*[^*\n]+\*|_[^_\n]+_)/g).map((part, j) =>
            part.length > 2 && part.startsWith('*') && part.endsWith('*') ? <b key={j}>{part.slice(1, -1)}</b>
              : part.length > 2 && part.startsWith('_') && part.endsWith('_') ? <i key={j}>{part.slice(1, -1)}</i>
                : part,
          )}
        </p>
      ))}
    </>
  );
}
