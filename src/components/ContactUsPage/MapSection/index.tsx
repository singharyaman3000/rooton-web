'use client';

import React, { useState } from 'react';
import { IAddressData, IHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import GoogleMapReact from 'google-map-react';

// eslint-disable-next-line no-unused-vars
const MapMarker = (props: { [key: string]: number }) => {
  return (
    <div className="relative h-[34px] w-[34px]">
      <NextImage
        sizes="100vw"
        priority
        src={'/marker.png'}
        fill
        style={{ objectFit: 'contain' }}
        altText="country_flag"
        title="Flag Image"
      />
    </div>
  );
};

type MapSectionPropType = {
  footerData: IHeaderFooterData;
};

const MapSection: React.FC<MapSectionPropType> = ({ footerData }) => {
  const addressData = footerData?.attributes?.addresses?.data ?? [];
  // eslint-disable-next-line no-unused-vars
  const [selectedAddress, setAddress] = useState<IAddressData>(addressData[0]);
  const locationData = {
    center: { lat: selectedAddress?.attributes?.latitude, lng: selectedAddress?.attributes?.longitude },
    zoom: 10,
  };

  const coordinates = addressData?.map(({ id, attributes }) => {
    return { id, lat: attributes.latitude, lng: attributes.longitude };
  });

  return (
    <section className="flex flex-col lg:flex-row">
      {/* Map component */}
      <div className="h-[360px] lg:h-[794px] w-full lg:!w-1/2">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_GOOGLE_MAP_KEY ?? '' }}
          defaultZoom={locationData.zoom}
          center={locationData.center}
        >
          {coordinates?.map((data) => {
            return <MapMarker key={data?.id} lat={data?.lat} lng={data?.lng} />;
          })}
        </GoogleMapReact>
      </div>
      {/* Address section */}
      <div className="bg-pale-yellow blog-bg flex flex-col items-center p-6 lg:px-10 lg:py-8 w-full lg:w-1/2">
        <h2 className="self-start text-[28px] lg:text-[40px] font-bold mb-7 lg:mb-5">Contact Information</h2>
        <div className="flex contact-us-address flex-col gap-5 w-full items-center lg:items-start">
          {addressData.map((address) => {
            const { id, attributes } = address;
            return (
              <div
                key={id}
                role="button"
                tabIndex={0}
                className="p-5 mapAddressBorder lg:pl-10 xs:max-w-[320px] w-full md:lg:max-w-full text-sm lg:text-base"
                onClick={() => {
                  setAddress(address);
                }}
                style={{ backgroundColor: selectedAddress.id === id ? 'var(--background-color-mapAddress)' : '' }}
              >
                <div className="flex gap-3 items-center mb-[14px]">
                  <div className="relative h-[24px] w-[24px] lg:h-[32px] lg:w-[32px]">
                    <NextImage
                      sizes="100vw"
                      priority
                      src={appendAssetUrl(attributes?.media_url.data?.attributes?.url ?? '')}
                      fill
                      style={{ objectFit: 'contain' }}
                      altText="country_flag"
                      title="Flag Image"
                    />
                  </div>
                  <h3 className="text-lg lg:text-2xl font-bold">{attributes?.name}</h3>
                </div>
                <div className="mb-3 max-w-[276px]">{attributes?.location}</div>
                <div className="font-bold mb-3">{`Phone ${attributes?.phone_number}`}</div>
                <div>
                  <span className="block font-bold mb-2 lg:mb-[11px]">Operating Hours</span>
                  {attributes?.operating_hours?.operatingHours?.map((data, index) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={index}>
                        <span>{`${data.day} : `}</span>
                        <span
                          style={{
                            fontWeight:
                              data?.workingHours?.includes('PM') || data?.workingHours?.includes('AM') ? 'bold' : '',
                          }}
                          className="whitespace-nowrap"
                        >
                          {data?.workingHours ?? ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
