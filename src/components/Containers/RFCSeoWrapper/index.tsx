import { Metadata } from 'next';
import React, { ReactNode } from 'react';

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
  

const RFCSeoWrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default RFCSeoWrapper;
