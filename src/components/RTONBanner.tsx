import { Breadcrumbs } from '@/components/Breadcrumbs';
import NextImage from '@/components/UIElements/NextImage';
import { ReactElement } from 'react';
import HtmlParser from 'react-html-parser';

type BlogsBannerPropsType = {
  backgroundImageUrl: string;
  addGradient?: boolean;
  heroText: string;
  description: string;
  breadCrumbData: { title: string; path: string }[];
  heightStyle?: string;
  subDescription?: string;
  button?: ReactElement;
  noGrid?: boolean;
  fontSizes: { description: string; heading?: string; subHeading?: string };
};
// "text-[15px] lg:text-2xl"
export default function RTONBanner({
  backgroundImageUrl,
  addGradient,
  heroText,
  description,
  breadCrumbData,
  heightStyle = ' h-[67.5vh] max-h-[400px] min-h-[380px]',
  subDescription,
  button,
  noGrid,
  fontSizes,
}: BlogsBannerPropsType) {
  return (
    <div className={`w-full mt-0 ${heightStyle}`}>
      <Breadcrumbs className=" hidden lg:flex" data={breadCrumbData} />
      <div
        className=" w-full h-full"
        style={{
          backgroundImage: addGradient
            ? 'linear-gradient(190deg, rgb(0 0 0 / 20%) 80%, rgb(0 0 0 / 40%) 90%, #0009 90%)'
            : '',
        }}
      >
        <div
          className={`
            ${noGrid ? '' : 'lg:bg-banner-grid-overlay'}
            lg:bg-cover
            px-6
            pb-9
            lg:pb-[60px]
            w-full
            h-full
            flex
            flex-col
            justify-end
            xl:px-20
          `}
        >
          <h1
            className="
                    open-work-permit
                    text-[37.2px]
                    lg:text-[62px]
                    pt-[320px]
                    mr-9
                    font-bold
                    leading-[normal]
                    font-jakartaSans
                "
          >
            {HtmlParser(heroText)}
          </h1>
          <p className={`mt-[22.2px] text-white ${fontSizes.description} font-bold leading-[1.67] max-w-[800px]`}>
            {HtmlParser(description)}
          </p>
          {subDescription && (
            <h2 className="mt-5 text-[17px] lg:text-[32px] font-bold lg:font-extrabold text-white">
              {HtmlParser(subDescription)}
            </h2>
          )}
          {button && <div className=" mt-10 w-full md:max-w-[418px]">{button}</div>}
        </div>
        <div className={`${heightStyle} w-full absolute left-0 top-0 z-[-1]`}>
          <NextImage
            sizes="100vw"
            priority
            src={backgroundImageUrl}
            fill
            style={{ objectFit: 'cover' }}
            altText="root-on-banner-image"
            title="Banner Image"
          />
        </div>
      </div>
    </div>
  );
}
