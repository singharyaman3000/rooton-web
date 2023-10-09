import { IFaq } from '@/app/services/apiService/serviceAPI';
import { CoachingPageWrapper } from '../Wrapper';
import { SERVICES_TITLE } from '@/app/constants/textConstants';
import { H2 } from '@/components/H2';
import Accordion from '@/components/UIElements/Accordions';
import { useState } from 'react';
import ToggleIcon from '@/components/HomePage/ChallengesListing/ToggleIcon';
import { AccordionBody, AccordionHeader } from '@/components/HomePage/ChallengesListing/ChallengeListingElements';

type FAQSectionProps = {
  faqs?: IFaq[];
};

const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [selectedAccordionId, setSelectedAccordionId] = useState<string | null>(null);

  if ((faqs?.length ?? 0) > 0) {
    return <CoachingPageWrapper className="px-6 mt-20 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
      <>
        <H2 className=' mb-[49px]'>{SERVICES_TITLE.faq.title}</H2>
        {faqs?.map((faq) => {
          return (
            <Accordion
              openAccordion={faq.position.toString() === selectedAccordionId}
              accordionId={faq.position.toString()}
              handleOnClick={(id) => {
                setSelectedAccordionId(id === selectedAccordionId ? null : id);
              }}
              customToggle={<ToggleIcon isOpen={faq.position.toString() === selectedAccordionId} />}
              customSpacer={<span></span>}
              cssClass="challenges-accordion border-b-[1px] border-b-sandal "
              key={faq.position}
              header={<AccordionHeader value={faq.title} />}
              accordionBody={<AccordionBody containerWidth={'max-w-[100%]'} value={faq.description} />}
            />
          );
        })}
      </>
    </CoachingPageWrapper>;
  }

  return null;
};

export default FAQSection;
