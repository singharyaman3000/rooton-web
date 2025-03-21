import React from 'react';
import { IPageMeta } from '@/app/services/apiService/interfaces';

type MobilePaginationPropsType = {
  dotsToDisplay: number[];
  pageNum: number;
  pageMeta?: IPageMeta;
  className: string;
  singleRowDots?: boolean;
};

const MobilePagination: React.FC<MobilePaginationPropsType> = ({
  dotsToDisplay,
  pageNum,
  pageMeta,
  className,
  singleRowDots = false,
}) => {
  const totalArticleCount = pageMeta?.pagination?.total ?? 0;

  const getStyles = (index: number, number: number, emptyReturn = false) => {
    if (emptyReturn) return {};
    const obj = {};
    const smallDotStyle = { height: '3px', width: '3px', opacity: pageNum === number ? '1' : '0.4' };
    switch (index) {
    case 0: {
      if (number !== 0) Object.assign(obj, smallDotStyle);
      break;
    }
    case 7: {
      if (number !== totalArticleCount - 1) Object.assign(obj, smallDotStyle);
      break;
    }
    default:
      Object.assign(obj, {});
      break;
    }
    return obj;
  };

  return (
    <div className={`md:hidden flex items-end py-4 gap-4 align-center justify-center mobile-pagination ${className}`}>
      {dotsToDisplay?.map((number, index) => {
        return (
          <span
            className={`h-1 w-1 inline-block ${pageNum === number ? 'bg-font-color-orange' : 'bg-toggle-dark-bg'}`}
            style={{
              ...getStyles(index, number, singleRowDots),
            }}
            key={number}
          ></span>
        );
      })}
    </div>
  );
};

export default MobilePagination;
