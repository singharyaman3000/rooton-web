import React from 'react';
import ListHeading from '../../UIElements/ListHeading';
import ListContainer from '../../UIElements/ListContainer';
import { IServiceData } from '@/components/CoachingPage/ServicesListing/interafces';

const ListWrapper = ({ services }: { services: IServiceData[] }) => {
  return (
    <div className='w-fit'>
      {services?.map((item: IServiceData) => {
        return (
          <div className="mb-7" key={item?.id}>
            <ListHeading serviceTitle={item?.attributes?.title} />
            <ListContainer title={item?.attributes?.title} />
          </div>
        );
      })}
    </div>
  );
};

export default ListWrapper;
