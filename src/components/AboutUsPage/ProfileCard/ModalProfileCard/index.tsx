import CloseIconWithBackground from '@/components/Icons/CloseIconWithBackground';
import NextImage from '@/components/UIElements/NextImage';
import PopUpOverlayWrapper from '@/components/UIElements/PopUp/PopUpOverLayWrapper';

interface ModalProfileCardProps {
  profileData: {
    name: string;
    title: string;
    imageSrc: string;
    description: string;
  };
  showPopUp: boolean;
  closePopUpFn: () => void;
}

const ModalProfileCard = ({ profileData, showPopUp, closePopUpFn }: ModalProfileCardProps) => {
  const { name, title, imageSrc, description } = profileData;

  return (
    <PopUpOverlayWrapper onClose={closePopUpFn} showPopUp={showPopUp}>
      <div className="">
        <CloseIconWithBackground />
        <article className="">
          <div>
            <NextImage
              src={imageSrc}
              altText={`Image of ${name}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              title={`Image of ${name}`}
              classSelector="!static !h-auto self-end !max-w-80 !max-h-[360px]"
            />
          </div>
          <aside className="">
            <h2 className="">{name}</h2>
            <h3 className="">{title}</h3>
            <p className="">{description}</p>
          </aside>
        </article>
      </div>
    </PopUpOverlayWrapper>
  );
};

export default ModalProfileCard;
