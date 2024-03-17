'use client';

import { MouseEvent, useState } from 'react';
import DownArrowIcon from '@/components/Icons/DownArrowIcon';
import FlagComponentWrapper, { ILanguageData } from './FlagComponentWrapper';
import { useParams, usePathname } from 'next/navigation';
import { appendAssetUrl, getDetraslatedURL, getFlagUrl } from '@/utils';
import NextImage from '@/components/UIElements/NextImage';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';

interface RTONLanguageDropDownProps {
  scrolledEnough: boolean;
  isFixed?: boolean;
}

export default function RTONLanguageDropDown({ scrolledEnough, isFixed }: RTONLanguageDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const path = usePathname();
  const { headerFooterData } = useHeaderFooterContext();
  const selectedLang = getFlagUrl(headerFooterData, params.lang);

  const dropdownContainerOnClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onLanguageChange = (selectedLanguage: ILanguageData) => {
    handleClose();
    let nextRoute = '';
    if (params.lang) {
      if (selectedLanguage.attributes.code === 'en') {
        nextRoute = getDetraslatedURL(path, params.lang);
      } else if (selectedLanguage.attributes.code !== params.lang) {
        nextRoute = path.replace(params.lang, selectedLanguage.attributes.code);
      }
    } else if (selectedLanguage.attributes.code !== 'en') {
      nextRoute = `${process.env.NEXT_APP_BASE_URL ?? ''}${selectedLanguage.attributes.code}${path}`;
    }

    if (nextRoute) {
      window.location.href = nextRoute;
    }
  };

  const getTextColor = () => {
    if (isFixed) return 'text-primary-font-color';
    return scrolledEnough ? 'text-primary-font-color' : 'text-white';
  };

  return (
    <button
      aria-label="Language dropdown button "
      type="button"
      onClick={() => {
        setIsOpen((o) => {
          return !o;
        });
      }}
      className=" flex gap-2 items-center relative z-[1000]"
    >
      <div className="w-[16px] h-[16px] relative">
        {selectedLang && (
          <NextImage
            src={appendAssetUrl(selectedLang?.attributes?.media_url?.data?.attributes?.url)}
            altText={selectedLang.attributes?.media_url?.data?.attributes?.alternativeText}
            title=""
            sizes="100vw"
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      <p className={`text-base font-medium ${getTextColor()}`}>{selectedLang?.attributes.code}</p>
      <span className={`text-base ${scrolledEnough ? ' text-spanrimary-font-color' : 'text-white'}`}>
        <DownArrowIcon isScrolled={scrolledEnough} isFixed={isFixed} />
      </span>
      {isOpen && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          onClick={(e) => {
            return dropdownContainerOnClick(e);
          }}
          className="
               overscroll-contain
                z-[1001]
                absolute
                w-[180px]
                bg-primary
                text-primary-font-color
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
                h-[276px]
                overflow-y-scroll
            "
        >
          {<FlagComponentWrapper handleOnClick={onLanguageChange} />}
        </div>
      )}
    </button>
  );
}
