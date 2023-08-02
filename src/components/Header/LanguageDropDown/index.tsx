'use client';

import UKFlagIcon from '@/components/Icons/UKFlagIcon';
import { MouseEvent, useState } from 'react';

import DownArrowIcon from '@/components/Icons/DownArrowIcon';
import FlagComponentWrapper from './FlagComponentWrapper';

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
                pt-[17px]
                pb-[15px]
                flex
                flex-col
                gap-[2px]
                left-[100px]
                lg:top-[45px]
                lg:-left-6
                z-1
            "
        >
          {<FlagComponentWrapper/>}
        </div>
      )}
    </button>
  );
}
