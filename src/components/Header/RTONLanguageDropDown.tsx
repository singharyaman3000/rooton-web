'use client';

import UKFlagIcon from '@/components/Icons/UKFlagIcon';
import { MouseEvent, useEffect, useState } from 'react';
import DownArrowIcon from '@/components/Icons/DownArrowIcon';
import { languages } from '@/app/(client-pages)/[lang]/translator';
import { useParams  , useRouter , usePathname } from 'next/navigation';


type RTONLanguageDropDownProps = {
  scrolledEnough: boolean;
};

export default function RTONLanguageDropDown({ scrolledEnough }: RTONLanguageDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const routes = useRouter();
  const path  = usePathname();


  const dropdownContainerOnClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(false);
    const nextRoute = path.replace(params.lang ,( e.target as HTMLElement).id);
    window.location.href =  nextRoute
  };





  return (
    <button
      aria-label="Language dropdown button"
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
          {languages.map(({ icon, label  , key}) => {
            return (
              <span className=" flex gap-2 items-center" key={label} >
                {icon}
                <p className=" text-base font-medium" id={key}>{label}</p>
              </span>
            );
          })}
        </div>
      )}
    </button>
  );
}
