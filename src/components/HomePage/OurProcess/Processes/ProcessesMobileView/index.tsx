import React, { Fragment } from 'react';
import { IOurProcessData } from '../../interfaces';
import MobileDivider from './Divider';

const ProcessesMobileView = ({ process }: IOurProcessData) => {
  return (
    <div className="block md:hidden mt-[34px] mb-[80px] processes-mobile-view">
      {process.map(({ key, value, position }) => {
        return (
          <Fragment key={`${position}-mobile`} >
            <div className="p-[16px_0px]">
              <div className="w-full flex items-center mb-[8px]">
                <span className="text-2xl text-golden-yellow mr-3  font-light not-italic leading-[normal] tracking-[normal]">
                  {position}
                </span>{' '}
                <h4 className="text-sm font-bold text-primary-font-color not-italic leading-normal tracking-[normal]">
                  {key}
                </h4>
              </div>
              <p className="text-[13px] font-medium not-italic leading-[1.62] tracking-[normal] text-primary-font-color opacity-70">
                {value}
              </p>
            </div>
            <MobileDivider />
          </Fragment>
        );
      })}
    </div>
  );
};

export default ProcessesMobileView;
