import React, { ReactElement } from 'react';
import FacebookIconBlue from '@/components/Icons/FacebookIconBlue';
import InstagramIcon from '@/components/Icons/InstagramIcon';
import LinkedInIconBlue from '@/components/Icons/LinkedInIconBlue';
import YoutubeIconRed from '@/components/Icons/YoutubeIconRed';
import { SocialMediaInterfaceType } from '@/app/services/apiService/headerFooterAPI';
import TwitterIcon from '@/components/Icons/TwitterIcon';

type SocialMediaLinksPropsType = { socialData: SocialMediaInterfaceType[]; wrapperClass?: string };

const ICON_META = {
  facebook: FacebookIconBlue,
  twitter: TwitterIcon,
  linkedIn: LinkedInIconBlue,
  youTube: YoutubeIconRed,
  instagram: InstagramIcon,
} as { [key: string]: () => ReactElement };

const SocialMediaLinks: React.FC<SocialMediaLinksPropsType> = ({ socialData, wrapperClass }) => {
  const handleIconClick = (url: string) => {
    window.open(url ?? '');
  };

  return (
    <div className={`flex items-center gap-[38px] lg:gap-7 ${wrapperClass}`}>
      {socialData?.map((data) => {
        const [[key, value]] = Object.entries(data);
        const Icon = ICON_META[key];
        return (
          <div
            aria-label="social-media-icon"
            key={key}
            onClick={() => {
              handleIconClick(value?.url);
            }}
            role="button"
            tabIndex={0}
            className="cursor-pointer"
            title={value?.alternativeText}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaLinks;
