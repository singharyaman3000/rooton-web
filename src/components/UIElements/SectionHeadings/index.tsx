import React from 'react';
import SectionTitle, { ISectionTitle } from './SectionTitle';
import SubSectionTitle from './SubSectiontitle';
import ReactHtmlParser from 'react-html-parser';


export interface ISectionContent extends ISectionTitle {
  subTitle: string;
  subCssClass?: string;
  h2Subtitle?: boolean;
}

const SectionHeadings = ({ title, subTitle, cssClass, subCssClass, h2Subtitle = false }: ISectionContent) => {
  return (
    <>
      {title && <SectionTitle title={title} cssClass={cssClass} />}
      {h2Subtitle ? (
        <h2
          className={`max-w-[340px] md:max-w-none md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem] ${cssClass}`}
        >
          {ReactHtmlParser(subTitle)}
        </h2>
      ) : (
        <SubSectionTitle title={subTitle} cssClass={subCssClass} />
      )}
    </>
  );
};

export default SectionHeadings;
