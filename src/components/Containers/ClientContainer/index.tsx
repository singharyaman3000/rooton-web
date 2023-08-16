import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { ReactNode } from 'react';

export const ClientContainer = ({ children }: { children: ReactNode }) => {
  const { loader } = useTranslationLoader();

  return !loader && children;
};
