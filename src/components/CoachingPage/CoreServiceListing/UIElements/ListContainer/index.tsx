import React from 'react';
import ListItems from './ListItems';
import { ICoachingServices } from '@/components/CoachingPage/ServicesListing/interafces';

const ListContainer = ({ title }: { title: ICoachingServices }) => {
  return <ul className="text-base text-black font-medium">{title?.data?.map((service) => <ListItems id={service?.id} key={service?.id} item={service?.attributes?.title} />)}</ul>;
};

export default ListContainer;
