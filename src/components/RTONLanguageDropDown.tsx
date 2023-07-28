'use client';

import UKFlagIcon from '@/icons/UKFlagIcon';
import { MouseEvent, useState } from 'react';
import SpainflagIcon from '@/icons/SpainflagIcon';
import GermanyFlagIcon from '@/icons/GermanyFlagIcon';
import ItalyFlagIcon from '@/icons/ItalyFlagIcon';
import IndiaFlagIconSm from '@/icons/IndiaFlagIconSm';
import PortugalFlagIcon from '@/icons/PortugalFlagIcon';
import DownArrowIcon from '@/icons/downArrow.icon';
import FranceFlagIcon from '../icons/FranceFlagIcon';

type RTONLanguageDropDownProps = {
  scrolledEnough: boolean;
};

export default function RTONLanguageDropDown({ scrolledEnough }: RTONLanguageDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownContainerOnClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <button
      aria-label='Language dropdown button'
      type="button"
      onClick={() => {
        setIsOpen((o) => !o);
      }}
      className=" flex gap-2 items-center relative"
    >
      <UKFlagIcon />
      <p className={`text-base font-medium ${scrolledEnough ? ' text-primary-font-color' : 'text-white'}`}>EN</p>
      <span className={`text-base ${scrolledEnough ? ' text-spanrimary-font-color' : 'text-white'}`}>
        <DownArrowIcon isScrolled={scrolledEnough} />
      </span>
      {isOpen && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          onClick={(e) => dropdownContainerOnClick(e)}
          className="
                absolute
                w-[180px]
                bg-primary
                shadow-language-dropdown
                px-[18px]
                pt-[17px]
                pb-[15px]
                flex
                flex-col
                gap-5
                left-[100px]
                lg:top-[45px]
                lg:-left-6
            "
        >
          <span className=" flex gap-2 items-center">
            <UKFlagIcon />
            <p className=" text-base font-medium">English</p>
          </span>
          <span className=" flex gap-2 items-center">
            <FranceFlagIcon />
            <p className=" text-base font-medium">French</p>
          </span>
          <span className=" flex gap-2 items-center">
            <SpainflagIcon />
            <p className=" text-base font-medium">Spanish</p>
          </span>
          <span className=" flex gap-2 items-center">
            <GermanyFlagIcon />
            <p className=" text-base font-medium">German</p>
          </span>
          <span className=" flex gap-2 items-center">
            <ItalyFlagIcon />
            <p className=" text-base font-medium">Italian</p>
          </span>
          <span className=" flex gap-2 items-center">
            <IndiaFlagIconSm />
            <p className=" text-base font-medium">Punjabi</p>
          </span>
          <span className=" flex gap-2 items-center">
            <IndiaFlagIconSm />
            <p className=" text-base font-medium">Hindi</p>
          </span>
          <span className=" flex gap-2 items-center">
            <PortugalFlagIcon />
            <p className=" text-base font-medium">Portuguese</p>
          </span>
        </div>
      )}
    </button>
  );
}
