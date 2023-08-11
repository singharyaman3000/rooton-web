import React from 'react';
import ListItems from './ListItems';
import { ISubServices } from '../../ServicesListing/interafces';

const ListContainer = ({ services }: { services: ISubServices }) => {
  return <ul className="text-base font-medium">{services?.data?.map((service) => <ListItems key={service?.id} item={service?.attributes?.title} />)}</ul>;
};

export default ListContainer;
