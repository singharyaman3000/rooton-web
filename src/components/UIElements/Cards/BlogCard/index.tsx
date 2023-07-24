import React from 'react';
import NextImage from '../../NextImage';
import Button from '../../Button';

const BlogCard = () => {
  return (
    <div className="py-[3px]">
      <div className="md:min-h-[252px] md:h-[15.75rem] relative">
        <NextImage sizes='' src={'/images/blog.png'} title="" fill style={{ objectFit: 'cover' }} altText="" />
      </div>
      <div className="p-[16px] md:p-[28px] ">
        <div className="text-xs text-primary-text font-semibold not-italic leading-[1.67] tracking-[normal] md:text-base">
          Five Provinces Invited Candidates in Provincial Immigration Draws from June 30 to July 7
        </div>
        <div className='flex items-center'>
          <Button label='Read More' ariaLabel={`Read More`} handleOnClick={()=>null}  tabIndex={0}/>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
