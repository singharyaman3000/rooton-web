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
  return (
    <BlogsCarousel
      sourcePage={sourcePage}
      serviceType={serviceType}
      articleType={serviceType ? 'blog' : 'coaching-tips'}
      title={title}
      subHeading={subtitle}
      id="coaching_listing"
      showMore
    />
  );
};

export default BlogSection;