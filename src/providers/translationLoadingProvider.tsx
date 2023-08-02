import React, { createContext, useState, useEffect, ReactElement, ReactNode, useContext } from 'react';

interface ILoaderContext {
  loader: boolean;
}

const LoaderContext = createContext<ILoaderContext | undefined>(undefined);

export const useTranslationLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
      throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
  };

export const TranslationLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <LoaderContext.Provider value={{ loader }}>{children}</LoaderContext.Provider>;
};
