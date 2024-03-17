import React from 'react';

const Container = ({ children, cssBgClass }: { children: React.ReactNode, cssBgClass?:string }) => {return (
  <section className={`${cssBgClass} z-0 h-auto max-w-screen-2k mx-auto`}>
    <div className="flex flex-col mx-auto px-[24px] md:px-[48px]  lg:px-[80px]">{children}</div>
  </section>
);};

export default Container;
