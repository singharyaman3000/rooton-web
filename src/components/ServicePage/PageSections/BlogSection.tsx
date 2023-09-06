'use client';

import { getBlogs } from '@/app/services/apiService/blogs';
import BlogListings from '@/components/HomePage/BlogListings';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';

type BlogSectionProps = {
  title: string;
  subtitle: string;
  url: string;
};

const BlogSection = ({ url, title, subtitle }: BlogSectionProps) => {
  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getBlogs(url);
    },
  });

  return (
    <div className=" w-full">
      <div className=" mt-20 m-auto max-w-screen-2k">
        {loading ? (
          <div className=" w-full flex justify-center items-center">
            <div
              className="
                    h-[32.5rem]
                    w-full
                    p-[0px]
                    skeleton
                    relative
                "
            >
              <div className=" relative h-full">
                <div
                  className="
                    absolute
                    flex
                    items-center
                    z-[10]
                    left-0
                    bottom-0
                    bg-white
                    p-[10px]
                    md:p-[16px]
                    w-full"
                />
              </div>
              <div className="absolute w-full h-full top-0 bg-black opacity-[0.32]" />
            </div>
          </div>
        ) : (
          <BlogListings
            blogs={{
              data: data && data[0].attributes.media_url.data.length > 0 ? data : [],
            }}
            title={title}
            sub_title={subtitle}
          />
        )}
      </div>
    </div>
  );
};

export default BlogSection;
