import StatShowcaseCard from './StatShowcaseCard';
import NextImage from '@/components/UIElements/NextImage';
import Description from '@/components/UIElements/Description';

interface StatDataFormat {
  statValue: number;
  statText: string;
}

interface WelcomeSectionProps {
  imageUrl: string;
  companyDescription: string;
  companyMission: string;
  companyStatList: StatDataFormat[];
}

const WelcomeSection = ({ imageUrl, companyDescription, companyMission, companyStatList }: WelcomeSectionProps) => {
  return (
    <section className="px-[24px] md:px-[48px] lg:px-[80px] m-auto max-w-screen-2k my-10 md:my-20">
      <div className="flex justify-between">
        <div className="hidden justify-start lg:flex lg:w-[25%]">
          <NextImage
            src={imageUrl}
            altText={'Welcome to Root On'}
            fill
            sizes=""
            style={{ objectFit: 'contain' }}
            title={'Welcome to Root On'}
            classSelector="!static !h-auto self-end !max-w-[320px] !max-h-[415px]"
          />
        </div>
        <div className="w-[100%] lg:w-[69%]">
          <Description cssClass="!text-black mb-8 md:mb-5" description={companyDescription} />
          {companyStatList ? (
            <ul className="flex flex-col flex-wrap gap-5 md:gap-0 md:flex-row md:justify-between">
              {companyStatList.map(({ statValue, statText }) => {
                return (
                  <li className="w-full md:w-[45%] border-b border-b-smoky-steel" key={statText}>
                    <StatShowcaseCard statValue={statValue} statText={statText} />
                  </li>
                );
              })}
            </ul>
          ) : null}
          <Description cssClass="!text-black mt-8" description={companyMission} />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
