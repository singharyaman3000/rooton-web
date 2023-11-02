import { Breadcrumbs } from '@/components/Breadcrumbs';
import NextImage from '@/components/UIElements/NextImage';
import HtmlParser from 'react-html-parser';

type BlogsBannerPropsType = {
  backgroundImageUrl: string;
  addGradient: boolean;
  heroText: string;
  description: string;
  breadCrumbData: { title: string; path: string }[];
};

export default function RTONBanner({
  backgroundImageUrl,
  addGradient,
  heroText,
  description,
  breadCrumbData,
}: BlogsBannerPropsType) {
  return (
    <div
      className="
        w-full
        mt-0
        h-[67.5vh]
        max-h-[400px]
        min-h-[380px]
      "
    >
      <Breadcrumbs
        className=" hidden lg:flex"
        data={breadCrumbData}
      />
      <div
        className=" w-full h-full"
        style={{
          backgroundImage: addGradient
            ? 'linear-gradient(190deg, rgb(0 0 0 / 43%) 10%, rgb(0 0 0 / 59%) 42%, #0009 10%)'
            : '',
        }}
      >
        <div
          className="
            lg:bg-banner-grid-overlay
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
                "
          >
            {HtmlParser(heroText)}
          </h1>
          <p className=" mt-[22.2px] text-white font-bold text-[15px] leading-[1.67] lg:text-2xl max-w-[800px]">{description}</p>
        </div>
        <div className="h-[400px] w-full absolute left-0 top-0 z-[-1]">
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
