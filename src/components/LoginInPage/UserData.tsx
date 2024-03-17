/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

// User data interface remains for context consumption
interface User {
  FirstName: string;
  LastName: string;
  Email: string;
}

// User context interface
interface UserContextProps {
  user: User;
  // eslint-disable-next-line no-unused-vars
  setToken: (token: string) => void; // Only expose a method to set the token
}

const UserContext = createContext<UserContextProps | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const getDecodedToken = (): User => {
    if (token) {
      const decoded: any = jwtDecode(token);
      return { FirstName: decoded.FirstName, LastName: decoded.LastName, Email: decoded.Email };
    }
    return { FirstName: '', LastName: '', Email: '' };
  };

  const user = useMemo(getDecodedToken, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSetToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const value = useMemo(() => {return { user, setToken: handleSetToken };}, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
