import { Dispatch, SetStateAction } from 'react';

import { ProfileCardInfo } from './types';
import NextImage from '@/components/UIElements/NextImage';

interface ProfileCardProps {
  profileData: ProfileCardInfo;
  popUpDisplayFns: {
    showPopUp: () => void;
    setProfileDataForModal: Dispatch<SetStateAction<ProfileCardInfo>>;
  };
}

const ProfileCard = ({ profileData, popUpDisplayFns }: ProfileCardProps) => {
  const { name, title, imageSrc } = profileData;
  const { showPopUp, setProfileDataForModal } = popUpDisplayFns;

  const profileClickHandler = () => {
    setProfileDataForModal(profileData);
    showPopUp();
  };

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={profileClickHandler}
      className="card-hover-effect relative h-full w-80 flex flex-col border border-solid border-almond hover:border-golden-yellow bg-white cursor-pointer transition-colors duration-300 ease-in-out"
    >
      <div className="h-[360px] relative" style={{ backgroundColor: imageSrc.backgroundColor }}>
        <NextImage
          src={imageSrc.employeeImage}
          altText={`${name}`}
          fill
          sizes="100vw"
          style={{ objectFit: 'contain' }}
          title={`${name}`}
          priority
        />
      </div>
      <div className="py-[26px] pl-7 pr-2 blog-bg">
        <h5 className="mb-1.5 text-primary-font-color font-bold text-[22px] leading-normal">{name}</h5>
        <p className="text-primary-font-color opacity-50 text-sm font-semibold leading-heading tracking-[2px]">{title}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
