'use client';

import { IBlogContentData } from '@/app/services/apiService/blogDetailAPI';
import React, { Dispatch, RefObject, SetStateAction, useEffect, useMemo, useState } from 'react';
import { SelectedTagType } from '..';

type NavigationPanelPropsType = {
  content: IBlogContentData[];
  selectedTag: SelectedTagType;
  setSelectedTag: Dispatch<SetStateAction<SelectedTagType>>;
};

const useSelectedTabPosition = (currentRef: RefObject<HTMLSpanElement>) => {
  const [fromTop, setFromTop] = useState(0);

  useEffect(() => {
    if (currentRef?.current) {
      console.log(currentRef.current.getBoundingClientRect().top, currentRef.current.offsetHeight);
      setFromTop(currentRef.current.offsetHeight / 2 - 5);
    }
  }, [currentRef?.current]);

  return { fromTop };
};

const NavigationPanel: React.FC<NavigationPanelPropsType> = ({ content, selectedTag, setSelectedTag }) => {
  const refs = useMemo(() => {
    return content?.map(() => {
      return React.createRef<HTMLSpanElement>();
    });
  }, []);
  const { fromTop } = useSelectedTabPosition(selectedTag.activeRef);
console.log(fromTop);

  return (
    <div className="w-[600px] h-full px-20 bg-slate-300 flex items-center justify-center">
      <div className="fixed top-[25%]">
        <h3 className="font-bold text-xl mb-5">In this article</h3>
        <div className="flex gap-2">
          <div className="relative w-[1px] bg-[#d7d7d7]">
            {/* <span className="block w-[1px] h-full bg-[#d7d7d7]"></span> */}
            <span
              className="absolute block w-1 h-10 bg-black left-0 transform -translate-x-1/2"
              style={{ top: fromTop }}
            ></span>
          </div>
          <nav className="flex flex-col gap-5 align-text-top">
            {content.map((contentData, index) => {
              return (
                <span
                  id={`position-${contentData.id}`}
                  key={contentData.id}
                  ref={refs[index]}
                  className="max-w-[320px] hover:font-bold"
                  onClick={() => {
                    setSelectedTag({ tag: contentData, activeRef: refs[index] });
                  }}
                  role="button"
                  tabIndex={index + 1}
                >
                  {contentData.attributes.title}
                </span>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
