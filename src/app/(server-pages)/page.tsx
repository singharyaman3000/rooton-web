import BlogListings from '@/components/HomePage/BlogListings';
import SampleAnimation from '@/components/sample-animation';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center w-full">
     <BlogListings/>
    </main>
  );
}
