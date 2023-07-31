'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Divider from './Divider';
import MoverIcon from './MoverIcon';
import { IOurProcessData } from '../../interfaces';
import MoverArrow from './MoverArrow';
import FlightPath from './FlightPath';

const APPROX_NAV_BAR_HEIGHT = 80;
const APPROX_MOVER_HALF_HEIGHT = 32;

const ProcessesDeskTopView = ({ process }: IOurProcessData) => {
  const refs = useMemo(() => process.map(() => React.createRef<HTMLDivElement>()), [process]);

  const [selectedElem, updateSelectELem] = useState('1');
  const [movableTop, setMovableTop] = useState('0');

  useEffect(() => {
    const handleScroll = () => {
      const divElems = refs;
      const visibleElems = divElems.filter((elems) => {
        if (elems.current) {
          const boundingTop = elems.current?.getBoundingClientRect().top ?? 0;
          return boundingTop - APPROX_NAV_BAR_HEIGHT > 0;
        }
        return false;
      });
      if (visibleElems.length > 0) {
        const nearestElem = visibleElems.reduce<React.RefObject<HTMLDivElement>>((prev, current) => {
          const prevElementTop = prev.current?.offsetTop ?? 0;
          const currentElementTop = current.current?.offsetTop ?? 0;
          return prevElementTop < currentElementTop ? prev : current;
        }, visibleElems[0]);

        if (nearestElem.current) {
          const nearestElemTop = nearestElem.current?.offsetTop ?? 0;
          const nearesteElemHeight = nearestElem.current?.offsetHeight;

          const topValue = nearestElemTop + (nearesteElemHeight / 2 - APPROX_MOVER_HALF_HEIGHT);

          setMovableTop(`${topValue}px`);
          updateSelectELem(nearestElem.current?.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [refs]);

  return (
    <div className="mt-[48px] mb-[120px] relative hidden md:block processes">
      {process.map(({ key, value, position }, index) => {
        return (
          <>
            <div
              style={{ background: selectedElem.toString() === position.toString() ? 'var(--selector-bg)' : '' }}
              className='flex py-[26px] px-[32px] ease-linear transition-all'
              key={`${position}-desktop`}
              id={position}
              ref={refs[index]}
            >
              <div className="w-[37.5%] flex-shrink-0 flex items-center">
                <span className=" mr-[30px] text-[40px] font-light not-italic leading-[normal] tracking-[normal] text-[#e3a430]">
                  {position}
                </span>
                <h5 className="text-xl font-bold not-italic leading-normal tracking-[normal] text-primary-font-color">
                  {key}
                </h5>
              </div>
              <div className="pl-[70px] pr-[30px]">
                <p className=" opacity-[0.7] text-lg font-medium not-italic leading-[1.67] tracking-[normal] text-primary-font-color">
                  {value}
                </p>
              </div>
            </div>
            <Divider />
          </>
        );
      })}
      <div className="absolute p-[8px] transition-all  duration-1700 left-[35%]" style={{ top: movableTop }}>
        <div className="square-[64px] bg-white flex items-center justify-center z-[1] relative ">
          <MoverIcon />
        </div>
        <div className='absolute left-0 top-0'>
          <MoverArrow/>
        </div>
        <div className="movable-wrapper"></div>
      </div>
      <FlightPath/>
    </div>
  );
};

export default ProcessesDeskTopView;
