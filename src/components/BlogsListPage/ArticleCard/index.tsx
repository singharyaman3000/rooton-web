import { IBlogData } from '@/app/services/apiService/blogsListAPI';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl, formatDate } from '@/utils';

type ArticleCardPropType = { attributes: IBlogData['attributes'] };

const ArticleCard = ({ attributes }: ArticleCardPropType) => {
  return (
    <div className='flex flex-col items-center bg-white-fixed justify-between h-full border-t-[1px] border-[#b9b9b9] md:border md:border-golden-yellow !min-w-[360px] md:max-w-[380px]'>
      <div className='h-[216px] w-[312px] md:min-h-[252px] md:w-full relative mt-6 md:mt-0'>
        <NextImage
          sizes='(max-width: 768px) 100vw, 25vw'
          src={appendAssetUrl(attributes.media_url?.data[0]?.attributes?.formats?.thumbnail?.url)}
          title='Blog Image'
          fill
          style={{ objectFit: 'cover' }}
          altText={attributes.media_url?.data[0].attributes.alternativeText}
        />
      </div>
      <div className='px-6'>
        <h2 className='max-h-[90px] text-[16px] font-bold mt-3 text-primary-black'>{attributes?.title ?? ''}</h2>
        <p className='pt-3 max-h-[75px] text-sm text-font-grey text-ellipsis overflow-hidden'>
          {attributes?.description}
        </p>
        <div className='flex justify-between  items-center mt-4 pt-[15px] pb-6 text-sm border-t-[1px] border-b-[1px] border-[#d7d7d7]'>
          <div className='flex gap-2'>
            <span className='text-font-grey'>Last updated</span>
            <span className='text-primary-black'>{formatDate(attributes?.updatedAt)}</span>
          </div>
          <div className='flex gap-2'>
            <span className='text-font-grey'>Views</span>
            <span className='text-primary-black'>{attributes?.views ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
