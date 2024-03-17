import React, { CSSProperties } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import NextImage from '@/components/UIElements/NextImage';
import BannerGrids from '@/components/HomePage/RootOnBanner/BannerGrid';

interface DynamicBannerSectionProps {
  bannerHeightTailwind?: string;
  backgroundImageUrl: { mobileScreen: string; desktopScreen?: string } | string;
  addGradient: boolean;
  heroText: string;
  description: string;
  breadCrumbData: { title: string; path: string }[];
  initials: string;
  logo_name: string;
}

const DynamicBannerSection = ({
  backgroundImageUrl,
  addGradient,
  heroText,
  breadCrumbData,
  bannerHeightTailwind = 'h-[400px]',
  initials,
  logo_name,
}: DynamicBannerSectionProps) => {
  let mobileBackgroundUrl;
  let desktopBackgroundUrl;

  if (typeof backgroundImageUrl === 'object') {
    mobileBackgroundUrl = backgroundImageUrl.mobileScreen;
    desktopBackgroundUrl = backgroundImageUrl?.desktopScreen;
  } else {
    mobileBackgroundUrl = backgroundImageUrl;
  }

  const imageStyle: CSSProperties = {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    filter: 'brightness(50%)', // Adjust the percentage as needed
  };

  return (
    <div className={`${bannerHeightTailwind} w-full mt-0 relative`}>
      <Breadcrumbs className="hidden lg:flex" data={breadCrumbData} />
      <div
        className="w-full h-full"
        style={{
          backgroundImage: addGradient
            ? 'linear-gradient(190deg, rgb(0 0 0 / 43%) 10%, rgb(0 0 0 / 59%) 42%, #0009 10%)'
            : '',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex items-center px-4 sm:px-6 xl:px-20 mt-[39px] z-10">
          {/* Logo div */}
          {initials && (
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-[#ff9d09b8] text-primary-white cursor-pointer">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{initials}</span>
            </div>
          )}

          {/* Name div */}
          {logo_name && (
            <div className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white self-center ml-4 md:ml-6 lg:ml-10">
              {logo_name}
            </div>
          )}

        </div>
        <div className={`${bannerHeightTailwind} w-full absolute left-0 top-0`}>
          <picture>
            {desktopBackgroundUrl ? <source media="(min-width: 480px)" srcSet={desktopBackgroundUrl} /> : null}
            <NextImage
              sizes="100vw"
              priority
              src={mobileBackgroundUrl}
              fill
              style={imageStyle}
              altText={heroText}
              title={heroText}
            />
          </picture>
          <div className="absolute bottom-0 right-0 hidden md:block">
            <BannerGrids />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicBannerSection;
