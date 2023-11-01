import { SERVICES_TITLE } from '@/app/constants/textConstants';
import RootOnCTAWrapper from '../RootOnCTAWrapper';
import { ServicePageWrapper } from '../Wrapper';
import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';

type CTAWrapperSectionProps = {
    handleCTAButtonClick: () => void;
}

const CTAWrapperSection = ({ handleCTAButtonClick }: CTAWrapperSectionProps) => {
  return (
    <ServicePageWrapper className=" mt-20 m-auto max-w-screen-2k px-6 lg:px-[80px]">
      <RootOnCTAWrapper
        buttonAriaLabel={SERVICES_TITLE.appointment1.title}
        buttonText={SERVICES_TITLE.appointment1.title}
        buttonIcon={<CalenderIconYellow />}
        onClick={handleCTAButtonClick}
        imageSrc={SERVICES_TITLE.appointment1.image}
        imageAlt={SERVICES_TITLE.appointment1.imageAlt}
        imageTitle={SERVICES_TITLE.appointment1.imageTitle}
        heading={
          <>
            {SERVICES_TITLE.appointment1.contentLine1} <br /> {SERVICES_TITLE.appointment1.contentLine2}
          </>
        }
      />
    </ServicePageWrapper>
  );
};

export default CTAWrapperSection;
