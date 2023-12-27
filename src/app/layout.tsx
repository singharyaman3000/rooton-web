'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import React, { useEffect } from 'react';
import ThemeSwitchProvider from '../providers/themeProviders';
import { metaInfo } from './constants/pageMetaInfo';
import GoogleAnalytics from './GoogleAnalytics';
import { trackClicks } from '../../gtag';

export const metadata: Metadata = {
  title: metaInfo.home.title,
  description: metaInfo.home.description,
  alternates: { canonical: 'https://rooton.ca' },
  metadataBase: new URL(process.env.NEXT_APP_BASE_URL ?? ''),
  openGraph: {
    url: `${process.env.NEXT_APP_BASE_URL}`,
    title: metaInfo.home.title,
    images: `${process.env.NEXT_APP_BASE_URL}/images/og-image.png`,
    description: metaInfo.home.description,
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
  useEffect(() => {
    trackClicks();
  }, []);

  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${FontJakarta.variable} ${FontJakarta.className} bg-primary-bg !static`}>
        <ThemeSwitchProvider>
          <GoogleAnalytics/>
          {children}
        </ThemeSwitchProvider>
      </body>
    </html>
  );
}
