import NextImage from '@/components/UIElements/NextImage';
import Description from '@/components/UIElements/Description';

interface WelcomeSectionProps {
  imageUrl: string;
  companyDescription: string;
  companyMission: string;
  clientsCountText: string;
  experienceYearsText: string;
}

const WelcomeSection = ({
  imageUrl,
  companyDescription,
  companyMission,
  clientsCountText,
  experienceYearsText,
}: WelcomeSectionProps) => {

  return (
    <section className="px-[24px] md:px-[48px] lg:px-[80px] m-auto max-w-screen-2k py-10 md:py-[80px]">
      <div className="flex justify-between">
        <div className="hidden justify-end md:flex md:w-[42%]">
          <NextImage
            src={imageUrl}
            altText={'Welcome to Root On'}
            fill
            sizes=""
            style={{ objectFit: 'contain' }}
            title={'Welcome to Root On'}
            classSelector="!static !h-auto self-end !max-w-[540px] !max-h-[496px]"
          />
        </div>
        <div className="w-[100%] md:w-[52%]">
          <Description cssClass="!text-black" description={companyDescription} />

          <Description cssClass="!text-black" description={companyMission} />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
