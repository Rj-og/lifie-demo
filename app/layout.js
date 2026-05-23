import './globals.css';

export const metadata = {
  title: 'Request a Demo | Lifie AI — Autonomous AI Voice Agents',
  description:
    'Experience Lifie AI in action. Request a demo and receive an instant AI-powered phone call. Autonomous AI agents for sales outreach, lead qualification, and more.',
  keywords: ['Lifie AI', 'AI voice agents', 'sales automation', 'demo request', 'outbound AI calls'],
  authors: [{ name: 'Lifie AI' }],
  openGraph: {
    title: 'Request a Demo | Lifie AI',
    description: 'Get an instant AI-powered demo call from Lifie AI.',
    url: 'https://lifie.ai',
    siteName: 'Lifie AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Demo | Lifie AI',
    description: 'Get an instant AI-powered demo call from Lifie AI.',
    site: '@lifieai',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="https://lifie.ai/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
