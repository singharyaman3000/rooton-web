import React, { ReactElement } from 'react';
import FacebookIconBlue from '@/components/Icons/FacebookIconBlue';
import InstagramIcon from '@/components/Icons/InstagramIcon';
import LinkedInIconBlue from '@/components/Icons/LinkedInIconBlue';
import TwitterIconBlue from '@/components/Icons/TwitterIconBlue';
import YoutubeIconRed from '@/components/Icons/YoutubeIconRed';
import { SocialMediaInterfaceType } from '@/app/services/apiService/headerFooterAPI';

type SocialMediaLinksPropsType = { socialData: SocialMediaInterfaceType[] };

const ICON_META = {
  facebook: FacebookIconBlue,
  twitter: TwitterIconBlue,
  linkedIn: LinkedInIconBlue,
  youTube: YoutubeIconRed,
  instagram: InstagramIcon,
} as { [key: string]: () => ReactElement };

const SocialMediaLinks: React.FC<SocialMediaLinksPropsType> = ({ socialData }) => {
  const handleIconClick = (url: string) => {
    window.open(url ?? '');
  };

  return (
    <div className="flex items-center gap-[38px] lg:gap-7 mt-6 lg:mt-10">
      {socialData?.map((data) => {
        const [[key, value]] = Object.entries(data);
        const Icon = ICON_META[key];
        return (
          <div
            key={key}
            onClick={() => {
              handleIconClick(value?.url);
            }}
            role="button"
            tabIndex={0}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaLinks;
