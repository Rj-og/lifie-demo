import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Contact Us | Akshara Ananda',
  description:
    'Get in touch with Akshara Ananda — luxury living amidst nature. Request a site visit or learn more about our premium residential project near Hyderabad.',
  keywords: [
    'Akshara Ananda',
    'luxury villas Hyderabad',
    'premium residential project',
    'contact Akshara Projects',
  ],
  authors: [{ name: 'Akshara Projects' }],
  openGraph: {
    title: 'Contact Us | Akshara Ananda',
    description:
      'Reach out to Akshara Ananda for site visits and project details.',
    url: 'https://aksharaananda.com',
    siteName: 'Akshara Ananda',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Akshara Ananda',
    description:
      'Reach out to Akshara Ananda for site visits and project details.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.prod.website-files.com/68c29b083f23c6749d73589a/68c29b083f23c6749d73596d_logo-full.png"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
