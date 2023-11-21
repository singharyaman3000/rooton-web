import { ContactUsResponseData, getContactUsContents } from '@/app/services/apiService/contactUsPageAPI';
import { IHeaderFooterData, getHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import ContactUs from '@/components/ContactUsPage';
import { WithContext, Organization } from 'schema-dts';
import StructuredData from '@/components/UIElements/StructuredData';

export default async function ContactUsPage() {
  const res = await getContactUsContents();
  const footerRes = await getHeaderFooterData();

  const footerData = footerRes?.length > 0 ? footerRes[0] : ({} as IHeaderFooterData);

  const structuredData: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Root On',
    url: process.env.NEXT_APP_BASE_URL,
    logo: 'https://www.example.com/images/logo.png',
    address: footerData?.attributes?.addresses?.data?.map((data) => {
      return { '@type': 'PostalAddress', streetAddress: data.attributes.location };
    }),
    email: 'rooton(at)test.com',
    contactPoint: footerData?.attributes?.addresses?.data?.map((data) => {
      return {
        '@type': 'ContactPoint',
        telephone: data.attributes.phone_number,
        contactType: 'customer support',
      };
    }),
    sameAs: footerData?.attributes?.json_content?.socialMediaIcons.map((data) => {
      const [meta] = Object.values(data);
      return meta?.url ?? '';
    }),
  };

  return (
    <>
      <StructuredData<Organization> data={structuredData} />
      <ContactUs contents={res?.data?.length ? res.data[0] : ({} as ContactUsResponseData)} />;
    </>
  );
}
