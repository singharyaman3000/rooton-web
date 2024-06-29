'use client';

import { useEffect, useState } from 'react';
import RTONBanner from '../RTONBanner';
import { IPrivatePolicyPageContent, IJSONContent } from '@/app/services/apiService/privatePolicyAPI';
import { appendAssetUrl } from '@/utils';
import { TailSpin } from 'react-loader-spinner';

type PrivatePolicyPageProps = {
  response: IPrivatePolicyPageContent;
};

const Loader = () => {
  return (
    <div className="px-10">
      <TailSpin
        visible
        height="60"
        width="60"
        color="#E7BA42"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

const PrivatePolicy = ({ response }: PrivatePolicyPageProps) => {
  const [selectedContent, setSelectedContent] = useState<IJSONContent | null>(null);

  useEffect(() => {
    const currentDomain = window?.location?.hostname || '';
    if (currentDomain.includes('rooton.ca')) {
      setSelectedContent(response.data.attributes.json_content[0]);
    } else {
      setSelectedContent(response.data.attributes.json_content[1]);
    }
  }, [response]);

  if (!selectedContent) {
    return (
      <div className="h-screen">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">{ <Loader /> }</div>
      </div>
    );
  }

  const BREAD_CRUMB_PATHS = [
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
        breadCrumbData={BREAD_CRUMB_PATHS}
        heroText={response?.data?.attributes?.title ?? ''}
        description={response?.data?.attributes?.sub_title ?? ''}
        backgroundImageUrl={appendAssetUrl(response?.data?.attributes?.media_url?.data?.[0]?.attributes?.url)}
        heightStyle="h-[640px] lg:h-[360px]"
        subDescription={''}
        fontSizes={{ description: 'text-[15px] lg:text-xl' }}
      />
      <div className="m-auto max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-2k">
        <div id="policy-section-wrapper" className="mb-12 lg:mb-0 lg:py-20 px-4 lg:px-20">
          {selectedContent.Policy.map((policySection) => {
            return (
              <div key={policySection.position} className="mb-10">
                {policySection.position !== 1 && (
                  <h2 className="text-2xl font-bold">{policySection.title}</h2>
                )}
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
