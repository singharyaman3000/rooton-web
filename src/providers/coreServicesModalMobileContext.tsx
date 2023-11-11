'use client';

import React, { createContext, useMemo, useState } from 'react';

interface IModalShowContext {
  isModalShown: boolean;
  toggleModalShown: () => void;
}

export const MobileModalShowContextname = createContext<IModalShowContext>({
  isModalShown: false,
  toggleModalShown: () => {},
});

const MobileModalShowContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const toggleModalShown = () => {
    setIsModalShown((isOpen) => !isOpen);
  };

  const contextValue = useMemo(() => ({ isModalShown, toggleModalShown }), [isModalShown]);
  return <MobileModalShowContextname.Provider value={contextValue}>{children}</MobileModalShowContextname.Provider>;
};
export default MobileModalShowContextProvider;
