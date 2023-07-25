'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function FooterLogo() {
  const { theme } = useTheme();

  return (
    <Image
      width={180}
      height={54}
      alt="logo"
      src={theme === 'light' ? '/r-oot-on-logo-black.svg' : 'r-oot-on-logo-svg.svg'}
      className=" mb-6 mx-auto"
    />
  );
}
