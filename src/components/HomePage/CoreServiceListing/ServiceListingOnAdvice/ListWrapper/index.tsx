import React from 'react';
import ListHeading from '../../UIElements/ListHeading';
import ListContainer from '../../UIElements/ListContainer';
import { IServiceData } from '@/components/HomePage/ServicesListing/interafces';

const ListWrapper = ({ services }: { services: IServiceData[] }) => {
  return (
    <div className='w-[50%]'>
      {services?.map((item: IServiceData) => {
        return (
          <div className="mb-7" key={item?.id}>
            <ListHeading serviceTitle={item?.attributes?.title} />
            <ListContainer services={item?.attributes?.sub_services} />
          </div>
        );
      })}
    </div>
  );
};

export default ListWrapper;
