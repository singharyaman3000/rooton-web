import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className=" z-0 h-auto mx-auto max-w-[1440px] xl:bg-credibility-grid bg-contain">
    <div className="flex mx-auto px-6 md:px-20">{children}</div>
  </div>
);

export default Container;
