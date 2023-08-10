import React from 'react';
import ListHeading from '../ListHeading';
import ListContainer from '../ListContainer';
import { IServiceData } from '../../ServicesListing/interafces';

const ListWrapper = ({ services }: { services: IServiceData[] }) => {
  return (
    <div>
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
