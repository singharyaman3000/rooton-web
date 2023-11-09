'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type HamburgerIconProps = {
  isScrolled: boolean;
  isFixed: boolean;
}

export default function HamburgerIcon({ isScrolled,isFixed }: HamburgerIconProps) {

  const { theme } = useTheme();
  const [fillColor, setFillColor] = useState('#000');

  useEffect(() => {
    if(isScrolled){
      const color = theme === 'dark' ? '#FFF' : '#000';
      setFillColor(color);
    }else{
      if(isFixed){
        const color = theme === 'dark' ? '#FFF' : '#000';
        setFillColor(color);
        return;
      }
      setFillColor('#FFF');
    }
  }, [isScrolled, theme, isFixed]);

  return (
    <svg width="24" height="18" viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg">
      <path fill={fillColor} d="M0 0h24v2H0zm0 8h24v2H0zm0 8h24v2H0z" fillRule="evenodd" />
    </svg>
  );
}
