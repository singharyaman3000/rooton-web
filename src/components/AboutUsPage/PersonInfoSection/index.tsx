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
    certificationImagesUrl?: { imageUrl: string; imageWidth?: string; imageHeight?: string; imageAlt?: string }[];
    licenseNumber?: string;
  };
}

const PersonInfoSection = ({ contentHeading, personInfo }: PersonInfoSectionProps) => {
  const { imageUrl, description, expertiseList, vision, certificationImagesUrl, licenseNumber } = personInfo;

  return (
    <section className="px-[24px] md:px-[48px] lg:px-[80px] m-auto max-w-screen-2k mt-20 mb-[58px]">
      <div className="flex justify-between">
        <div className="w-[100%] lg:w-[52%]">
          <div className="flex gap-2 flex-wrap items-end justify-between">
            <SubSectionTitle title={contentHeading} />
          </div>
          <Description cssClass="!text-primary-font-color my-5 md:mt-9" description={description} />
          <ul className="flex flex-col gap-3">
            {expertiseList.map((expertise) => {
              return (
                <Li key={expertise} className="text-sm md:text-lg text-primary-font-color">
                  {expertise}
                </Li>
              );
            })}
          </ul>
          <Description cssClass="!text-primary-font-color mt-5 mb-9" description={vision} />
          {certificationImagesUrl ? (
            <ImagesSeparatedByLine
              cssClass="flex flex-col items-center md:items-end md:flex-row"
              imagesData={certificationImagesUrl}
            />
          ) : null}
        </div>
        <div className="hidden justify-end lg:flex lg:w-[42%]">
          <NextImage
            src={imageUrl}
            altText={`${contentHeading}`}
            fill
            sizes=""
            style={{ objectFit: 'contain' }}
            title={`${contentHeading}`}
            classSelector="!static !h-auto self-end !max-w-[540px] !max-h-[496px]"
          />
        </div>
      </div>
      {licenseNumber ? (
        <p className="text-sm md:text-lg text-center md:text-left leading-[2.14] md:leading-primary-lg font-medium text-primary-font-color md:mt-6">
          CICC license number:{' '}
          <strong className="text-cicc-border font-bold">
            <a href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant" target="_blank">
              {licenseNumber}
            </a>
          </strong>
        </p>
      ) : null}
    </section>
  );
};

export default PersonInfoSection;
