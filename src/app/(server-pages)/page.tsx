import Credibility from '@/components/credibility/credibility';
import BlogListings from '@/components/HomePage/BlogListings';
import Honesty from '@/components/HomePage/Honesty';
import PartnerShip from '@/components/HomePage/Partnership';
import ServicesListing from '@/components/HomePage/ServicesListing';
import Testimonials from '@/components/HomePage/Testimonials';

export default function Home() {
  return (
    <>
      <Credibility />
      <ServicesListing />
      <Honesty/>
      <PartnerShip/>
      <BlogListings />
      <Testimonials />
    </>
  );
}
