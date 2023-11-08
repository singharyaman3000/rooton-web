import NextImage from '@/components/UIElements/NextImage';
import { Dispatch, SetStateAction } from 'react';

interface ProfileCardProps {
  profileData: {
    name: string;
    title: string;
    imageSrc: string;
    description: string;
  };
  popUpDisplayFns: {
    showPopUp: () => void;
    setProfileDataForModal: Dispatch<
      SetStateAction<{
        name: string;
        title: string;
        imageSrc: string;
        description: string;
      }>
    >;
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
      className="card-hover-effect relative mb-4 w-80 flex flex-col border border-solid border-almond hover:border-golden-yellow bg-white cursor-pointer transition-colors duration-300 ease-in-out"
    >
      <div className="w-80 h-[360px] relative">
        <NextImage
          src={imageSrc}
          altText={`${name}`}
          fill
          sizes="100vw"
          style={{ objectFit: 'contain' }}
          title={`${name}`}
        />
      </div>
      <div className="py-[26px] pl-7 pr-2">
        <h5 className="mb-1.5 text-black font-bold text-[22px] leading-normal">{name}</h5>
        <p className="text-black opacity-50 text-sm font-semibold leading-heading tracking-[2px]">{title}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
