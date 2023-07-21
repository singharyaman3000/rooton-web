import { NEWS_TITLE } from '@/app/constants/textConstants'
import SectionContainer from '@/components/Containers/SectionContainers'
import SectionHeadings from '@/components/UIElements/SectionHeadings'
import React from 'react'

const BlogListings = () => {
  return (
 <section className='bg-grey w-full'>
  <SectionContainer>
   <SectionHeadings title={NEWS_TITLE.title} subTitle={NEWS_TITLE.subTitle} />
   <div className='pt-[24px] md:pt-[80px]'>

   </div>
  </SectionContainer>

 </section>
  )
}

export default BlogListings