'use client';

import { IBlogContentData, IBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import { Breadcrumbs } from '../Breadcrumbs';
import NavigationPanel from './NavigationBar';
import { RefObject, useEffect, useState } from 'react';

export type SelectedTagType = { tag: IBlogContentData; activeRef: RefObject<HTMLSpanElement> };

const BlogDetails = ({ details }: { details: IBlogDetails }) => {
  const [selectedSection, setSelectedSection] = useState<SelectedTagType>({} as SelectedTagType);

  const sortedContent = details?.attributes?.blog_contents?.data?.toSorted((a, b) => {
    return (a?.attributes?.position ?? 0) - (b?.attributes?.position ?? 0);
  });

  useEffect(() => {
    if (selectedSection?.activeRef) {
      const section = document.querySelector(`#section-container #${selectedSection.activeRef.current?.id}`);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedSection]);

  return (
    <div className="mt-20 text-primary-font-color flex flex-col">
      <div className="relative">
        <Breadcrumbs
          data={[
            {
              title: 'Home',
              path: '',
            },
            {
              title: 'Services',
              path: '',
            },
            {
              title: 'Open Work Permit',
              path: '',
            },
          ]}
        />
      </div>
      <div className="flex">
        <NavigationPanel content={sortedContent} selectedTag={selectedSection} setSelectedTag={setSelectedSection} />
        <div id="section-container" className="w-full">
          <section id="position-9" className="h-[300px] w-full bg-blue-400">
            Position 9
          </section>
          <section id="position-10" className="h-[300px] w-full bg-green-400">
            Position 10
          </section>
          <section id="position-11" className="h-[300px] w-full bg-red-400">
            Position 11
          </section>
          <section id="position-12" className="h-[300px] w-full bg-yellow-400">
            Position 12
          </section>
          <section id="position-13" className="h-[300px] w-full bg-gray-400">
            Position 13
          </section>
          <section id="position-14" className="h-[300px] w-full bg-orange-400">
            Position 14
          </section>
          <section id="position-15" className="h-[300px] w-full bg-cyan-400">
            Position 15
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
