/* eslint-disable react/no-array-index-key */
import Link from 'next/link';

type BreadcrumbsData = {
  title: string;
  path: string;
};

type BreadcrumbsProps = {
  data: BreadcrumbsData[];
};

export const Breadcrumbs = ({ data }: BreadcrumbsProps) => {
  return (
    <div className=" flex items-center gap-[14px] text-white absolute left-20 top-[93px] text-sm">
      {data.map((d, index) => {
        if (index < data.length - 1) {
          return (
            <>
              <Link key={`breadcrumb-item-${index}`} href={d.path}> {d.title} </Link>
              <span key={`breadcrumb-sep-${index}`}>-</span>
            </>
          );
        }

        return <span key={'last-element-breadcrumps'}> {d.title} </span>;
      })}
    </div>
  );
};
