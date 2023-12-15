import HtmlParser from 'react-html-parser';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import NextImage from '@/components/UIElements/NextImage';

interface DynamicBannerSectionProps {
  bannerHeightTailwind?: string;
  backgroundImageUrl: { mobileScreen: string; desktopScreen?: string } | string;
  addGradient: boolean;
  heroText: string;
  description: string;
  breadCrumbData: { title: string; path: string }[];
}

const DynamicBannerSection = ({
  backgroundImageUrl,
  addGradient,
  heroText,
  description,
  breadCrumbData,
  bannerHeightTailwind,
}: DynamicBannerSectionProps) => {
  let mobileBackgroundUrl;
  let desktopBackgroundUrl;

  if (typeof backgroundImageUrl === 'object') {
    mobileBackgroundUrl = backgroundImageUrl.mobileScreen;
    desktopBackgroundUrl = backgroundImageUrl?.desktopScreen;
  } else {
    mobileBackgroundUrl = backgroundImageUrl;
  }

  return (
    <div
      className={`
        ${bannerHeightTailwind}
        w-full
        mt-0
        h-[67.5vh]
        max-h-[400px]
        min-h-[380px]
      `}
    >
      <Breadcrumbs className="hidden lg:flex" data={breadCrumbData} />
      <div
        className="w-full h-full"
        style={{
          backgroundImage: addGradient
            ? 'linear-gradient(190deg, rgb(0 0 0 / 43%) 10%, rgb(0 0 0 / 59%) 42%, #0009 10%)'
            : '',
        }}
      >
        <div
          className="
            lg:bg-cover
            px-6
            pb-[57px]
            sm:pb-9
            lg:pb-[57px]
            w-full
            h-full
            flex
            flex-col
            justify-end
            xl:px-20
          "
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
                    banner-text
                "
          >
            {HtmlParser(heroText)}
          </h1>
          <p className="mt-8 sm:mt-5 text-white font-bold text-[15px] leading-[1.67] lg:text-2xl max-w-[800px] ">
            {HtmlParser(description)}
          </p>
        </div>
        <div className={`${bannerHeightTailwind} h-[400px] w-full absolute left-0 top-0 z-[-1]`}>
          <picture>
            {desktopBackgroundUrl ? <source media="(min-width: 480px)" srcSet={desktopBackgroundUrl} /> : null}
            <NextImage
              sizes="100vw"
              priority
              src={mobileBackgroundUrl}
              fill
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              altText={heroText}
              title={heroText}
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default DynamicBannerSection;
