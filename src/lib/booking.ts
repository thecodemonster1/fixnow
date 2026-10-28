export const timeSlots = [
  {id: 'morning', label: 'Morning', range: '8 – 11 AM'},
  {id: 'midday', label: 'Midday', range: '11 AM – 2 PM'},
  {id: 'afternoon', label: 'Afternoon', range: '2 – 5 PM'},
  {id: 'evening', label: 'Evening', range: '5 – 7 PM'},
] as const;

export const urgencies = [
  {id: 'flexible', label: 'Flexible', hint: 'On the date I pick'},
  {id: 'soon', label: 'Soon', hint: 'Within 1–2 days'},
  {id: 'emergency', label: 'Emergency', hint: 'As soon as possible'},
] as const;

export const propertyTypes = ['House', 'Apartment', 'Office', 'Shop / Commercial', 'Other'] as const;

export const districts = ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Galle', 'Matara', 'Jaffna', 'Kurunegala', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Hambantota', 'Kegalle', 'Kilinochchi', 'Mannar', 'Matale', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'];

export type Booking = {
  reference: string;
  service: string;
  issues: string[];
  date: Date | null;
  slot: string;
  urgency: string;
  name: string;
  phone: string;
  property: string;
  address: string;
  city: string;
  district: string;
  landmark: string;
  description: string;
};

// Short, readable reference the manager can quote back, e.g. FN-1028-K4QZ.
export function makeReference(now = new Date()) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const code = Array.from({length: 4}, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  const mmdd = `${now.getMonth() + 1}`.padStart(2, '0') + `${now.getDate()}`.padStart(2, '0');
  return `FN-${mmdd}-${code}`;
}

// Sri Lankan numbers: 0771234567, 771234567, 94771234567, +94 77 123 4567, 0094...
export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('0094')) return digits.slice(2);
  if (digits.startsWith('94') && digits.length === 11) return digits;
  if (digits.startsWith('0') && digits.length === 10) return `94${digits.slice(1)}`;
  if (digits.length === 9) return `94${digits}`;
  return digits;
}

export function isValidPhone(value: string) {
  const digits = normalizePhone(value);
  return digits.startsWith('94') ? digits.length === 11 : digits.length >= 8 && digits.length <= 15;
}

export function formatPhone(value: string) {
  const digits = normalizePhone(value);
  if (digits.startsWith('94') && digits.length === 11) return `+94 ${digits.slice(2, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  return value.trim();
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'});
}

export function buildMessage(b: Booking) {
  const slot = timeSlots.find((t) => t.id === b.slot);
  const urgency = urgencies.find((u) => u.id === b.urgency);
  const location = [b.city, b.district].filter(Boolean).join(', ');
  const lines = [
    `*New booking request — FixNow*`,
    b.urgency === 'emergency' ? `🚨 *EMERGENCY — please call back as soon as possible*` : null,
    `Ref: ${b.reference}`,
    '',
    `🛠 *Service:* ${b.service}`,
    b.issues.length ? `🔎 *Issue:* ${b.issues.join(', ')}` : null,
    urgency ? `⏱ *Urgency:* ${urgency.label} (${urgency.hint.charAt(0).toLowerCase()}${urgency.hint.slice(1)})` : null,
    '',
    `📅 *Preferred date:* ${b.date ? formatDate(b.date) : 'Flexible'}`,
    `🕐 *Preferred time:* ${slot ? `${slot.label}, ${slot.range}` : 'Any time'}`,
    '',
    `👤 *Name:* ${b.name.trim()}`,
    `📞 *Phone:* ${formatPhone(b.phone)}`,
    `🏠 *Property:* ${b.property}`,
    `📍 *Address:* ${b.address.trim()}`,
    location ? `🗺 *Area:* ${location}` : null,
    b.landmark.trim() ? `🧭 *Landmark:* ${b.landmark.trim()}` : null,
    '',
    `📝 *Job details:*`,
    b.description.trim() || '—',
    '',
    `_Sent from the FixNow booking page. Please confirm the visit time and quotation._`,
  ];
  return lines.filter((line) => line !== null).join('\n');
}
