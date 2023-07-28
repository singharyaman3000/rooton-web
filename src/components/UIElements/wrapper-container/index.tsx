import React from 'react';

const Container = ({ children, cssBgClass }: { children: React.ReactNode, cssBgClass?:string }) => (
  <section className={`${cssBgClass} z-0 h-auto max-w-[2560px] mx-auto`}>
    <div className="flex flex-col mx-auto px-6 md:px-20">{children}</div>
  </section>
);

export default Container;
