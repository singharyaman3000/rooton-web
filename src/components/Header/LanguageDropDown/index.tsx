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
}

export default function RTONLanguageDropDown({ scrolledEnough }: RTONLanguageDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const path = usePathname();
  const { headerFooterData } = useHeaderFooterContext();
  const selectedLang = getFlagUrl(headerFooterData, params.lang);

  const dropdownContainerOnClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onLanguageChange = (selectedLanguage: ILanguageData) => {
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

    if(nextRoute){
      window.location.href = nextRoute;
    }

  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        aria-label="Language dropdown button "
        type="button"
        onClick={() => {
          setIsOpen((o) => {return !o;});
        }}
        className=" flex gap-2 items-center relative z-[1001]"
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
        <p className={`text-base font-medium ${scrolledEnough ? ' text-primary-font-color' : 'text-white'}`}>{selectedLang?.attributes.code}</p>
        <span className={`text-base ${scrolledEnough ? ' text-spanrimary-font-color' : 'text-white'}`}>
          <DownArrowIcon isScrolled={scrolledEnough} />
        </span>
        {isOpen && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            onClick={(e) => {return dropdownContainerOnClick(e);}}
            className="
               overscroll-contain
                z-[1001]
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
                h-[276px]
                overflow-y-scroll
            "
          >
            {<FlagComponentWrapper handleOnClick={onLanguageChange} />}
          </div>
        )}
      </button>

      {isOpen && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onClick={handleClose} className="cursor-[default] fixed top-0 left-0 square-[100%] z-[1000]"></div>
      )}
    </>
  );
}
