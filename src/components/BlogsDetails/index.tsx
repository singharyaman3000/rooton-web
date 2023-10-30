'use client';

import { IBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import { Breadcrumbs } from '../Breadcrumbs';
import NavigationPanel from './NavigationBar';

const BlogDetails = ({ details }: { details: IBlogDetails }) => {
  const sortedContent = details?.attributes?.blog_contents?.data?.toSorted((a, b) => {
    return (a?.attributes?.position ?? 0) - (b?.attributes?.position ?? 0);
  });

  return (
    <div className="mt-20 text-primary-font-color flex flex-col">
      <div className="relative">
        <Breadcrumbs
          // className="flex"
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
        <NavigationPanel content={sortedContent} />
        <main className="w-full scroll-smooth">
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
        </main>
      </div>
    </div>
  );
};

export default BlogDetails;
