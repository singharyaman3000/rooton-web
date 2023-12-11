'use client';

import DarkModeIcon from '@/components/Icons/DarkModeIcon';
import HamburgerIcon from '@/components/Icons/HamBurgerIcon';
import LightModeIcon from '@/components/Icons/LightModeIcon';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import RTONLanguageDropDown from './LanguageDropDown';

type ThemeToggleAndHamburgerProps = {
  scrolledEnough: boolean;
  toggleSlideOverlay: () => void;
  isFixed: boolean;
};

export default function ThemeToggleAndHamburger({
  scrolledEnough,
  toggleSlideOverlay,
  isFixed,
}: ThemeToggleAndHamburgerProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme ?? '');
  }, [theme, setTheme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setIsDarkMode((state) => !state);
  }, [theme]);

  const getbuttonBG = () => {
    if (isFixed) return isDarkMode ? 'bg-toggle-dark-bg' : 'bg-tansparent-bg opacity-[0.23]';
    return isDarkMode ? ' bg-white' : ' bg-[#7e7e7e]';
  };
  // isDarkMode ? ' bg-black' : ' bg-tansparent-bg'
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
      <div className=" hidden xl:block">
        <RTONLanguageDropDown scrolledEnough={scrolledEnough} isFixed={isFixed}/>
      </div>
      <div className=" flex gap-0 w-12 lg:w-16 lg:h-8 h-6" role="button" tabIndex={0} onClick={toggleTheme}>
        {!scrolledEnough ? (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${getbuttonBG()} flex justify-center items-center`}
          >
            <DarkModeIcon isScrolled={scrolledEnough} isFixed={isFixed} />
          </span>
        ) : (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              isDarkMode ? 'bg-toggle-dark-bg' : 'bg-[#818181]'
            } flex justify-center items-center`}
          >
            <DarkModeIcon isScrolled={scrolledEnough} isFixed={isFixed} />
          </span>
        )}
        {scrolledEnough ? (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full border-[1px] border-[#7e7e7e] ${
              !isDarkMode ? ' bg-toggle-dark-bg' : 'bg-toggle-lite-bg'
            } flex justify-center items-center`}
          >
            <LightModeIcon isScrolled={scrolledEnough} />
          </span>
        ) : (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              !isDarkMode ? 'bg-white' : 'bg-[#7e7e7e]'
            } flex justify-center items-center`}
          >
            <LightModeIcon isScrolled={scrolledEnough} />
          </span>
        )}
      </div>
      <button aria-label="Hamburger menu open" type="button" onClick={toggleSlideOverlay} className=" xl:hidden">
        <HamburgerIcon isScrolled={scrolledEnough} isFixed={isFixed}/>
      </button>
    </div>
  );
}
