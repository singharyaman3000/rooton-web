import React from 'react';
import ListItems from './ListItems';

const ListContainer = ({ services }: { services: string[] }) => {
  return <ul className="text-base font-medium">{services?.map((service) => <ListItems item={service} />)}</ul>;
};

export default ListContainer;
