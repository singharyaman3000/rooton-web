import { ReactElement } from 'react';

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
    <div className=" w-full mt-0 h-[640px]" style={{ backgroundImage: backgroundImageUrl }}>
      <div
        className=" px-6 pb-9 w-full h-full flex flex-col justify-end"
        style={{
          backgroundImage: addGradient
            ? 'linear-gradient(190deg, rgb(0 0 0 / 43%) 10%, rgb(0 0 0 / 59%) 42%, #0009 10%)'
            : '',
        }}
      >
        <h1 className="open-work-permit text-[37.2px] pt-[320px] mr-9 font-bold leading-[normal] font-jakartaSans">
          { heroText }
        </h1>
        <p className=" mt-[22.2px] text-white font-bold text-[15px] leading-[1.67]">
          { description }
        </p>
        <div className=" mt-[57.8px]">
          { button }
        </div>
      </div>
    </div>
  );
}
