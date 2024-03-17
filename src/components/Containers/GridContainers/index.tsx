import React from 'react';

const GridContainer = ({ children, cssBgClass }: { children: React.ReactNode, cssBgClass?:string }) => {return (
  <section className={`${cssBgClass}`}>
    <div className="flex flex-col">{children}</div>
  </section>
);};

export default GridContainer;
