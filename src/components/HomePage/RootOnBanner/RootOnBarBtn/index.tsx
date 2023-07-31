import React, { ReactElement } from 'react';
import BarBtnIcon from './BarBtnIcon';

interface IRootOnBarBtn {
  label: string;
  url: string;
  arialLabel: string;
  icon: ReactElement;
}

const RootOnBarBtn = ({ label, arialLabel, icon }: IRootOnBarBtn) => {
  return (
    <div className="relative bar-btn ">
      <button
        type="button"
        className="justify-between flex items-center text-[13px] bg-white md:text-lg font-bold not-italic leading-[1.67] tracking-[normal] text-black   w-full p-[17.8px_19.3px_17.8px_22.5px] bg-white md:p-[24px_27.7px_24px_30px]"
        aria-label={arialLabel}
      >
        {label}
        <span className="ml-[24px]">{icon}</span>
      </button>
      <BarBtnIcon />
    </div>
  );
};

export default RootOnBarBtn;
