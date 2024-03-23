/* eslint-disable no-unused-vars */

'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { useUser } from '@/components/LoginInPage/UserData'; // Adjust the import path as necessary

interface HeaderData {
  initials: string;
  logo_name: string;
  email: string;
  isLoggedIn: boolean;
  isProfileOverlay: boolean;
  updateProfileOverlayState: (flag: boolean) => void;
  updateProfileState: (flag: string) => void;
  profileState: string;
  toolsFormState: boolean;
  updateToolsFormState: (flag: boolean) => void;
}

const HeaderDataContext = createContext<HeaderData | undefined>(undefined);

export const HeaderDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser();

  let profile_state: string | null = '';
  const [isProfileOverlay, setIsProfileOverlay] = useState(false);
  const [toolsFormState, setToolsFormState] = useState(false);
  const [profileState, setProfileState] = useState(profile_state||'');

  if (typeof window !== 'undefined') {
    profile_state = localStorage && localStorage.getItem('PROFILE_STATUS');
  }

  const updateProfileOverlayState = (flag: boolean) => {
    setIsProfileOverlay(flag);
  };

  const updateToolsFormState = (flag: boolean) => {
    setToolsFormState(flag);
  };

  const updateProfileState = (status: string) => {
    setProfileState(status);
    if (typeof window !== 'undefined') {
      localStorage.setItem('PROFILE_STATUS',status);
    }
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
      profileState,
      toolsFormState,
      updateProfileOverlayState,
      updateProfileState,
      updateToolsFormState,
    };
  }, [user, isProfileOverlay, profileState, toolsFormState]);

  return <HeaderDataContext.Provider value={headerData}>{children}</HeaderDataContext.Provider>;
};

export const useHeaderData = (): HeaderData => {
  const context = useContext(HeaderDataContext);
  if (context === undefined) {
    throw new Error('useHeaderData must be used within a HeaderDataProvider');
  }
  return context;
};
