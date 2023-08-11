import React from 'react';

const ListItems = ({ item }: { item: string }) => {
  return <li className="text-base hover:text-font-color-light-gray cursor-pointer font-medium leading-[2.3]">{item.replaceAll('**','')}</li>;
};

export default ListItems;
