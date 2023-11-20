import Link from 'next/link';
import React, { useContext } from 'react';
import HtmlParser from 'react-html-parser';
import { useParams } from 'next/navigation';

import { getServicePageURL } from '@/utils';
import { BOOK_AN_APPOINTMENT } from '@/constants/navigation';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';

const ListItems = ({ item, id }: { item: string; id: number }) => {
  const path = useParams();
  const { isModalShown, closeCoreServiceList } = useContext(ModalShowContextname);

  const handleServicesDisplay = () => {
    if (isModalShown) closeCoreServiceList();
  };

  return (
    <li
      key={id}
      role='menuitem'
      onClick={() => {
        handleServicesDisplay();
      }}
      className="
        pop-up-list-item block text-base hover:text-font-color-light-gray cursor-pointer font-medium leading-[2.3]
        "
    >
      <Link
        href={
          path.lang
            ? `/${path.lang}${getServicePageURL(id)}${BOOK_AN_APPOINTMENT}`
            : `${getServicePageURL(id)}${BOOK_AN_APPOINTMENT}`
        }
        className='block'
      >
        {HtmlParser(item.replaceAll('**', ''))}
      </Link>
    </li>
  );
};

export default ListItems;
