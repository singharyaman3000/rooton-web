import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { ISectionTitle } from '../SectionTitle';

const SubSectionTitle = ({ title, cssClass }: ISectionTitle) => {
  return (
    <h4
      className={`md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem] ${cssClass}`}
    >
      {ReactHtmlParser(title)}
    </h4>
  );
};

export default SubSectionTitle;
