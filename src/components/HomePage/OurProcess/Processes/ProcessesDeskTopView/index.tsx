'use client';

import React, { Fragment, useMemo } from 'react';
import Divider from './Divider';
import MoverIcon from './MoverIcon';
import { IOurProcessData } from '../../interfaces';
import MoverArrow from './MoverArrow';
import FlightPath from './FlightPath';
import useScrollHeighLight from '../hooks/useScrollHeighLight';

const APPROX_NAV_BAR_HEIGHT = 80;

const ProcessesDeskTopView = ({ process }: IOurProcessData) => {
  const refs = useMemo(() => process.map(() => React.createRef<HTMLDivElement>()), [process]);
  const processLength: number = process?.length;
  const { selectedElem, movableTop } = useScrollHeighLight({
    isMobile: false,
    approxNavBarHeight: APPROX_NAV_BAR_HEIGHT + 10,
    refs,
  });
  return (
    <div className="mt-[48px] relative hidden md:block processes">
      {process?.map(({ title, description, position }, index) => {
        return (
          title && (
            <Fragment key={`${position}-desktop`}>
              <div
                style={{ background: selectedElem.toString() === position.toString() ? 'var(--selector-bg)' : '' }}
                className="processItem flex py-[26px] px-[32px] ease-linear transition-all"
                id={position}
                ref={refs[index]}
              >
                <div className="w-[37.5%] h-[32px] gap-[30px] flex-shrink-0 flex items-center">
                  <span className=" min-w-[24px] flex-shrink-0  text-[40px] font-light not-italic leading-[normal] tracking-[normal] text-[#e3a430]">
                    {position}
                  </span>
                  <h5 className="text-xl font-bold not-italic leading-normal tracking-[normal] text-primary-font-color md:pr-[12px]">
                    {title}
                  </h5>
                </div>
                <div className="pl-[70px] pr-[30px] min-h-[60px]">
                  <p className=" opacity-[0.7] text-lg  font-medium not-italic leading-[1.67] tracking-[normal] text-primary-font-color">
                    {description}
                  </p>
                </div>
              </div>
              {index < processLength - 1 && <Divider />}
            </Fragment>
          )
        );
      })}
      <div className="absolute p-[8px] transition-all  duration-1700 left-[35%]" style={{ top: movableTop }}>
        <div className="square-[64px] bg-white flex items-center justify-center z-[1] relative ">
          <MoverIcon />
        </div>
        <div className="absolute left-0 top-0">
          <MoverArrow />
        </div>
        <div className="movable-wrapper"></div>
      </div>
      <FlightPath />
    </div>
  );
};

export default ProcessesDeskTopView;
