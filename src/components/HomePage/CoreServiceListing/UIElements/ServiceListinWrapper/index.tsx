import React from 'react';

const ServiceListingWrapper = ({ children, cssClass }: { children: React.ReactNode, cssClass?:string }) => {
  return (
    <div className={`${cssClass} w-100vw h-100vh  md:w-[703px] md:max-h-[80vh]  md:h-[741px]  shadow-talk-to-our-experts-shadow bg-white  pt-[41px]  pb-[36px]`}>
      {children}
    </div>
  );
};

export default ServiceListingWrapper;
