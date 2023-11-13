'use client';

import React, { ReactElement, useContext } from 'react';
import BarBtnIcon from './BarBtnIcon';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';

interface IRootOnBarBtn {
  label: string;
  url: string;
  arialLabel: string;
  icon: ReactElement;
}

const RootOnBarBtn = ({ label, arialLabel, icon }: IRootOnBarBtn) => {

  const { openCoreServiceList, enableFormFocus } = useContext(ModalShowContextname);

  return (
    <div className="relative bar-btn ">
      <button
        type="button"
        className="justify-between flex items-center text-[13px] bg-white md:text-lg font-bold not-italic leading-[1.67] tracking-[normal] text-black   w-full p-[12px_19.3px_12px_15px] bg-white md:p-[22px_24px_22px_30px]"
        aria-label={arialLabel}
        onClick={() => {
          enableFormFocus();
          openCoreServiceList();
        }}
      >
        {label}
        <span className="ml-[24px]">{icon}</span>
      </button>
      <BarBtnIcon />
    </div>
  );
};

export default RootOnBarBtn;
