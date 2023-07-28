import Credibility from '@/components/credibility/credibility';
import BlogListings from '@/components/HomePage/BlogListings';
import ServicesListing from '@/components/HomePage/ServicesListing';
import Testimonials from '@/components/HomePage/Testimonials';
import { CONTENT_TYPES, getHomePageContents } from '../services/apiService/homeAPI';
import { IService, IServiceData } from '@/components/HomePage/ServicesListing/interafces';

export default async function Home() {
  const apiRes = await getHomePageContents();
  console.log(apiRes, '---=-=-=-');
  const getComponents = () => {
    // console.log(88888888888888888888888888 , apiRes.data)

    return apiRes?.attributes?.home_page_contents?.data?.map((contents) => {
      switch (contents.attributes.content_name) {
        case CONTENT_TYPES.SERVICES:
          return (
            <ServicesListing
              title={contents.attributes.title}
              sub_title={contents.attributes.sub_title}
              core_services={contents.attributes.core_services || []}
            />
          );
          case CONTENT_TYPES.CREDIBILITY:
        return  <Credibility   description={contents.attributes.description ?? ''} title={contents.attributes.title} sub_title={contents.attributes.sub_title} media_url={contents.attributes.media_url} />
        default:
          break;
      }
    });

    //  return apiRes.data?.attributes.home_page_contents.data?.map((data)=>{
    //   console.log(data.attributes.content_name , "-----------------")
    //   // switch (data.attributes.content_name) {
    //   //   case CONTENT_TYPES.SERVICES:
    //   //     return  <ServicesListing />
    //   //   default:
    //   //     break;
    //   // }
    //  })
  };

  return (
    <>
      {getComponents()}
      <BlogListings />
      <Testimonials />
    </>
  );
}
