import { IBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import PlaceholderAvatar from '@/components/Icons/PlaceholderAvatar';
import TimerBlackIcon from '@/components/Icons/TimerBlackIcon';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl, formatDate } from '@/utils';
import Image from 'next/image';

const BlogHeader = ({ blogDetails }: { blogDetails: IBlogDetails }) => {
  const calculateReadtime = (wordsCount: number) => {
    return Math.ceil(wordsCount / 200);
  };

  return (
    <div className="mt-6 lg:mt-[65px] mb-7 lg:mb-8">
      <h2 className="text-[28px] mx-6 lg:mx-0  lg:text-[40px] mb-5 font-semibold">{blogDetails?.attributes?.title}</h2>
      {/* Mobile View */}
      <div className="md:hidden mx-6 lg:mx-0 py-3 flex flex-col text-sm items-center justify-between border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {blogDetails?.attributes?.author_profile_image?.data?.attributes?.url ? (
              <Image
                sizes="100vw"
                priority
                width={36}
                height={36}
                src={appendAssetUrl(blogDetails?.attributes?.author_profile_image?.data?.attributes?.url ?? '')}
                style={{ objectFit: 'cover' }}
                alt="author-image"
                title="Author image"
              />
            ) : (
              <div className="h-9 w-9 overflow-hidden">
                <PlaceholderAvatar />
              </div>
            )}
            <span className="font-medium">{blogDetails?.attributes?.author ?? ''}</span>
          </div>
          <div className="pl-[20px] border-l">
            <span className="mr-[9px] opacity-30">Views</span>
            <span>{blogDetails?.attributes?.views ?? 0}</span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full pt-3 pb-5">
          {blogDetails?.attributes?.word_count ? (
            <div className="flex items-center gap-2">
              <TimerBlackIcon />
              <span>{`${calculateReadtime(blogDetails?.attributes?.word_count ?? 0)} min read`}</span>
            </div>
          ) : null}
          <div className="border-l pl-[20px]">
            <span className="mr-[9px] opacity-30">Last updated</span>
            <span>{formatDate(blogDetails?.attributes?.updatedAt)}</span>
          </div>
        </div>
      </div>
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between pb-5 pt-3 border-t">
        <div className="flex items-center gap-3">
          {blogDetails?.attributes?.author_profile_image?.data?.attributes?.url ? (
            <Image
              sizes="100vw"
              priority
              width={36}
              height={36}
              src={appendAssetUrl(blogDetails?.attributes?.author_profile_image?.data?.attributes?.url ?? '')}
              style={{ objectFit: 'cover' }}
              alt="author-image"
              title="Author image"
            />
          ) : (
            <div className="h-9 w-9 overflow-hidden">
              <PlaceholderAvatar />
            </div>
          )}
          <span className="font-medium">{blogDetails?.attributes?.author ?? ''}</span>
        </div>
        <div className="flex items-center gap-5">
          {blogDetails?.attributes?.word_count ? (
            <div className="flex items-center gap-2">
              <TimerBlackIcon />
              <span>{`${calculateReadtime(blogDetails?.attributes?.word_count ?? 0)} min read`}</span>
            </div>
          ) : null}
          <div className="border-l pl-[20px]">
            <span className="mr-[9px] opacity-30">Last updated</span>
            <span>{formatDate(blogDetails?.attributes?.updatedAt)}</span>
          </div>
          <div className="pl-[20px] border-l">
            <span className="mr-[9px] opacity-30">Views</span>
            <span>{blogDetails?.attributes?.views ?? 0}</span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[198px] md:h-[440px]">
        <NextImage
          sizes="100vw"
          priority
          src={appendAssetUrl(blogDetails?.attributes?.media_url?.data[0]?.attributes?.url)}
          fill
          style={{ objectFit: 'cover' }}
          altText="root-on-banner-image"
          title="Banner Image"
        />
      </div>
    </div>
  );
};

export default BlogHeader;
