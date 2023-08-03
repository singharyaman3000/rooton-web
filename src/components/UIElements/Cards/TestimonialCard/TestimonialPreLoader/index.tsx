import React from 'react';

const TestimonialPreLoader = () => {
  return (
    <div className="flex w-full">
      <div className="h-[32.5rem] !w-[73.4%] !min-w-[264px] md:!w-[29.2%] w-full md:!min-w-[404px] !md:max-w-[400px] p-[0px] skeleton relative">
        <div className=" relative h-full">
          <div className="absolute flex  items-center z-[10] left-0 bottom-0 bg-white p-[10px] md:p-[16px] w-full"></div>
        </div>
        <div className="absolute w-full h-full top-0 bg-black opacity-[0.32]"></div>
      </div>
    </div>
  );
};

export default TestimonialPreLoader;
