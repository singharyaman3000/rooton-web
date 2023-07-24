'use client';

import DarkModeIcon from '@/icons/darkmode.icon';
import HamburgerIcon from '@/icons/hamburger.icon';
import LightModeIcon from '@/icons/lightmode.icon';
import { useState } from 'react';

type ThemeToggleAndHamburgerProps = {
  scrolledEnough: boolean;
};

export default function ThemeToggleAndHamburger({ scrolledEnough }: ThemeToggleAndHamburgerProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((state) => !state);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="
        flex
        items-center
        hover:cursor-pointer
        gap-4
      "
      onClick={toggleTheme}
    >
      <div className=" flex gap-0 w-12 lg:w-16 lg:h-8 h-6">
        {!scrolledEnough ? (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${isDarkMode ? 'bg-[#fff]' : 'bg-[#ffffff36]'} flex justify-center items-center`}
          >
            <DarkModeIcon fill={isDarkMode ? '#000' : '#FFF'} />
          </span>
        ) : (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${isDarkMode ? 'bg-[#000]' : 'bg-[#00000036]'} flex justify-center items-center`}
          >
            <DarkModeIcon fill={isDarkMode ? '#FFF' : '#000'} />
          </span>
        )}
        {scrolledEnough ? (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${!isDarkMode ? ' bg-black' : 'bg-[#00000036]'} flex justify-center items-center`}
          >
            <LightModeIcon fill={!isDarkMode ? '#FFF' : '#000'} />
          </span>
        ) : (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${!isDarkMode ? 'bg-white' : 'bg-[#ffffff36]'} flex justify-center items-center`}
          >
            <LightModeIcon fill={!isDarkMode ? '#000' : '#FFF'} />
          </span>
        )}
      </div>
      <span className=" lg:hidden">
        <HamburgerIcon fill={scrolledEnough ? '#000' : '#FFF'} />
      </span>
    </div>
  );
}
