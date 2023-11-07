import { ReactElement } from 'react';

type CoachingPageWrapperProps = {
  children: ReactElement;
  className: string;
};

export const CoachingPageWrapper = ({ children, className }: CoachingPageWrapperProps) => {
  return <div className={className}>{children}</div>;
};
