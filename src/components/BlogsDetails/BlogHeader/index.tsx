import { IBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl, formatDate } from '@/utils';
import Image from 'next/image';

const BlogHeader = ({ blogDetails }: { blogDetails: IBlogDetails }) => {
  return (
    <div className="mt-6 lg:mt-[65px]">
      <h2 className="text-[28px] lg:text-[40px] mb-8 font-semibold">{blogDetails?.attributes?.title}</h2>
      <div className="py-3 flex text-sm items-center justify-between border-t">
        <div className="flex items-center gap-3">
          <Image
            sizes="100vw"
            priority
            width={50}
            height={50}
            src={appendAssetUrl(blogDetails?.attributes?.author_profile_image?.data?.attributes?.url ?? '')}
            style={{ objectFit: 'cover' }}
            alt="author-image"
            title="Author image"
          />
          <span className="font-medium">{blogDetails?.attributes?.author ?? ''}</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="pr-5 border-r">
            <span className="mr-[9px] opacity-30">Last updated</span>
            <span>{formatDate(blogDetails?.attributes?.updatedAt)}</span>
          </div>
          <div>
            <span className="mr-[9px] opacity-30">Views</span>
            <span>{blogDetails?.attributes?.views ?? 0}</span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[198px] md:h-[480px]">
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
