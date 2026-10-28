import type {Metadata, Viewport} from 'next';
import {Inter_Tight, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const sans = Inter_Tight({subsets: ['latin'], variable: '--font-sans', display: 'swap'});
const mono = JetBrains_Mono({subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap'});

export const metadata: Metadata = {
  title: {default: 'FixNow | Book home repairs on WhatsApp', template: '%s | FixNow'},
  description: 'Plumbing, electrical, AC, cleaning and more across Sri Lanka. Pick a service, choose a date and book on WhatsApp in about a minute.',
};

export const viewport: Viewport = {themeColor: '#f6f5ef'};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
