import { ContactUsResponseData, getContactUsContents } from '@/app/services/apiService/contactUsPageAPI';
import { IHeaderFooterData, getHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import ContactUs from '@/components/ContactUsPage';
import { WithContext, Organization } from 'schema-dts';
import StructuredData from '@/components/UIElements/StructuredData';
import { appendAssetUrl } from '@/utils';

export default async function ContactUsPage() {
  const res = await getContactUsContents();
  const footerRes = await getHeaderFooterData();

  const footerData = footerRes?.length > 0 ? footerRes[0] : ({} as IHeaderFooterData);

  const organizationData = footerData?.attributes?.json_content?.organizationDetails;

  const structuredData: WithContext<Organization> = {
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

  return (
    <>
      <StructuredData<Organization> data={structuredData} />
      <ContactUs contents={res?.data?.length ? res.data[0] : ({} as ContactUsResponseData)} />;
    </>
  );
}
