import React from 'react';
import { ISectionTitle } from '..';

const SubSectionTitle = ({ title, cssClass }: ISectionTitle) => {
  return <h3 className={`md:text-5xl text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem] ${cssClass}`}>{title}</h3>;
};

export default SubSectionTitle;
