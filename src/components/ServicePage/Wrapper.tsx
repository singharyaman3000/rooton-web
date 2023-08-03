import { ReactElement } from 'react';

type ServicePageWrapperProps = {
    children: ReactElement;
    className: string;
};

export const ServicePageWrapper = ({ children, className }: ServicePageWrapperProps) => {
  return (
    <div className={className}>
      { children }
    </div>
  );
};
