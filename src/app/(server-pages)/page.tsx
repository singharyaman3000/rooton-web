import BlogListings from '@/components/HomePage/BlogListings';
import ServicesListing from '@/components/HomePage/ServicesListing';
import Testimonials from '@/components/HomePage/Testimonials';

export default function Home() {
  return (
    <main className=" h-screen w-full">
      <ServicesListing />
      <BlogListings />
      <Testimonials />
    </main>
  );
}
