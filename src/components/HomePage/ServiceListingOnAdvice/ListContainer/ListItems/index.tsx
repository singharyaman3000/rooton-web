import React from 'react';

const ListItems = ({ item }: { item: string }) => {
  return <li className="text-base font-medium leading-[2.3]">{item}</li>;
};

export default ListItems;
