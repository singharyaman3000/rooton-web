'use client';

import { ContactUsResponseData, getContactUsContents } from '@/app/services/apiService/contactUsPageAPI';
import ContactUs from '@/components/ContactUsPage';
import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';

const ContactUsPageCSR = () => {
  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getContactUsContents();
    },
  });
  const { loader } = useTranslationLoader();

  if (loader || loading) return <LoadingUI />;

  return (
    <div>
      {(loader || loading) && <LoadingUI />}
      {data && <ContactUs contents={data?.data?.length ? data.data[0] : ({} as ContactUsResponseData)} />}
    </div>
  );
};

export default ContactUsPageCSR;
