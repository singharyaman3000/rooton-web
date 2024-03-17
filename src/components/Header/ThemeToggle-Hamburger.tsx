'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { SunIcon } from '../Icons/SunIcon';
import { HalfMoonIcon } from '../Icons/MoonIcon';

export default function ThemeToggleAndHamburger() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!theme) {
      setTheme('light');
    }
  }, [theme, setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <div
      className="
        flex
        items-center
        hover:cursor-pointer
        gap-[3.33vw]
        lg:gap-[20px]
      "
    >
      <div
        role="button"
        tabIndex={0}
        onClick={toggleTheme}
        className="flex gap-1 w-12 lg:w-16 lg:h-8 h-6 justify-start items-center text-primary-font-color"
        style={{ width: '-webkit-fill-available' }}
      >
        <span>{theme === 'dark' ? 'Light ' : 'Dark '}</span>
        <span
          className="text-xl lg:text-2xl"
        >
          {theme === 'dark' ? (
            <SunIcon className="text-xl lg:text-2xl sun-icon" />
          ) : (
            <HalfMoonIcon className="text-xl lg:text-2xl moon-icon" />
          )}
        </span>
      </div>
    </div>
  );
}
