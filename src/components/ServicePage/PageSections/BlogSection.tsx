'use client';

// import { getBlogs } from '@/app/services/apiService/blogs';
import BlogsCarousel from '@/components/BlogsListPage/BlogsCarousel';
// import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';

type BlogSectionProps = {
  title: string;
  subtitle: string;
  serviceType?: string;
  sourcePage: string;
};

const BlogSection = ({ title, subtitle, serviceType, sourcePage }: BlogSectionProps) => {
  // const { loading } = useClientAPI({
  //   apiFn: () => {
  //     return getBlogs(url);
  //   },
  // });
  return (
    // <div className=" w-full bg-secondary-grey py-[24px] md:py-[48px] lg:py-[80px]">
    //   <div className=" mt-[6px] m-auto max-w-screen-2k">
    //     {loading ? (
    //       <div className=" w-full flex justify-center items-center">
    //         <div
    //           className="
    //                 h-[32.5rem]
    //                 w-full
    //                 p-[0px]
    //                 skeleton
    //                 relative
    //             "
    //         >
    //           <div className=" relative h-full">
    //             <div
    //               className="
    //                 absolute
    //                 flex
    //                 items-center
    //                 z-[10]
    //                 left-0
    //                 bottom-0
    //                 bg-white
    //                 p-[10px]
    //                 md:p-[16px]
    //                 w-full"
    //             />
    //           </div>
    //           <div className="absolute w-full h-full top-0 bg-black opacity-[0.32]" />
    //         </div>
    //       </div>
    //     ) : (
    < BlogsCarousel sourcePage={sourcePage} serviceType={serviceType}
      articleType={(serviceType ? 'blog' : 'news')}
      title={title} subHeading={subtitle} id="news_listing" showMore />
    //     // {/* )} */}
    //   </div>
    // </div>

  );
};

export default BlogSection;
