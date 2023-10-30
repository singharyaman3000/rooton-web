import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import React from 'react';
import ThemeSwitchProvider from '../providers/themeProviders';


export const metadata: Metadata = {
  title: 'ROOT ON',
  description: 'Root On',
  openGraph: {
    url: `${process.env.NEXT_APP_BASE_URL}`,
    title: 'Root On',
    images: `${process.env.NEXT_APP_BASE_URL}/images/og-image.png`,
    description: 'What seems impossible to others has been made possible by Root On.',
    type: 'article',
  },
  twitter: {
    title: 'ROOT ON',
    description: 'Root On',
    card: 'summary_large_image',
  },
};

const FontJakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${FontJakarta.variable} ${FontJakarta.className} bg-primary-bg`}>
        <ThemeSwitchProvider>
          {children}
        </ThemeSwitchProvider>
      </body>
    </html>
  );
}
