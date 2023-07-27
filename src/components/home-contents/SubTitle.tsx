import React from 'react';

const SubTitle = ({ subtitle }: { subtitle: string }) => (
  <h1
    className={
      'text-sm md:text-lg uppercase md:mb-1 mb-0.5 md:tracking-[3.6px] tracking-[2.818px] font-semibold text-golden-yellow leading-loose'
    }
  >
    {subtitle}
  </h1>
);

export default SubTitle;
