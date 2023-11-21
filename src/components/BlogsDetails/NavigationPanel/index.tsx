'use client';

import React, { Dispatch, RefObject, SetStateAction, useMemo } from 'react';
import { SelectedTagType } from '..';
import useGetTabTopPosition from '../hooks/useGetTabTopPosition';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import SocialMediaShare from '../SocialMediaShare';

type NavigationPanelPropsType = {
  content: string[];
  selectedTag: SelectedTagType;
  setSelectedTag: Dispatch<SetStateAction<SelectedTagType>>;
  breadcrumbsData: {
    title: string;
    path: string;
  }[];
};

const NavigationPanel: React.FC<NavigationPanelPropsType> = ({
  content,
  selectedTag,
  setSelectedTag,
  breadcrumbsData,
}) => {
  const refs = useMemo(() => {
    return content?.map(() => {
      return React.createRef<HTMLSpanElement>();
    });
  }, []);

  const { fromTop } = useGetTabTopPosition(selectedTag.activeRef);

  const test = (currentRef: RefObject<HTMLSpanElement>, currentHeading: string) => {
    if (currentRef.current) {
      const allHeadings = document?.querySelectorAll('heading');
      const selectedHeader = Array.from(allHeadings).find((heading) => {
        return heading.textContent === currentHeading;
      });
      if (selectedHeader) selectedHeader.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="sticky hidden lg:flex flex-col items-center top-0 h-[calc(100vh-80px)] md:w-[300px] lg:w-[480px] px-20 items-center justify-center overflow-y-scroll overflow-x-hidden">
      <div className="hidden lg:block absolute top-3 left-6 lg:left-20">
        <Breadcrumbs className="text-black" data={breadcrumbsData} isStatic />
      </div>
      <div className="mt-[100px]">
        {content?.length !== 0 ? (
          <>
            <h3 className="font-bold text-xl mb-5">In this article</h3>
            <div className="flex gap-2">
              <div id="tab-parent-div" className="relative w-[1px] bg-[#d7d7d7]">
                <span
                  className="absolute block w-1 h-10 bg-golden-yellow left-0 transform -translate-x-1/2 transition-all  duration-1700"
                  style={{ top: fromTop }}
                ></span>
              </div>
              <nav className="flex flex-col gap-5 align-text-top">
                {content?.map((heading: string, index: number) => {
                  return (
                    <span
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      ref={refs[index]}
                      className="max-w-[320px] hover:font-bold min-w-[300px] text-base"
                      onClick={() => {
                        setSelectedTag({ tag: heading, activeRef: refs[index], type: 'selected' });
                        test(refs[index], heading);
                      }}
                      style={{ fontWeight: selectedTag?.tag === heading ? 'bold' : '' }}
                      role="button"
                      tabIndex={index + 1}
                    >
                      {heading}
                    </span>
                  );
                })}
              </nav>
            </div>
          </>
        ) : null}
        <div className="mt-[52px]">
          <SocialMediaShare />
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
