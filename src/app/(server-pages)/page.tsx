import { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { getHomePageContents } from '../services/apiService/homeAPI';
import { metaInfo } from '../constants/pageMetaInfo';
import { IHeaderFooterData, getHeaderFooterData } from '../services/apiService/headerFooterAPI';
import { Organization, WithContext } from 'schema-dts';
import { appendAssetUrl } from '@/utils';
import StructuredData from '@/components/UIElements/StructuredData';

export const metadata: Metadata = {
  title: metaInfo.home.title,
  description: metaInfo.home.description,
  alternates: { canonical: 'https://rooton.ca' },
  openGraph: {
    url: `${process.env.NEXT_APP_BASE_URL}`,
    title: metaInfo.home.title,
    images: `${process.env.NEXT_APP_BASE_URL}/images/og-image.png`,
    description: metaInfo.home.description,
    type: 'article',
  },
  twitter: {
    title: 'ROOT ON',
    description: 'Root On',
    card: 'summary_large_image',
  },
};

export default async function Home() {
  const apiRes = await getHomePageContents();
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

  return (
    apiRes?.length > 0 && (
      <>
        <StructuredData<Organization> data={organizationStructuredData} />
        <HomePage homePageConfig={apiRes[0]} />;
      </>
    )
  );
}
