import React from 'react';
import HtmlParser from 'react-html-parser';

const ListItems = ({ item }: { item: string }) => {
  return <li className="pop-up-list-item text-base hover:text-font-color-light-gray cursor-pointer font-medium leading-[2.3]">{HtmlParser(item.replaceAll('**',''))}</li>;
};

export default ListItems;
