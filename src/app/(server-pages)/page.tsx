import BlogListings from '@/components/HomePage/BlogListings';
import Testimonials from '@/components/HomePage/Testimonials';
import SampleAnimation from '@/components/sample-animation';
import Image from 'next/image';

export default function Home() {
  return (
    <main className=" h-screen w-full">
     <BlogListings/>
     <Testimonials/>
    </main>
  );
}
