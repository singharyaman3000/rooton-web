import React, { ReactNode } from 'react';

interface ISectionContiners {
  cssClass?: string;
  children: ReactNode;
}

const SectionContainer = ({ cssClass, children }: ISectionContiners) => {return (
  <div className={`px-[24px] md:px-[48px] lg:px-[80px]  ${cssClass}`}>{children}</div>
);};

export default SectionContainer;
