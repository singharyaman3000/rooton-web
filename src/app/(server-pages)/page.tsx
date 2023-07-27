// <<<<<<< HEAD
import Container from "@/components/UIElements/wrapper-container";
import Credibility from "@/components/credibility/credibility";
import BlogListings from '@/components/HomePage/BlogListings';
import Testimonials from '@/components/HomePage/Testimonials';

export default function Home() {
  return (
    <>
      <Credibility/>
      <BlogListings />
      <Testimonials />
    </>
      
  );
}
