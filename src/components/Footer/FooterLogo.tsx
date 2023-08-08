'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function FooterLogo() {
  const { theme } = useTheme();

  const [themeState, setThemeState] = useState('light');

  useEffect(() => {
    setThemeState(theme ?? '');
  }, [theme, setThemeState]);

  return (
    <Image
      width={180}
      height={54}
      alt="logo"
      src={themeState === 'light' ? '/root-on-logo-black.svg' : '/root-on-logo-svg.svg'}
      className=" mb-[30px] mx-auto xl:mx-0"
    />
  );
}
