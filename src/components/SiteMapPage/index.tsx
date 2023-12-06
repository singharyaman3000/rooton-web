'use client';

import React from 'react';
import Link from 'next/link';
import HtmlParser from 'react-html-parser';
import { useParams } from 'next/navigation';

import { BOOK_AN_APPOINTMENT_QUERY } from '@/constants/navigation';
import { COACHING_SERVICES_ROUTES, SITE_ROUTES } from './constants';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';

type ServiceDataType = { serviceId: number; label: string; uniqueIdentifierName: string };

type CoreServicesType = { subService: ServiceDataType[] } & ServiceDataType;

const SiteMap = () => {
  const params = useParams();
  const { headerFooterData } = useHeaderFooterContext();

  const allServices: CoreServicesType[] = [];

  headerFooterData![0]?.attributes.core_services.data?.forEach((service) => {
    const serviceObj = {} as CoreServicesType;
    const serviceData = {
      serviceId: service.id,
      label: service.attributes.title,
    };
    Object.assign(serviceObj, serviceData);
    const subServices = service?.attributes?.sub_services?.data ?? [];
    if (subServices.length > 0) {
      const subServicesList: ServiceDataType[] = [];
      subServices.forEach((subService) => {
        subServicesList.push({
          label: subService.attributes.title,
          serviceId: subService.id,
          uniqueIdentifierName: subService.attributes.unique_identifier_name || '',
        });
      });
      const subServiceData = {
        subService: subServicesList,
      };
      Object.assign(serviceObj, subServiceData);
    }
    allServices.push(serviceObj);
  });

  return (
    <div className="w-full flex items-center justify-center">
      <div className="mt-20 lg:px-0 pt-4 pb-20 max-w-[360px] lg:max-w-screen-2k flex flex-col gap-5 lg:grid lg:grid-cols-2">
        {/* Services */}
        <div className="p-5 border w-max">
          <h2 className="text-lg font-bold">Services</h2>
          <ul className="text-xs">
            {allServices.map((service) => {
              return (
                <li
                  key={service.serviceId}
                  className="font-bold pt-2 before:inline-block before:w-2 before:h-2 before:mx-2 before:bg-black before:rounded-full"
                >
                  {service.label}
                  {service?.subService?.length > 0 && (
                    <ul className="text-[#337ab7]">
                      {service?.subService.map((data) => {
                        return (
                          <React.Fragment key={data.serviceId}>
                            <li className="font-normal max-w-[250px] py-2 lg:max-w-max before:inline-block before:w-2 before:h-2 before:ml-4 before:mr-2 before:border before:border-black">
                              <Link
                                href={
                                  params.lang
                                    ? `/${params.lang}/${data.uniqueIdentifierName}`
                                    : `/${data.uniqueIdentifierName}`
                                }
                                className="hover:underline whitespace-pre-wrap"
                              >
                                {HtmlParser(data.label)}
                              </Link>
                            </li>
                            <Link
                              href={
                                params.lang
                                  ? `/${params.lang}/${data.uniqueIdentifierName}?${BOOK_AN_APPOINTMENT_QUERY}=true`
                                  : `/${data.uniqueIdentifierName}?${BOOK_AN_APPOINTMENT_QUERY}=true`
                              }
                              className="font-normal before:inline-block before:w-2 before:h-2 before:ml-8 before:mr-2 before:border before:border-black before:rounded-full hover:underline"
                            >
                              Book an appointment
                            </Link>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {/* Base Routes */}
          <div className="p-5 border w-full h-max">
            <h2 className="text-lg font-bold">Routes</h2>
            <ul className="flex flex-col text-xs">
              {SITE_ROUTES.map((data) => {
                return (
                  <li
                    key={data.id}
                    className="before:inline-block py-1 before:w-2 before:h-2 before:mx-2 before:bg-black before:rounded-full"
                  >
                    <Link href={data.path} className="text-[#337ab7] hover:underline">
                      {data.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Coaching Services */}
          <div className="p-5 border w-full h-max mt-5">
            <h2 className="text-lg font-bold">Coaching Services</h2>
            <ul className="text-xs">
              {COACHING_SERVICES_ROUTES?.map((data) => {
                return (
                  <li
                    key={data.id}
                    className="before:inline-block py-1 before:w-2 before:h-2 before:mx-2 before:bg-black before:rounded-full"
                  >
                    <Link href={`/coaching/${data.id}`} className="text-[#337ab7] hover:underline">
                      {data.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
