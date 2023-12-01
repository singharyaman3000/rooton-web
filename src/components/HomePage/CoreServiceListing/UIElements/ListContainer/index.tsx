import React from 'react';

import ListItems from './ListItems';
import { ISubServices } from '@/components/HomePage/ServicesListing/interafces';

const ListContainer = ({ services }: { services: ISubServices }) => {
  return (
    <ul role="menu" className="text-base text-black font-medium">
      {services?.data?.map((service) => {
        return (
          <ListItems
            id={service?.attributes?.unique_identifier_name ?? ''}
            key={service?.id}
            item={service?.attributes?.title}
          />
        );
      })}
    </ul>
  );
};

export default ListContainer;
