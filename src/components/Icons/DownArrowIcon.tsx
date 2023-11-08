'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type DownArrowIconProps = {
  isScrolled: boolean;
  isFixed: boolean;
};

export default function DownArrowIcon({ isScrolled, isFixed }: DownArrowIconProps) {
  const { theme } = useTheme();
  const [fillColor, setFillColor] = useState('#000');

  useEffect(() => {
    if (isScrolled) {
      const color = theme === 'dark' ? '#FFF' : '#000';
      setFillColor(color);
    } else {
      if (isFixed) {
        const color = theme === 'dark' ? '#FFF' : '#000';
        setFillColor(color);
        return;
      }
      setFillColor('#FFF');
    }
  }, [isScrolled, theme]);

  return (
    <svg width="10.043" height="5.979" viewBox="0 0 10.043 5.979" xmlns="http://www.w3.org/2000/svg">
      <path fill={fillColor} d="m9.146 0 .897.897L4.96 5.979 0 1.018.92.099l4.063 4.063L9.146 0z" fillRule="nonzero" />
    </svg>
  );
}
