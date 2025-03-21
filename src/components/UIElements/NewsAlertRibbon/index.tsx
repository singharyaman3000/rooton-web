'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Button from '../Button';
import { BLOG_LISTING_PATH } from '@/constants/navigation';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import CloseIconWithBackground from '@/components/Icons/CloseIconWithBackground';

interface NewsAlertRibbonProps {
  displayRibbonHandler: Dispatch<SetStateAction<boolean>>;
}

type News = {
  id: number;
  title: string;
  category: string;
};

const NewsAlertRibbon = ({ displayRibbonHandler }: NewsAlertRibbonProps) => {
  const { lang } = useParams();
  const { newsAlertData } = useHeaderFooterContext();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [newsList, setNewsList] = useState<News[] | null>(null);

  useEffect(() => {
    if (newsAlertData && newsAlertData.data && Array.isArray(newsAlertData.data)) {
      const newsData = newsAlertData.data.reduce((acc, item) => {
        const {
          id,
          attributes: { title, category },
        } = item;
        if (typeof id === 'number' && typeof title === 'string' && typeof category === 'string') {
          acc.push({ id, title, category });
        }
        return acc;
      }, [] as News[]);

      if (newsData.length < 1) {
        displayRibbonHandler(false);
      } else {
        setNewsList(newsData);
      }
    } else {
      displayRibbonHandler(false);
    }
  }, [newsAlertData, displayRibbonHandler]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => {
        return (prevIndex + 1) % (newsList?.length || 1);
      });
    }, 5000);
    return () => {
      return clearInterval(interval);
    };
  }, [newsList]);

  return newsList ? (
    <section className="flex justify-between items-center bg-platinum py-3.5 px-6 md:px-10 xl:px-20">
      {newsList.map((news, index) => {
        return (
          <div
            key={news.id}
            className={`flex gap-3.5 items-center w-[88%] md:w-[90%] ${
              index === currentNewsIndex ? 'block' : 'hidden'
            }`}
          >
            <strong
              title={news.title}
              className="text-base font-normal text-black xl:pl-[18px] max-w-[60%] sm:max-w-[74%] md:max-w-[77%] lg:max-w-[85%] truncate"
            >
              {news.title}
            </strong>
            <Link
              href={
                lang
                  ? `/${lang}${BLOG_LISTING_PATH}/${news.id}/${news.category}`
                  : `${BLOG_LISTING_PATH}/${news.id}/${news.category}`
              }
            >
              <Button
                cssClass="border-0 !p-0 border-b-2 !font-medium !border-black text-black truncate"
                label="Read more"
                tabIndex={-1}
                handleOnClick={() => {
                  return null;
                }}
                ariaLabel="Read more"
              />
            </Link>
          </div>
        );
      })}
      <button
        aria-label="close-button"
        type="button"
        title="Close Alert"
        onClick={() => {
          displayRibbonHandler(false);
        }}
      >
        <CloseIconWithBackground cssClas="w-6 h-6" />
      </button>
    </section>
  ) : null;
};

export default NewsAlertRibbon;
