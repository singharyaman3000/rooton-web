import { IMediaUrlData } from '@/app/services/apiService/interfaces';
import NextImage from '@/components/UIElements/NextImage';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import { appendAssetUrl } from '@/utils';
import { useParams } from 'next/navigation';
import React from 'react';

export interface ILanguageAttributes {
  name: string;
  code: string;
  media_url: { data: IMediaUrlData };
}
export interface ILanguageData {
  id: number;
  attributes: ILanguageAttributes;
}
/* eslint-disable no-unused-vars */
const FlagComponentWrapper = ({ handleOnClick }: { handleOnClick: (selectedLanguage: ILanguageData) => void }) => {
  const { headerFooterData } = useHeaderFooterContext();
  const params = useParams();

  const isSelecetdLang = (code: string) => {
    return params.lang ? params.lang === code : code === 'en';
  };

  return headerFooterData?.[0]?.attributes.languages.data?.map((item) => {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={`hover:bg-[#b89c6133] ${isSelecetdLang(item.attributes.code) && 'bg-[#b89c6133]'}`}
        key={item?.attributes.name}
        onClick={() => {
          return handleOnClick(item);
        }}
      >
        <span className="mx-[18px] flex gap-2 items-center p-2" key={item?.attributes.name}>
          <div className="w-[30px]  h-[20px] relative">
            <NextImage
              src={appendAssetUrl(item.attributes?.media_url?.data?.attributes?.url)}
              altText={item.attributes?.media_url?.data?.attributes?.alternativeText}
              title=""
              sizes="100vw"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className=" text-base font-medium">{item?.attributes.name}</p>
        </span>
      </div>
    );
  });
};
export default FlagComponentWrapper;
