'use client';

import { metaInfo } from '@/app/constants/pageMetaInfo';
import { ContactUsResponseData, getContactUsContents } from '@/app/services/apiService/contactUsPageAPI';
import ContactUs from '@/components/ContactUsPage';
import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const ContactUsPageCSR = () => {
  const params = useParams();
  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getContactUsContents();
    },
  });
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/contact-us`;
  useSetMetaInfo(metaInfo.contactUs.title, metaInfo.contactUs.description, canonicalUrl);

  if (loader || loading) return <LoadingUI />;

  return (
    <div>
      {(loader || loading) && <LoadingUI />}
      {data && <ContactUs contents={data?.data?.length ? data.data[0] : ({} as ContactUsResponseData)} />}
    </div>
  );
};

export default ContactUsPageCSR;
