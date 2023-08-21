import React from 'react';
import ListItems from './ListItems';
import { ISubServices } from '@/components/HomePage/ServicesListing/interafces';

const ListContainer = ({ services }: { services: ISubServices }) => {
  return <ul className="text-base text-black font-medium">{services?.data?.map((service) => <ListItems key={service?.id} item={service?.attributes?.title} />)}</ul>;
};

export default ListContainer;
