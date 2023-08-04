'use client';

import { IHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import React, { createContext, useState, ReactNode, useContext, useMemo, useEffect } from 'react';

interface IHeaderFooterDataContextValue {
  headerFooterData: IHeaderFooterData | undefined;
  setData: React.Dispatch<React.SetStateAction<IHeaderFooterData | undefined>>;
}

const HeaderFooterContext = createContext<IHeaderFooterDataContextValue | undefined>(undefined);

export const useHeaderFooterContext = () => {
  const context = useContext(HeaderFooterContext);
  if (!context) {
    throw new Error('useHeaderFooterContext must be used within a HeaderFooterDataProvider');
  }
  return context;
};

export const HeaderFooterDataProvider = ({
  children,
  headerFooterAPIData,
}: {
  children: ReactNode;
  headerFooterAPIData: IHeaderFooterData | undefined;
}) => {
  const [headerFooterData, setData] = useState<IHeaderFooterData | undefined>(headerFooterAPIData);

  useEffect(() => {
    setData(headerFooterAPIData);
  }, [headerFooterAPIData]);

  const contextValue = useMemo(() => ({ headerFooterData, setData }), [headerFooterData]);

  return <HeaderFooterContext.Provider value={contextValue}>{children}</HeaderFooterContext.Provider>;
};
