import { getServicePageURL, getTranslatedURL } from '@/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import HtmlParser from 'react-html-parser';

const ListItems = ({ item, id }: { item: string; id: number }) => {
  const path = useParams();

  return (
    <Link
      key={id}
      href={getTranslatedURL(getServicePageURL(id), path.lang)}
      className="pop-up-list-item block text-base hover:text-font-color-light-gray cursor-pointer font-medium leading-[2.3]"
    >
      {HtmlParser(item.replaceAll('**', ''))}
    </Link>
  );
};

export default ListItems;
