import React from 'react';

const ListHeading = ({ serviceTitle }: { serviceTitle: string }) => {
  return (
    <h1 className="leading-none uppercase mb-2 text-[13px] font-medium text-font-color-orange tracking-[2.17px]">
      {serviceTitle}
    </h1>
  );
};

export default ListHeading;
