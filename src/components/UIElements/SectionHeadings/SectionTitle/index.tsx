import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export interface ISectionTitle {
  title: string;
  cssClass?: string;
}

const SectionTitle = ({ title, cssClass }: ISectionTitle) => {
  return (
    <h3
      className={`text-golden-yellow gradient-text  text-sm font-semibold not-italic leading-[normal] tracking-[2.8px] md:text-xl md:tracking-[4px] ${cssClass}`}
    >
      {ReactHtmlParser(title)}
    </h3>
  );
};

export default SectionTitle;
