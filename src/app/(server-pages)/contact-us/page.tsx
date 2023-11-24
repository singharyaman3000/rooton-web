import { ContactUsResponseData, getContactUsContents } from '@/app/services/apiService/contactUsPageAPI';
import { IHeaderFooterData, getHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import ContactUs from '@/components/ContactUsPage';
import { WithContext, Organization, LocalBusiness } from 'schema-dts';
import StructuredData from '@/components/UIElements/StructuredData';
import { appendAssetUrl } from '@/utils';

export default async function ContactUsPage() {
  const res = await getContactUsContents();
  const footerRes = await getHeaderFooterData();

  const footerData = footerRes?.length > 0 ? footerRes[0] : ({} as IHeaderFooterData);

  const organizationData = footerData?.attributes?.json_content?.organizationDetails;

  const organizationStructuredData: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
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
    sameAs: footerData?.attributes?.json_content?.socialMediaIcons.map((data) => {
      const [meta] = Object.values(data);
      return meta?.url ?? '';
    }),
    founder: {
      '@type': 'Person',
      name: organizationData?.founderDetails?.name ?? '',
      gender: organizationData?.founderDetails?.gender ?? '',
      url: organizationData?.founderDetails?.profileUrl ?? '',
    },
  };

  const keysToOmit = ['sameAs'];

  const localBusinessStructuredData: WithContext<LocalBusiness> = {
    ...organizationStructuredData,
    '@type': 'LocalBusiness',
    geo: footerData?.attributes?.addresses?.data?.map((address) => {
      return {
        '@type': 'GeoCoordinates',
        latitude: address?.attributes?.latitude ?? '',
        longitude: address?.attributes?.longitude ?? '',
        name: address?.attributes?.name ?? '',
      };
    }),
  };

  keysToOmit.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete localBusinessStructuredData[key];
  });

  return (
    <>
      <StructuredData<Organization> data={organizationStructuredData} />
      <StructuredData<LocalBusiness> data={localBusinessStructuredData} />
      <ContactUs contents={res?.data?.length ? res.data[0] : ({} as ContactUsResponseData)} />
    </>
  );
}
