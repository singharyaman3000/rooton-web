import React, { ReactNode } from 'react';

interface ISectionContiners {
  cssClass?: string;
  children: ReactNode;
}

const SectionContainer = ({ cssClass, children }: ISectionContiners) => {
  return <div className={`md:p-[80px] px-[24px] py-[40px] ${cssClass}`}>{children}</div>;
};

export default SectionContainer;
