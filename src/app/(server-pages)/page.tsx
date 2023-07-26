import BlogListings from '@/components/HomePage/BlogListings';
import Testimonials from '@/components/HomePage/Testimonials';

export default function Home() {
  return (
    <main className=" h-screen w-full">
      <BlogListings />
      <Testimonials />
    </main>
  );
}
