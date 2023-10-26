import { Li } from '@/components/Li';
import NextImage from '@/components/UIElements/NextImage';
import ImagesSeparatedByLine from './ImagesSeparatedByLine';
import Description from '@/components/UIElements/Description';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';

interface PersonInfoSectionProps {
  contentHeading: string;
  personInfo: {
    imageUrl: string;
    description: string;
    expertiseList: string[];
    vision: string;
    certificationImagesUrl?: string[];
    licenseNumber?: string;
  };
}

const PersonInfoSection = ({ contentHeading, personInfo }: PersonInfoSectionProps) => {
  const { imageUrl, description, expertiseList, vision, certificationImagesUrl, licenseNumber } = personInfo;
  return (
    <section className="px-[24px] md:px-[48px] lg:px-[80px] m-auto max-w-screen-2k py-10 md:py-[80px]">
      <div className="flex justify-between">
        <div className="w-[100%] md:w-[52%]">
          <div className="flex gap-2 flex-wrap items-end justify-between md:pr-[48px] lg:pr-[80px]">
            <div className="md:max-w-[70%] lg:max-w-none">
              <SubSectionTitle title={contentHeading} />
            </div>
          </div>
          <Description cssClass="!text-black" description={description} />
          <ul>
            {expertiseList.map((expertise) => {
              return (
                <Li key={expertise} className="text-black">
                  {expertise}
                </Li>
              );
            })}
          </ul>
          <Description cssClass="!text-black" description={vision} />
          {certificationImagesUrl ? (
            <ImagesSeparatedByLine
              cssClass="flex flex-col items-center md:items-start md:flex-row"
              imagesUrl={certificationImagesUrl}
            />
          ) : null}
        </div>
        <div className="hidden relative md:block md:w-[42%]">
          <NextImage
            src={imageUrl}
            altText={`Image of ${contentHeading}`}
            fill
            sizes="100vw"
            style={{ objectFit: 'contain' }}
            title={`Image of ${contentHeading}`}
            classSelector="!bottom-0 !h-auto"
          />
        </div>
      </div>
      {licenseNumber ? (
        <p className="text-lg text-center md:text-left leading-primary-lg font-medium text-black">
          CICC license number: <strong className="text-cicc-border font-bold">{licenseNumber}</strong>
        </p>
      ) : null}
    </section>
  );
};

export default PersonInfoSection;
