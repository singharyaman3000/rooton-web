import { ReactElement } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

type RTONBannerProps = {
  backgroundImageUrl: string;
  addGradient: boolean;
  heroText: string;
  description: string;
  button: ReactElement;
};

export default function RTONBanner({
  backgroundImageUrl,
  addGradient,
  heroText,
  description,
  button,
}: RTONBannerProps) {
  return (
    <div
      className="
        w-full
        mt-0
        h-[67.5vh]
        max-h-[640px]
        min-h-[380px]
      "
      style={{ backgroundImage: backgroundImageUrl }}
    >
      <Breadcrumbs
        className=' hidden lg:flex'
        data={[
          {
            title: 'Home',
            path: '',
          },
          {
            title: 'Services',
            path: '',
          },
          {
            title: 'Open Work Permit',
            path: '',
          },
        ]}
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
            w-full
            h-full
            flex
            flex-col
            justify-end
            xl:p-20
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
            {heroText}
          </h1>
          <p className=" mt-[22.2px] text-white font-bold text-[15px] leading-[1.67] lg:text-2xl">{description}</p>
          <div className=" mt-[57.8px]">{button}</div>
        </div>
      </div>
    </div>
  );
}
