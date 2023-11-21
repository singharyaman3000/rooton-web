import Link from 'next/link';
import { useParams } from 'next/navigation';

import { appendAssetUrl, formatDate } from '@/utils';
import NextImage from '@/components/UIElements/NextImage';
import { BLOG_LISTING_PATH } from '@/constants/navigation';
import { IBlogData } from '@/app/services/apiService/blogsListAPI';

type ArticleCardPropType = { attributes: IBlogData['attributes']; articleId: number };

const ArticleCard = ({ attributes, articleId }: ArticleCardPropType) => {
  let baseUrl = BLOG_LISTING_PATH;
  const params = useParams();

  if (params.lang) {
    baseUrl = `/${params.lang}${baseUrl}`;
  }
  const href = articleId && attributes?.category ? `${baseUrl}/${articleId}/${attributes.category}` : baseUrl;

  return (
    <Link href={href}>
      <div className="flex flex-col items-center bg-white-fixed justify-between h-[514px] lg:h-[527px] border-t-[1px] border-[#b9b9b9] md:border hover:border-golden-yellow !min-w-[360px] md:w-[380px] cursor-pointer">
        <div className="h-[216px] w-[312px] md:min-h-[252px] md:w-full relative mt-6 md:mt-0">
          <NextImage
            sizes="(max-width: 768px) 100vw, 25vw"
            src={appendAssetUrl(attributes.media_url?.data[0]?.attributes?.formats?.thumbnail?.url)}
            title="Blog Image"
            fill
            style={{ objectFit: 'cover' }}
            altText={attributes.media_url?.data[0].attributes.alternativeText}
          />
        </div>
        <div className="px-6">
          <h2 className="max-h-[90px] text-base lg:text-lg font-bold mt-3 text-primary-black">
            {attributes?.title ?? ''}
          </h2>
          <p className="pt-3 max-h-[75px] text-sm text-primary-black opacity-60 text-ellipsis overflow-hidden">
            {attributes?.description}
          </p>
          <div className="flex justify-between  items-center mt-4 pt-[15px] pb-6 text-sm border-t-[1px] border-b-[1px] md:border-b-0 border-[#d7d7d7]">
            <div className="flex gap-2">
              <span className="text-primary-black opacity-[.36]">Last updated</span>
              <span className="text-primary-black">{formatDate(attributes?.updatedAt)}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary-black opacity-[.36]">Views</span>
              <span className="text-primary-black">{attributes?.views ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
