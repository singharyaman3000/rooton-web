'use client';

import React, { Dispatch, RefObject, SetStateAction, useMemo } from 'react';
import { SelectedTagType } from '..';
import useGetTabTopPosition from '../hooks/useGetTabTopPosition';
import useSetScrollHeader from '../hooks/useSetScrollHeader';

type NavigationPanelPropsType = {
  content: string[];
  selectedTag: SelectedTagType;
  setSelectedTag: Dispatch<SetStateAction<SelectedTagType>>;
};

const NavigationPanel: React.FC<NavigationPanelPropsType> = ({ content, selectedTag, setSelectedTag }) => {
  const refs = useMemo(() => {
    return content?.map(() => {
      return React.createRef<HTMLSpanElement>();
    });
  }, []);

  // const { unObserveTargets, observeTargets } = useSetScrollHeader('heading', refs, setSelectedTag, selectedTag);
  const { fromTop } = useGetTabTopPosition(selectedTag.activeRef);

  const test = (currentRef: RefObject<HTMLSpanElement>, currentHeading: string) => {
    if (currentRef.current) {
      const allHeadings = document?.querySelectorAll('heading');
      const selectedHeader = Array.from(allHeadings).find((heading) => {
        return heading.textContent === currentHeading;
      });
      if (selectedHeader) selectedHeader.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // observeTargets();
    }
  };

  return (
    <div className="sticky hidden md:flex top-0 h-[100vh] w-[480px] px-20 items-center justify-center">
      <div className="">
        <h3 className="font-bold text-xl mb-5">In this article</h3>
        <div className="flex gap-2">
          <div id="tab-parent-div" className="relative w-[1px] bg-[#d7d7d7]">
            <span
              className="absolute block w-1 h-10 bg-golden-yellow left-0 transform -translate-x-1/2 transition-all  duration-1700"
              style={{ top: fromTop }}
            ></span>
          </div>
          <nav className="flex flex-col gap-5 align-text-top">
            {content.map((heading, index) => {
              return (
                <span
                  key={`content-${index}`}
                  ref={refs[index]}
                  className="max-w-[320px] hover:font-bold min-w-[300px]"
                  onClick={() => {
                    // unObserveTargets();
                    setSelectedTag({ tag: heading, activeRef: refs[index], type: 'selected' });
                    test(refs[index], heading);
                  }}
                  role="button"
                  tabIndex={index + 1}
                >
                  {heading}
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
