'use client';

import DarkModeIcon from '@/icons/darkmode.icon';
import HamburgerIcon from '@/icons/hamburger.icon';
import LightModeIcon from '@/icons/lightmode.icon';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ThemeToggleAndHamburgerProps = {
  scrolledEnough: boolean;
  toggleSlideOverlay: () => void;
};

export default function ThemeToggleAndHamburger({ scrolledEnough, toggleSlideOverlay }: ThemeToggleAndHamburgerProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setIsDarkMode((state) => !state);
  }, [theme]);

  return (
    <div
      className="
        flex
        items-center
        hover:cursor-pointer
        gap-4
      "
    >
      <div className=" flex gap-0 w-12 lg:w-16 lg:h-8 h-6" role="button" tabIndex={0} onClick={toggleTheme}>
        {!scrolledEnough ? (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              isDarkMode ? ' bg-primary' : ' bg-tansparent-bg'
            } flex justify-center items-center`}
          >
            <DarkModeIcon fill={isDarkMode ? '#000' : '#FFF'} />
          </span>
        ) : (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              isDarkMode ? 'bg-toggle-dark-bg' : 'bg-tansparent-bg'
            } flex justify-center items-center`}
          >
            <DarkModeIcon fill={isDarkMode ? '#FFF' : '#000'} />
          </span>
        )}
        {scrolledEnough ? (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              !isDarkMode ? ' bg-toggle-dark-bg' : 'bg-tansparent-bg'
            } flex justify-center items-center`}
          >
            <LightModeIcon fill={!isDarkMode ? '#FFF' : '#000'} />
          </span>
        ) : (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              !isDarkMode ? 'bg-primary' : 'bg-tansparent-bg'
            } flex justify-center items-center`}
          >
            <LightModeIcon fill={!isDarkMode ? '#000' : '#FFF'} />
          </span>
        )}
      </div>
      <button type="button" onClick={toggleSlideOverlay} className=" lg:hidden">
        <HamburgerIcon />
      </button>
    </div>
  );
}
