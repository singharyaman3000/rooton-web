import Credibility from '@/components/credibility/credibility';
import BlogListings from '@/components/HomePage/BlogListings';
import Honesty from '@/components/HomePage/Honesty';
import PartnerShip from '@/components/HomePage/Partnership';
import ServicesListing from '@/components/HomePage/ServicesListing';
import Testimonials from '@/components/HomePage/Testimonials';
import { CONTENT_TYPES, getHomePageContents } from '../services/apiService/homeAPI';
import OurProcess, { IOurProcessData } from '@/components/HomePage/OurProcess';

export default async function Home() {
  const apiRes = await getHomePageContents();
  console.log(apiRes, '---=-=-=-');
  const getComponents = () => {
    // console.log(88888888888888888888888888 , apiRes.data)

    return apiRes?.attributes?.home_page_contents?.data?.map((contents) => {
      const { title, sub_title, description } = contents.attributes;
      switch (contents.attributes.content_name) {
        case CONTENT_TYPES.SERVICES:
          return (
            <ServicesListing
              title={title}
              sub_title={sub_title}
              core_services={contents.attributes.core_services || []}
            />
          );
        case CONTENT_TYPES.CREDIBILITY:
          return (
            <Credibility
              description={description ?? ''}
              title={title}
              sub_title={sub_title}
              media_url={contents.attributes.media_url}
            />
          );

        case CONTENT_TYPES.WHY_ROOT_ON:
          return (
            <>
              <Honesty
                title={title}
                description={description ?? ''}
                sub_title={sub_title}
                json_content={contents.attributes.json_content}
              />
            </>
          );

          case CONTENT_TYPES.OUR_PROCESSES:
            return (
              <>
                  <OurProcess title={title} sub_title={sub_title} json_content={contents.attributes.json_content as IOurProcessData} />

              </>
            );

        case null:
          return <PartnerShip sub_title={sub_title} title={title} data={contents.attributes.media_url.data} />;

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
