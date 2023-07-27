import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className=" z-0 h-auto mx-auto xl:bg-credibility-grid  bg-contain">
    <div className="flex mx-auto px-6 md:px-20">{children}</div>
  </section>
);

export default Container;
