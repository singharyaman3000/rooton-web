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
import { useRef } from 'react';

const ContactUs = ({ contents }: { contents: ContactUsResponseData }) => {
  const { headerFooterData } = useHeaderFooterContext();
  const sectionRef = useRef<HTMLElement>(null);

  const handleCTAButton = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  };

  return (
    <>
      <RTONBanner
        breadCrumbData={BREAD_BRUMB_PATHS}
        heroText={contents?.attributes?.title ?? ''}
        description={contents?.attributes?.title_description ?? ''}
        backgroundImageUrl={appendAssetUrl(contents?.attributes?.media_url?.data?.attributes?.url)}
        addGradient
        heightStyle="h-[640px] lg:h-[500px]"
        subDescription={contents?.attributes?.sub_title ?? ''}
        button={<BookAnAppointmentButton text={contents?.attributes?.CTA_text ?? ''} onClick={handleCTAButton} />}
      />
      <div className="w-full flex flex-col items-center">
        <div
          id="contact-us-section-wrapper"
          className="mb-[60px] lg:mb-[0] lg:p-20 max-w-screen-2k flex flex-col gap-20"
        >
          <SocialSection
            sectionRef={sectionRef}
            formData={contents?.attributes?.contact_us_contents}
            socialMeta={headerFooterData?.length ? headerFooterData[0]?.attributes?.json_content?.socialMediaIcons : []}
          />
          <MapSection footerData={headerFooterData?.length ? headerFooterData[0] : ({} as IHeaderFooterData)} />
          <BookAnAppointment onClick={handleCTAButton} />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
