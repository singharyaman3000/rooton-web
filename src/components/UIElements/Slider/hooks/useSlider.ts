'use client'
import { useState } from 'react';
export const CLICKED_ON_PAGE = 'CLICKED_ON_PAGE';
export const CLICKED_ON_LEFT = 'CLICKED_ON_LEFT';
export const CLICKED_ON_RIGHT = 'CLICKED_ON_RIGHT';

const useSliderPagination = ({
  slidesLength,
  initialPage,
}: {
  slidesLength: number;
  initialPage: number;
}) => {
  const [pageNum, setPageNum] = useState(initialPage);

  const updatePage = (clickedPageNum: number, type: string) => {
    switch (type) {
      case CLICKED_ON_LEFT:
        if (clickedPageNum !== initialPage) {
          setPageNum(clickedPageNum - 1);
        }
        break;
      case CLICKED_ON_RIGHT:
        if (clickedPageNum !== slidesLength - 1) {
          setPageNum(clickedPageNum + 1);
        }
        break;

      case CLICKED_ON_PAGE:
        setPageNum(clickedPageNum);
        break;

      default:
        break;
    }
  };

  const jumpToPage = (clickedPage: number) => {
    updatePage(clickedPage, CLICKED_ON_PAGE);
  };

  const incrementPage = () => {
    updatePage(pageNum, CLICKED_ON_RIGHT);
  };

  const decrementPage = () => {
    updatePage(pageNum, CLICKED_ON_LEFT);
  };

  return { jumpToPage, incrementPage, decrementPage, pageNum, setPageNum };
};

export default useSliderPagination;
