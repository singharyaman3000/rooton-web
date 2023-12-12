'use client';

import RTONBanner from '../RTONBanner';
import { IPrivatePolicyPageContent } from '@/app/services/apiService/privatePolicyAPI';
import { appendAssetUrl } from '@/utils';

type PrivatePolicyPageProps = {
  response: IPrivatePolicyPageContent;
};

const PrivatePolicy = ({ response }: PrivatePolicyPageProps) => {
  const BREAD_BRUMB_PATHS = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: response?.data?.attributes?.title ?? '',
      path: '',
    },
  ];

  return (
    <>
      <RTONBanner
        breadCrumbData={BREAD_BRUMB_PATHS}
        heroText={response?.data?.attributes?.title ?? ''}
        description={response?.data?.attributes?.sub_title ?? ''}
        backgroundImageUrl={appendAssetUrl(response?.data?.attributes?.media_url?.data?.[0]?.attributes?.url)}
        heightStyle="h-[640px] lg:h-[360px]"
        subDescription={''}
        fontSizes={{ description: 'text-[15px] lg:text-xl' }}
      />
      <div className="m-auto max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-2k">
        <div id="policy-section-wrapper" className="mb-12 lg:mb-0 lg:py-20 px-4 lg:px-20">
          {response?.data?.attributes.json_content.Policy.map((policySection, index) => {
            // Skipping the first section title
            if (response?.data?.attributes.json_content.Policy[index].position === 1) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="mb-10">
                  <p className="mt-4 text-base text-justify">{policySection.description}</p>
                </div>
              );
            }
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="mb-10">
                <h2 className="text-2xl font-bold">{policySection.title}</h2>
                <p className="mt-4 text-base text-justify">{policySection.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PrivatePolicy;
