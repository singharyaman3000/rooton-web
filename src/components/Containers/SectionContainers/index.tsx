import React, { ReactNode } from 'react';

interface ISectionContiners {
  cssClass?: string;
  children: ReactNode;
}

const SectionContainer = ({ cssClass, children }: ISectionContiners) => {
  return <div className={`p-[80px] md:px-[24px] md:py-[40px] ${cssClass}`}>{children}</div>;
};

export default SectionContainer;
