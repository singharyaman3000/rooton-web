import React from 'react';
import SectionTitle, { ISectionTitle } from './SectionTitle';
import SubSectionTitle from './SubSectiontitle';

export interface ISectionContent extends ISectionTitle {
  subTitle: string;
  subCssClass?: string;
}

const SectionHeadings = ({ title, subTitle, cssClass, subCssClass }: ISectionContent) => {
  return (
    <>
      <SectionTitle title={title} cssClass={cssClass} />
      <SubSectionTitle title={subTitle} cssClass={subCssClass} />
    </>
  );
};

export default SectionHeadings;
