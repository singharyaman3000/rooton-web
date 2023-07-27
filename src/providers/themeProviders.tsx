'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { themes } from '@/app/constants/themeConstants';

const ThemeSwitchProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider defaultTheme={themes.light}>{children}</ThemeProvider>;
};

export default ThemeSwitchProvider;
