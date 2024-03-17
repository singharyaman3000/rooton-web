'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { useUser } from '@/components/LoginInPage/UserData'; // Adjust the import path as necessary

interface HeaderData {
  initials: string;
  logo_name: string;
  email: string;
  isLoggedIn: boolean;
  isProfileOverlay: boolean;
  // eslint-disable-next-line no-unused-vars
  updateProfileOverlayState: (flag: boolean) => void;
}

const HeaderDataContext = createContext<HeaderData | undefined>(undefined);

export const HeaderDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser();

  const [isProfileOverlay, setIsProfileOverlay] = useState(false);

  const updateProfileOverlayState = (flag: boolean) => {
    setIsProfileOverlay(flag);
  };

  const headerData = useMemo(() => {
    const userInitials = user.FirstName && user.LastName ? `${user.FirstName[0]}${user.LastName[0]}`.toUpperCase() : '';
    const userEmail = user.Email;
    const isLoggedIn = !user.Email;
    return {
      initials: userInitials,
      logo_name: `${user.FirstName} ${user.LastName}`,
      email: userEmail,
      isLoggedIn,
      isProfileOverlay,
      updateProfileOverlayState,
    };
  }, [user, isProfileOverlay]);

  return <HeaderDataContext.Provider value={headerData}>{children}</HeaderDataContext.Provider>;
};

export const useHeaderData = (): HeaderData => {
  const context = useContext(HeaderDataContext);
  if (context === undefined) {
    throw new Error('useHeaderData must be used within a HeaderDataProvider');
  }
  return context;
};
