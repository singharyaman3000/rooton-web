'use client';

import React, { createContext, useMemo, useState } from 'react';

interface IModalShowContext {
  isModalShown: boolean;
  toggleModalShown: () => void;
}

export const ModalShowContextname = createContext<IModalShowContext>({
  isModalShown: false,
  toggleModalShown: () => {},
});

const IModalShowContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const toggleModalShown = () => {
    setIsModalShown((isOpen) => !isOpen);
  };

  const contextValue = useMemo(() => ({ isModalShown, toggleModalShown }), [isModalShown]);
  return <ModalShowContextname.Provider value={contextValue}>{children}</ModalShowContextname.Provider>;
};
export default IModalShowContextProvider;
