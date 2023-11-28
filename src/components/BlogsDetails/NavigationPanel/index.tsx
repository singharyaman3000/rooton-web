'use client';

import React, { RefObject, useEffect, useMemo, useState } from 'react';
import useGetTabTopPosition from '../hooks/useGetTabTopPosition';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import SocialMediaShare from '../SocialMediaShare';
import useSetScrollHeader from '../hooks/useSetScrollHeader';

export type SelectedTagType = { tag: number; activeRef: RefObject<HTMLSpanElement> };

type NavigationPanelPropsType = {
  // eslint-disable-next-line no-undef
  breadcrumbsData: {
    title: string;
    path: string;
  }[];
};

const NavigationPanel: React.FC<NavigationPanelPropsType> = ({ breadcrumbsData }) => {
  const [selectedTag, setSelectedTag] = useState<SelectedTagType>({} as SelectedTagType);
  const [allHeadingsList, setAllHeadingsList] = useState<Element[]>([]);

  const refs = useMemo(() => {
    return allHeadingsList?.map(() => {
      return React.createRef<HTMLSpanElement>();
    });
  }, []);

  const { observeTargets } = useSetScrollHeader(refs, setSelectedTag);

  useEffect(() => {
    observeTargets();
    const allHeadings = Array.from(document?.querySelectorAll('heading'));
    setAllHeadingsList(allHeadings);
  }, []);

  const { fromTop } = useGetTabTopPosition(selectedTag.activeRef);

  const handleScrollToHeading = (currentRef: RefObject<HTMLSpanElement>, currentId: number) => {
    if (currentRef?.current) {
      console.log('trigger');
      
      const selectedHeader = allHeadingsList.find((heading) => {
        const headerId = heading.getAttribute('data-id') ?? 0;
        return +headerId === currentId;
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
        {allHeadingsList?.length !== 0 ? (
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
                {allHeadingsList?.map((heading: Element, index: number) => {
                  return (
                    <span
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      ref={refs[index]}
                      className="max-w-[320px] hover:font-bold min-w-[300px] text-base"
                      onClick={() => {
                        handleScrollToHeading(refs[index], index);
                      }}
                      style={{ fontWeight: selectedTag?.tag === index ? 'bold' : '' }}
                      role="button"
                      tabIndex={index + 1}
                    >
                      {heading.textContent}
                    </span>
                  );
                })}
              </nav>
            </div>
          </>
        ) : null}
        <div className="mt-[52px] mb-10">
          <SocialMediaShare />
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
