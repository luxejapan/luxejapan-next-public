import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { languages } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!(lang in languages)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 