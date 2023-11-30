'use client';

import React, { createContext, useState, ReactNode, useContext, useMemo, useEffect } from 'react';

import { IHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import { IBlogDetailsResponse } from '@/app/services/apiService/blogDetailAPI';

interface IHeaderFooterDataContextValue {
  headerFooterData: IHeaderFooterData[] | undefined;
  setData: React.Dispatch<React.SetStateAction<IHeaderFooterData[] | undefined>>;
  newsAlertData: IBlogDetailsResponse | undefined;
  setNewsAlertData: React.Dispatch<React.SetStateAction<IBlogDetailsResponse | undefined>>;
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
  newsAlertAPIData,
}: {
  children: ReactNode;
  headerFooterAPIData: IHeaderFooterData[] | undefined;
  newsAlertAPIData: IBlogDetailsResponse | undefined;
}) => {
  const [headerFooterData, setData] = useState<IHeaderFooterData[] | undefined>(headerFooterAPIData);
  const [newsAlertData, setNewsAlertData] = useState<IBlogDetailsResponse | undefined>(newsAlertAPIData);

  useEffect(() => {
    setData(headerFooterAPIData);
    setNewsAlertData(newsAlertAPIData);
  }, [headerFooterAPIData, newsAlertAPIData]);

  const contextValue = useMemo(() => {
    return { headerFooterData, setData, newsAlertData, setNewsAlertData };
  }, [headerFooterData, newsAlertData]);

  return <HeaderFooterContext.Provider value={contextValue}>{children}</HeaderFooterContext.Provider>;
};
