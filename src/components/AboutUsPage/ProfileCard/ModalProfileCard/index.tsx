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
      <div className="m-auto w-[95%] xl:w-full relative bg-white max-w-screen-xl max-h-[440px] p-10">
        <CloseIconWithBackground onClick={closePopUpFn} cssClas="absolute right-7 top-7 cursor-pointer" />
        <article className="flex justify-between">
          <div className="flex w-[27%] relative max-w-[320px] max-h-[360px]">
            <NextImage
              src={imageSrc}
              altText={`Image of ${name}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              title={`Image of ${name}`}
            />
          </div>
          <aside className="w-[69%]">
            <h3 className="mb-2 text-[22px] font-bold leading-modal-heading text-black">{name}</h3>
            <h4 className="mb-8 text-sm font-medium leading-heading tracking-[2px] text-black">{title}</h4>
            <p className="text-lg leading-primary-lg text-black max-h-[270px] overflow-y-scroll">{description}</p>
          </aside>
        </article>
      </div>
    </PopUpOverlayWrapper>
  );
};

export default ModalProfileCard;
