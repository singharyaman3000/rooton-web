import Credibility from '@/components/credibility/credibility';
import BlogListings from '@/components/HomePage/BlogListings';
import ServicesListing from '@/components/HomePage/ServicesListing';
import Testimonials from '@/components/HomePage/Testimonials';
import { getHomePageContents } from '../services/apiService/homeAPI';

export default async function Home() {
  const apiRes = await getHomePageContents();

  console.log(apiRes)

  return (
    <>
      <Credibility />
      <ServicesListing />
      <BlogListings />
      <Testimonials />
    </>
  );
}
