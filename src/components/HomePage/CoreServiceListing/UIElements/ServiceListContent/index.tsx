import { IServiceData } from '@/components/HomePage/ServicesListing/interafces';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import React from 'react';
import ListWrapper from '../../ServiceListingOnAdvice/ListWrapper';

const ServiceListContent = () => {
  const { headerFooterData } = useHeaderFooterContext();

  const getServiceListing = () => {
    const ServicesList = headerFooterData && headerFooterData[0]?.attributes?.core_services?.data;
    /* eslint-disable no-unsafe-optional-chaining */
    ServicesList?.sort((a,b)=> {return a?.id - b?.id;});
    const ServiceListright: IServiceData[] = [];
    const ServiceListLeft: IServiceData[] = [];
    ServicesList?.forEach((listItem, index: number) => {
      if (index % 2 === 0) ServiceListLeft.push(listItem);
      else ServiceListright.push(listItem);
    });
    return [[...ServiceListLeft], [...ServiceListright]].map((listItem, index) => {
      // eslint-disable-next-line react/no-array-index-key
      return <ListWrapper key={index + 1} services={listItem || []} />;
    });
  };
  return (
    <>
      <h1 className="mb-10 px-9 text-[22px] tracking-normal font-bold text-black ">
        Select a service for which you need advice on.
      </h1>
      <div className="flex w-[full] px-9 flex-row gap-[6vw] xl:gap-[5.5vw] 2k:gap-[4.6vw] overflow-y-scroll overscroll-contain
        h-[82%]">{getServiceListing()}</div>
    </>
  );
};

export default ServiceListContent;
