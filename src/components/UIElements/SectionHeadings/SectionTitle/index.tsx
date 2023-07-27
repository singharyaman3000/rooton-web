import React from 'react';
import { ISectionTitle } from '..';

const SectionTitle = ({ title, cssClass }: ISectionTitle) => {
  return <h3 className={`text-golden-yellow text-sm font-semibold not-italic leading-[normal] tracking-[2.8px] md:text-xl md:tracking-[4px] ${cssClass}`}>{title}</h3>;
};

export default SectionTitle;
