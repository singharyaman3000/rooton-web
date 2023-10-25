import { IAttributes } from '@/app/services/apiService/interfaces';
import { formatDate } from '@/utils';

type ArticleCardPropType = { id: number; attributes: IAttributes };

const ArticleCard = ({ attributes }: ArticleCardPropType) => {
  console.log(attributes);

  return (
    <div className="flex flex-col items-center bg-white md:border border-golden-yellow md:max-w-[380px]">
      <div className="w-auto h-[240px] bg-orange-400"></div>
      <div className="px-6">
        <h2 className="min-h-[90px] text-[16px] font-bold mt-6 text-primary-black">{attributes?.title ?? ''}</h2>
        <p className="pt-3 text-sm text-font-grey">{''}</p>
        <span className="block h-[1px] w-[100%] my-3 bg-[#d7d7d7]"></span>
        <div className="flex justify-between pt-[15px] pb-6 text-sm">
          <div className="flex gap-2">
            <span className="text-font-grey">Last updated</span>
            <span className="text-primary-black">{formatDate(attributes?.updatedAt)}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-font-grey">Views</span>
            <span className="text-primary-black">30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
