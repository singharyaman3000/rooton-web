import Credibility from '@/components/credibility/credibility';
import BlogListings from '@/components/HomePage/BlogListings';
import ServicesListing from '@/components/HomePage/ServicesListing';
import Testimonials from '@/components/HomePage/Testimonials';

export default function Home() {
  return (
    <>
      <Credibility/>
      <ServicesListing />
      <BlogListings />
      <Testimonials />
    </>
  );
}
