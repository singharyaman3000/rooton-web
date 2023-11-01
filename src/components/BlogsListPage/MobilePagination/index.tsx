import React from 'react';
import { IPageMeta } from '@/app/services/apiService/interfaces';

type MobilePaginationPropsType = { dotsToDisplay: number[]; pageNum: number; pageMeta: IPageMeta };

const MobilePagination: React.FC<MobilePaginationPropsType> = ({ dotsToDisplay, pageNum, pageMeta }) => {
  const totalArticleCount = pageMeta?.pagination?.total;

  const getStyles = (index: number, number: number) => {
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
    <div className="md:hidden flex items-end py-4 gap-4 align-center justify-center bg-white-fixed">
      {dotsToDisplay?.map((number, index) => {
        return (
          <span
            className="h-1 w-1 inline-block"
            style={{
              backgroundColor: pageNum === number ? '#F59723' : '#000',
              ...getStyles(index, number),
            }}
            key={number}
          ></span>
        );
      })}
    </div>
  );
};

export default MobilePagination;
