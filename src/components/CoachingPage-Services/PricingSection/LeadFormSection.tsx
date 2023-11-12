import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import { H2 } from '@/components/H2';
import { RefObject, useState } from 'react';
import LeadFormStepper from './LeadFormStepper';
import NextImage from '@/components/UIElements/NextImage';

type LeadFormSectionProps = {
  PricingleadForm: pricingPlansDetails;
  PricingleadFormRef: RefObject<HTMLDivElement>;
  onPricingCTAButtonClick: () => void;
  isBookAppointment: boolean;
};

const PricingLeadFormSection = ({
  PricingleadForm,
  PricingleadFormRef,
  onPricingCTAButtonClick,
  isBookAppointment,
}: LeadFormSectionProps) => {
  const [formStepperProgress, setFormStepperProgress] = useState(0);
  if (PricingleadForm) {
    return (
      <div
        ref={PricingleadFormRef}
        className="
          flex
          gap-[34px]
          shadow-hubspot-form-shadow
          border
          border-golden-yellow
          justify-between
          relative
          overflow-hidden
          bg-pale-sandal
        "
      >
        <div className=" absolute top-0 left-0 h-1 bg-golden-yellow" style={{ width: `${formStepperProgress}%` }} />
        <div className="p-4 lg:pl-[60px] w-full lg:w-[83%] py-12 lg:pb-16 lg:pr-0 sm:p-12">
          <H2>{'Evaluate yourself' ?? ''}</H2>
          <div className="" id="lead-form">
            <LeadFormStepper
              initScroll={onPricingCTAButtonClick}
              isBookAppointment={isBookAppointment}
              onProgress={(progress) => {
                setFormStepperProgress(progress);
              }}
              calenderLink={
                (PricingleadForm?.lead_forms &&
                  PricingleadForm?.lead_forms.find((f) => {
                    return f.type === 'meeting';
                  })?.url) ??
                ''
              }
              region={
                (PricingleadForm?.lead_forms &&
                  PricingleadForm?.lead_forms.find((f) => {
                    return f.type === 'form';
                  })?.region) ??
                ''
              }
              portalId={(PricingleadForm?.lead_forms && PricingleadForm?.lead_forms[0].portalId) ?? ''}
              formId={(PricingleadForm?.lead_forms && PricingleadForm?.lead_forms[0].formId) ?? ''}
              target="PricingLeadForm"
            />
          </div>
        </div>
        <div className=" hidden lg:block w-[25%] relative">
          <NextImage
            classSelector=" object-right"
            src={'/images/my-project-46@3x.png'}
            style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
            altText="a man"
            sizes="100vw"
            fill
            title=""
          />
        </div>
      </div>
    );
  }

  return null;
};

export default PricingLeadFormSection;
