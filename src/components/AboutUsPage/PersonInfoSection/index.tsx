import NextImage from '@/components/UIElements/NextImage';
import ImagesSeparatedByLine from './ImagesSeparatedByLine';
import Description from '@/components/UIElements/Description';
import AboutUsSubHeader from '../AboutUsSubHeader';

interface PersonInfoSectionProps {
  contentHeading: string;
  personInfo: {
    imageUrl: string;
    description: string;
    certificationImagesUrl?: { imageUrl: string; imageWidth?: string; imageHeight?: string; imageAlt?: string }[];
    licenseNumber?: string;
  };
}

const PersonInfoSection = ({ contentHeading, personInfo }: PersonInfoSectionProps) => {
  const { imageUrl, description, certificationImagesUrl, licenseNumber } = personInfo;

  return (
    <section className="px-[24px] md:px-[48px] lg:px-[80px] m-auto max-w-screen-2k mt-5 mb-[58px]">
      <div className="flex justify-between">
        <div className="w-[100%] lg:w-[52%]">
          <div className="flex gap-2 flex-wrap items-end justify-between">
            <AboutUsSubHeader title={contentHeading} />
          </div>
          <Description cssClass="!text-primary-font-color my-5 md:mt-9" description={description} />
          {certificationImagesUrl ? (
            <ImagesSeparatedByLine
              cssClass="flex flex-col items-center md:items-end md:flex-row"
              imagesData={certificationImagesUrl}
            />
          ) : null}
        </div>
        <div className="ceo-image-bg hidden justify-end lg:flex lg:w-[42%]">
          <NextImage
            src={imageUrl}
            altText={`${contentHeading}`}
            fill
            sizes=""
            style={{ objectFit: 'contain' }}
            title={`${contentHeading}`}
            classSelector="!static !h-auto self-end !max-w-[332px] !max-h-[1000px]"
          />
        </div>
      </div>
      {licenseNumber ? (
        <div className='w-[100%] lg:w-[52%]'>&nbsp;&nbsp;<p className='!text-primary-font-color font-medium text-sm md:text-lg'>Verify the authenticity of the License by simply entering the License number <span className="text-cicc-border font-bold"> {licenseNumber} </span>here: <a href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant" target="_blank"><span className="text-blue-600 underline">Verify my RCIC{' '}</span></a> </p></div>
      ) : null}
    </section>
  );
};

export default PersonInfoSection;
