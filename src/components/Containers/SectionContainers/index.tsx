import React, { ReactNode } from 'react';

interface ISectionContiners {
  cssClass?: string;
  children: ReactNode;
}

const SectionContainer = ({ cssClass, children }: ISectionContiners) => (
  <div className={`md:px-[80px] px-[24px] ${cssClass}`}>{children}</div>
);

export default SectionContainer;
