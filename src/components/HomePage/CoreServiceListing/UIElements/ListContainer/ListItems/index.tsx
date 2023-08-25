import { BOOK_AN_APPOINTMENT } from '@/constants/navigation';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';
import { getServicePageURL, getTranslatedURL } from '@/utils';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import HtmlParser from 'react-html-parser';

const ListItems = ({ item, id }: { item: string; id: number }) => {
  const path = useParams();
  const router = useRouter();

  const { isModalShown, closeCoreServiceList, isFormFocusRouting } = useContext(ModalShowContextname);

  const handleRouteRedirect = () => {
    const route = getTranslatedURL(getServicePageURL(id), path.lang);
    if (isFormFocusRouting) {
      router.push(route + BOOK_AN_APPOINTMENT);
    } else {
      router.push(route);
    }
    if (isModalShown) closeCoreServiceList();
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <li
        key={id}
        onClick={() => {
          handleRouteRedirect();
        }}
        className="pop-up-list-item block text-base hover:text-font-color-light-gray cursor-pointer font-medium leading-[2.3]"
      >
        {HtmlParser(item.replaceAll('**', ''))}
      </li>
    </>
  );
};

export default ListItems;
