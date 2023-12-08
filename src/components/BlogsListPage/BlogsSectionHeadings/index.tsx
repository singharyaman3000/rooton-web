import { ISectionTitle } from '@/components/UIElements/SectionHeadings/SectionTitle';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export interface ISectionContent extends ISectionTitle {
  subTitle: string;
  subCssClass?: string;
  h2Subtitle?: boolean;
}

const BlogsSectionHeadings = ({ title, subTitle }: ISectionContent) => {
  return (
    <>
      <span
        className={
          'block text-golden-yellow gradient-text  text-sm font-semibold not-italic leading-[normal] tracking-[2.8px] md:text-xl md:tracking-[4px]'
        }
      >
        {ReactHtmlParser(title)}
      </span>
      <h2
        className={
          'max-w-[340px] md:max-w-none md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem]'
        }
      >
        {ReactHtmlParser(subTitle)}
      </h2>
    </>
  );
};

export default BlogsSectionHeadings;
