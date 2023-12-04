import { ContactUsResponseData, getContactUsContents } from '@/app/services/apiService/contactUsPageAPI';
import { IHeaderFooterData, getHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import ContactUs from '@/components/ContactUsPage';
import { WithContext, LocalBusiness } from 'schema-dts';
import StructuredData from '@/components/UIElements/StructuredData';
import { appendAssetUrl } from '@/utils';
import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';

export const metadata: Metadata = {
  title: metaInfo.contactUs.title,
  description: metaInfo.contactUs.description,
  alternates: { canonical: 'https://rooton.ca/contact-us' },
  // to be removed in production
  robots: {
    index: false,
  },
};

export default async function ContactUsPage() {
  const res = await getContactUsContents();
  const footerRes = await getHeaderFooterData();

  const footerData = footerRes?.length > 0 ? footerRes[0] : ({} as IHeaderFooterData);

  const organizationData = footerData?.attributes?.json_content?.organizationDetails;

  const localBusinessStructuredData: WithContext<LocalBusiness> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Root On',
    url: process.env.NEXT_APP_BASE_URL,
    description: organizationData?.companyDescription ?? '',
    logo: appendAssetUrl(organizationData?.companyLogo),
    email: organizationData?.companyEmail ?? '',
    address: organizationData?.addresses?.map((data) => {
      return {
        '@type': 'PostalAddress',
        streetAddress: data?.address ?? '',
        postalCode: data?.postalCode ?? '',
        addressCountry: data?.country ?? '',
      };
    }),
    contactPoint: organizationData?.addresses?.map((data) => {
      return {
        '@type': 'ContactPoint',
        telephone: data?.phoneNumber ?? '',
        contactType: 'customer support',
      };
    }),
    founder: {
      '@type': 'Person',
      name: organizationData?.founderDetails?.name ?? '',
      gender: organizationData?.founderDetails?.gender ?? '',
      url: organizationData?.founderDetails?.profileUrl ?? '',
    },
    geo: footerData?.attributes?.addresses?.data?.map((address) => {
      return {
        '@type': 'GeoCoordinates',
        latitude: address?.attributes?.latitude ?? '',
        longitude: address?.attributes?.longitude ?? '',
        name: address?.attributes?.name ?? '',
      };
    }),
  };

  return (
    <>
      <StructuredData<LocalBusiness> data={localBusinessStructuredData} />
      <ContactUs contents={res?.data?.length ? res.data[0] : ({} as ContactUsResponseData)} />
    </>
  );
}
