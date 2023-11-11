'use client';

import BlogsCarousel from '@/components/BlogsListPage/BlogsCarousel';

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