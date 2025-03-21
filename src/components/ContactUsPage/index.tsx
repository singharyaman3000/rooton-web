'use client';

import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import RTONBanner from '../RTONBanner';
import BookAnAppointmentButton from '../ServicePage/BookAnAppointmentButton';
import BookAnAppointment from '../UIElements/BookAnAppointment';
import MapSection from './MapSection';
import SocialSection from './SocialSection';
import { BREAD_BRUMB_PATHS } from './constants';
import { IHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import { ContactUsResponseData } from '@/app/services/apiService/contactUsPageAPI';
import { appendAssetUrl } from '@/utils';
import { useRef, useState } from 'react';
import { CONSULTATION_TYPES } from '../ServicePage/LeadFormStepper';
import { trackEvent } from '../../../gtag';

const ContactUs = ({ contents }: { contents: ContactUsResponseData }) => {
  const { headerFooterData } = useHeaderFooterContext();
  const sectionRef = useRef<HTMLElement>(null);

  const [ctaClickSource, setCtaClickSource] = useState('');

  const scrollToLeadForm = () => {
    const element = document.getElementById('contact-us-form-container');
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top - 90 + window.pageYOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleCTAButton = (source: string) => {
    setCtaClickSource(source);
    scrollToLeadForm();
  };

  return (
    <>
      <RTONBanner
        breadCrumbData={BREAD_BRUMB_PATHS}
        heroText={contents?.attributes?.title ?? ''}
        description={contents?.attributes?.title_description ?? ''}
        backgroundImageUrl={appendAssetUrl(contents?.attributes?.media_url?.data?.attributes?.url)}
        heightStyle="h-[640px] lg:h-[560px]"
        subDescription={contents?.attributes?.sub_title ?? ''}
        noGrid
        fontSizes={{ description: 'text-[15px] lg:text-xl' }}
        button={<BookAnAppointmentButton text={contents?.attributes?.CTA_text ?? ''}
          onClick={() => {
            trackEvent({
              action: `${contents?.attributes?.title} Banner CTA`,
              category: 'Contact Us Page',
              label: contents?.attributes?.CTA_text,
            });
            return handleCTAButton(CONSULTATION_TYPES.PAID);
          }} />}
      />
      <div className="w-full flex flex-col items-center">
        <div
          id="contact-us-section-wrapper"
          className="mb-[60px] lg:px-[80px] lg:mb-[0] lg:py-20 w-full max-w-screen-2k flex flex-col gap-20"
        >
          <SocialSection
            ctaClickSource={ctaClickSource}
            sectionRef={sectionRef} scrollToLeadForm={scrollToLeadForm}
            formData={contents?.attributes?.contact_us_contents}
            socialMeta={headerFooterData?.length ? headerFooterData[0]?.attributes?.json_content?.socialMediaIcons : []}
          />
          <MapSection footerData={headerFooterData?.length ? headerFooterData[0] : ({} as IHeaderFooterData)} />
          <BookAnAppointment onClick={() => {
            trackEvent({
              action: `${contents?.attributes?.title} CTA`,
              category: 'Contact Us Page',
              label: contents?.attributes?.CTA_text,
            });
            return handleCTAButton(CONSULTATION_TYPES.FREE);
          }} />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
