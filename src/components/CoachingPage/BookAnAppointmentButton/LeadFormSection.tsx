import { DataEntity1, ILeadForm } from '@/app/services/apiService/CoachingAPI';
import { H2 } from '@/components/H2';
import { RefObject, useState } from 'react';
import LeadFormStepper from './LeadFormStepper';
import NextImage from '@/components/UIElements/NextImage';

type LeadFormSectionProps = {
  leadForm?: DataEntity1;
  leadFormRef: RefObject<HTMLDivElement>;
  handleCTAButtonClick: () => void;
  isBookAppointment: boolean;
};

const LeadFormSection = ({ leadForm, leadFormRef, handleCTAButtonClick, isBookAppointment }: LeadFormSectionProps) => {
  const [formStepperProgress, setFormStepperProgress] = useState(0);
  function isLeadForm(jsonContent: any): jsonContent is ILeadForm {
    return jsonContent.hasOwnProperty('lead_forms');
  }
  const jsonContent = leadForm?.attributes.json_content;
  const leadFormsAvailable = isLeadForm(jsonContent) ? jsonContent.lead_forms : undefined;

  if (leadForm) {
    return (
      <div
        ref={leadFormRef}
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
          <H2>{leadForm?.attributes.title ?? ''}</H2>
          <div className="" id="lead-form">
            <LeadFormStepper
              initScroll={handleCTAButtonClick}
              isBookAppointment={isBookAppointment}
              onProgress={(progress) => {
                setFormStepperProgress(progress);
              }}
              calenderLink={
                isLeadForm(leadForm?.attributes.json_content) ?
                leadForm.attributes.json_content.lead_forms?.find(f => f.type === 'meeting')?.url ?? ''
                : ''
              }
              region={
                isLeadForm(leadForm?.attributes.json_content) ?
                leadForm.attributes.json_content.lead_forms?.find(f => f.type === 'form')?.region ?? ''
                : ''
               
              }
              portalId={
                leadFormsAvailable?.find(f => f.type === 'form')?.portalId ?? ''
              }
              formId={
                leadFormsAvailable?.find(f => f.type === 'form')?.formId ?? ''
              }
              target="LeadForm"
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

export default LeadFormSection;
