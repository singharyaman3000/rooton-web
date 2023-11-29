import { ISectionTitle } from '@/components/UIElements/SectionHeadings/SectionTitle';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const AboutUsSubHeader = ({ title, cssClass }: ISectionTitle) => {
  return (
    <h2
      className={`max-w-[340px] md:max-w-none md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem] ${cssClass}`}
    >
      {ReactHtmlParser(title)}
    </h2>
  );
};

export default AboutUsSubHeader;
