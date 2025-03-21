import { ProfileCardInfo } from '../types';
import NextImage from '@/components/UIElements/NextImage';
import CloseIconWithBackground from '@/components/Icons/CloseIconWithBackground';
import PopUpOverlayWrapper from '@/components/UIElements/PopUp/PopUpOverLayWrapper';

interface ModalProfileCardProps {
  profileData: ProfileCardInfo;
  showPopUp: boolean;
  closePopUpFn: () => void;
}

const ModalProfileCard = ({ profileData, showPopUp, closePopUpFn }: ModalProfileCardProps) => {
  const { name, title, imageSrc, description } = profileData;

  return (
    <PopUpOverlayWrapper onClose={closePopUpFn} showPopUp={showPopUp}>
      <div className="mx-[3vw] 2k:w-full relative bg-white max-w-screen-xl max-h-[440px] p-7 md:p-10">
        <CloseIconWithBackground onClick={closePopUpFn} cssClas="absolute right-5 md:right-7 top-7 cursor-pointer" />
        <article className="flex justify-between">
          <div
            className="hidden md:flex w-[27%] relative max-w-[320px] max-h-[360px]"
            style={{
              backgroundColor: imageSrc.backgroundColor,
            }}
          >
            <NextImage
              src={imageSrc.employeeImage}
              altText={`Image of ${name}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain', objectPosition: 'bottom' }}
              title={`Image of ${name}`}
            />
          </div>
          <aside className="md:w-[69%]">
            <h3 className="mb-2 text-[22px] font-bold leading-modal-heading text-black">{name}</h3>
            <h4 className="mb-8 text-sm font-medium leading-heading tracking-[2px] text-black">{title}</h4>
            <p className="text-lg text-justify leading-primary-lg text-black h-[270px] pr-3.5 overflow-y-scroll whitespace-pre-wrap">
              {description}
            </p>
          </aside>
        </article>
      </div>
    </PopUpOverlayWrapper>
  );
};

export default ModalProfileCard;
