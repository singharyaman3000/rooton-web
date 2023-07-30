import { ReactElement } from 'react';

type ServicePageWrapperProps = {
    children: ReactElement
};

export const ServicePageWrapper = ({ children }: ServicePageWrapperProps) => {
  return (
    <div className=" pt-10 pb-[68px] px-6">
      { children }
    </div>
  );
};
