'use client';

import React, { createContext, useMemo, useState } from 'react';

interface IModalShowContext {
  isModalShown: boolean;
  isFormFocusRouting: boolean;
  toggleModalShown: () => void;
  openCoreServiceList: () => void;
  closeCoreServiceList: () => void;
  enableFormFocus: () => void;
}

export const ModalShowContextname = createContext<IModalShowContext>({
  isModalShown: false,
  isFormFocusRouting: false,
  toggleModalShown: () => {},
  openCoreServiceList: () => {},
  closeCoreServiceList: () => {},
  enableFormFocus: () => {},
});

const IModalShowContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [isFormFocusRouting, setIsFormFocus] = useState<boolean>(false);
  const toggleModalShown = () => {
    setIsModalShown((isOpen) => !isOpen);
  };
  const openCoreServiceList = () => {
    setIsModalShown(true);
  };
  const closeCoreServiceList = () => {
    setIsModalShown(false);
    setIsFormFocus(false);
  };
  const enableFormFocus = () => {
    setIsFormFocus(true);
  };

  const contextValue = useMemo(
    () => ({
      isModalShown,
      enableFormFocus,
      isFormFocusRouting,
      toggleModalShown,
      openCoreServiceList,
      closeCoreServiceList,
    }),
    [isModalShown, isFormFocusRouting],
  );
  return <ModalShowContextname.Provider value={contextValue}>{children}</ModalShowContextname.Provider>;
};
export default IModalShowContextProvider;
