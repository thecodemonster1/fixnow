import {Footer, Header, WhatsAppFab} from '@/components/chrome';

export default function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
