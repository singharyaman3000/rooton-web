'use client';

import UKFlagIcon from '@/components/Icons/UKFlagIcon';
import { MouseEvent, useState } from 'react';
import DownArrowIcon from '@/components/Icons/DownArrowIcon';
import { ILanguage } from '@/app/(client-pages)/[lang]/translator';
import { useParams, usePathname } from 'next/navigation';
import IndiaFlagIconSm from '../Icons/IndiaFlagIconSm';
import GermanyFlagIcon from '../Icons/GermanyFlagIcon';
import PortugalFlagIcon from '../Icons/PortugalFlagIcon';
import SpainflagIcon from '../Icons/SpainflagIcon';
import FranceFlagIcon from '../Icons/FranceFlagIcon';
import ItalyFlagIcon from '../Icons/ItalyFlagIcon';

export const languages: ILanguage[] = [
  { key: 'en', label: 'English', icon: <UKFlagIcon /> },
  { key: 'es', label: 'Spanish', icon: <SpainflagIcon /> },
  { key: 'pu', label: 'Punjabi', icon: <IndiaFlagIconSm /> },
  { key: 'pt', label: 'Portuguese', icon: <PortugalFlagIcon /> },
  { key: 'fr', label: 'France', icon: <FranceFlagIcon /> },
  { key: 'it', label: 'Italian', icon: <ItalyFlagIcon /> },
  { key: 'de', label: 'German', icon: <GermanyFlagIcon /> },
  { key: 'gu', label: 'Gujarati', icon: <IndiaFlagIconSm /> },
];

type RTONLanguageDropDownProps = {
  scrolledEnough: boolean;
};

export default function RTONLanguageDropDown({ scrolledEnough }: RTONLanguageDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const path = usePathname();

  const dropdownContainerOnClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(false);
    const nextRoute = path.replace(params.lang, (e.target as HTMLElement).id);
    window.location.href = nextRoute;
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
          {languages.map(({ icon, label, key }) => {
            return (
              <span className=" flex gap-2 items-center" key={label}>
                {icon}
                <p className=" text-base font-medium" id={key}>
                  {label}
                </p>
              </span>
            );
          })}
        </div>
      )}
    </button>
  );
}
