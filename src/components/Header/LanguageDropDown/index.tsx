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
      } else {
        nextRoute = path.replace(params.lang, selectedLanguage.attributes.code);
      }
    } else {
      nextRoute = (process.env.NEXT_APP_BASE_URL ?? '') + selectedLanguage.attributes.code + path;
    }
    window.location.href = nextRoute;
  };

  const handleClose = ()=>{
    setIsOpen(false);
    console.log("ooooo")
  }

  return (
    <>
    <button
      aria-label="Language dropdown button"
      type="button"
      onClick={() => {
        setIsOpen((o) => !o);
      }}
      className=" flex gap-2 items-center relative"
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
      <p className={`text-base font-medium ${scrolledEnough ? ' text-primary-font-color' : 'text-white'}`}>EN</p>
      <span className={`text-base ${scrolledEnough ? ' text-spanrimary-font-color' : 'text-white'}`}>
        <DownArrowIcon isScrolled={scrolledEnough} />
      </span>
    
      {isOpen && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          onClick={(e) => dropdownContainerOnClick(e)}
          className="
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
            "
        >
          {<FlagComponentWrapper handleOnClick={onLanguageChange} />}
        </div>
      )}
    </button>
      {isOpen && <div onClick={handleClose} className='fixed top-0 left-0 square-[100%] z-[1000]'></div>}
      </>
  );
}
