import { useParams, useRouter } from 'next/navigation';

import { appendAssetUrl, formatDate, truncateText } from '@/utils';
import NextImage from '@/components/UIElements/NextImage';
import { BLOG_LISTING_PATH } from '@/constants/navigation';
import { IBlogData } from '@/app/services/apiService/blogsListAPI';

type ArticleCardPropType = { attributes: IBlogData['attributes']; articleId: number };

const ArticleCard = ({ attributes, articleId }: ArticleCardPropType) => {
  let baseUrl = BLOG_LISTING_PATH;
  const params = useParams();
  const router = useRouter();

  if (params.lang) {
    baseUrl = `/${params.lang}${baseUrl}`;
  }
  const href = articleId && attributes?.category ? `${baseUrl}/${articleId}/${attributes.category}` : baseUrl;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => {
        router.push(href);
      }}
      className="flex flex-col px-6 md:px-0 justify-start items-center bg-white-fixed blog-bg h-[478px] lg:h-[527px] border-t-[1px] border-[#b9b9b9] md:border hover:border-golden-yellow !min-w-[360px] md:w-[380px] cursor-pointer"
    >
      <div className="relative h-[216px] min-w-[312px] md:h-[252px] w-full my-6 md:mt-0">
        <NextImage
          sizes="100vw"
          src={appendAssetUrl(attributes.media_url?.data[0]?.attributes?.formats?.thumbnail?.url)}
          title="Blog Image"
          style={{ objectFit: 'cover' }}
          fill
          altText={attributes.media_url?.data[0].attributes.alternativeText}
        />
      </div>
      <div className="md:px-6 h-[214px] md:h-[263px] flex flex-col justify-between">
        <div>
          <h3 className="max-h-[70px] lg:max-h-[85px]  overflow-hidden justify-self-start text-base lg:text-lg font-bold text-primary-font-color">
            {truncateText(attributes?.title ?? '')}
          </h3>
          <p className="pt-3 max-h-[58px] overflow-hidden text-xs leading-4 text-primary-font-color opacity-60 text-ellipsis overflow-hidden">
            {truncateText(attributes?.description ?? '')}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 pt-[15px] pb-[15px] text-xs md:text-sm border-t-[1px] border-b-[1px] md:border-b-0 border-[#d7d7d7]">
          <div className="flex flex-col gap-1 md:gap-2">
            <span className="text-primary-font-color opacity-[.36]">Last updated</span>
            <span className="text-primary-font-color">{formatDate(attributes?.updatedAt)}</span>
          </div>
          <div className="flex flex-col  gap-1 md:gap-2">
            <span className="text-primary-font-color opacity-[.36]">Views</span>
            <span className="text-primary-font-color">{attributes?.views ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
