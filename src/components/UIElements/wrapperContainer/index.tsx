import React from 'react';

const Container = ({ children, cssBgClass }: { children: React.ReactNode, cssBgClass?:string }) => (
  <section className={`${cssBgClass} z-0 h-auto max-w-screen-max-screen mx-auto`}>
    <div className="flex flex-col mx-auto px-[24px] md:px-[48px]  lg:px-[80px]">{children}</div>
  </section>
);

export default Container;
