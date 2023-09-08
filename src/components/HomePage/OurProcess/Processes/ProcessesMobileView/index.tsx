import React, { Fragment, useMemo } from 'react';
import { IOurProcessData } from '../../interfaces';
import MobileDivider from './Divider';
import useScrollHeighLight from '../hooks/useScrollHeighLight';

const APPROX_NAV_BAR_HEIGHT = 60;

const ProcessesMobileView = ({ process }: IOurProcessData) => {
  const refs = useMemo(() => process.map(() => React.createRef<HTMLDivElement>()), [process]);

  const { selectedElem } = useScrollHeighLight({
    isMobile: true,
    refs,
    approxNavBarHeight: APPROX_NAV_BAR_HEIGHT,
  });

  return (
    <div className="block md:hidden mt-[34px] mb-[80px] processes-mobile-view">
      {process.map(({ title, description, position }, index) => {
        const selectedItem = selectedElem.toString() === `process-mobile-${position}`;
        return (
          description && (
            <Fragment key={`${position}-mobile`}>
              <div
                className="p-[16px_24px] -ml-[24px] -mr-[24px]"
                id={`process-mobile-${position}`}
                ref={refs[index]}
                style={{ background: selectedItem ? 'var(--selector-bg)' : '' }}
              >
                <div className="w-full flex items-center mb-[8px]">
                  <span className="text-2xl text-golden-yellow mr-3  font-light not-italic leading-[normal] tracking-[normal]">
                    {position}
                  </span>{' '}
                  <h4 className="text-sm font-bold text-primary-font-color not-italic leading-normal tracking-[normal]">
                    {title}
                  </h4>
                </div>
                <p className="text-[13px] font-medium not-italic leading-[1.62] tracking-[normal] text-primary-font-color opacity-70">
                  {description}
                </p>
              </div>
              <MobileDivider cssClass={`${selectedItem ? 'hidden' : 'block'}`} />
            </Fragment>
          )
        );
      })}
    </div>
  );
};

export default ProcessesMobileView;
