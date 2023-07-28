'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Divider from './Divider';
import { useScroll } from 'framer-motion';

export interface IProcess {
  key: string;
  value: string;
  position: string;
}

export interface IOurProcessData {
  process: IProcess[];
}

const Processes = ({ process }: IOurProcessData) => {

 const refs = useMemo(() => process.map(() => React.createRef<HTMLInputElement>()), [process]);


 useEffect(()=>{
    const handleScroll = () => {
        const divElems = refs;
        const visibleElems = divElems.filter((elems)=> elems.current?.offsetTop  && elems.current?.offsetTop >  0)
  
        // const div = carouselRef.current as HTMLDivElement;
        // if (div) {
        //   const scrolledAboveViewport = div.offsetTop - window.scrollY;
        //   console.log('Scrolled above viewport:', scrolledAboveViewport);
        // }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
} , [refs])


  return (
    <div className="mt-[48px] rela" >
      {process.map(({ key, value, position } , index) => {
        return (
          <>  
          <div className="flex py-[26px] px-[32px]" key={position} id={position} ref={refs[index]} >
            <div className="w-[37.5%] flex-shrink-0 flex items-center">
              <span className=" mr-[30px] text-[40px] font-light not-italic leading-[normal] tracking-[normal] text-[#e3a430]">
                {position}
              </span>
              <h5 className="text-xl font-bold not-italic leading-normal tracking-[normal] text-black">{key}</h5>
            </div>
            <div>
              <p className=" opacity-[0.7] text-lg font-medium not-italic leading-[1.67] tracking-[normal] text-black">{value}</p>
            </div>
          </div>
          <Divider/>
          </>
        );
      })}
      {/* <div className='absolute '>
      <Divider/>
      </div> */}
    </div>
  );
};

export default Processes;
