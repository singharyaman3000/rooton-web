/* eslint-disable react/no-array-index-key */
import Link from 'next/link';
import { RightArrow } from './Icons/RightArrow.icon';

type BreadcrumbsData = {
  title: string;
  path: string;
};

type BreadcrumbsProps = {
  data: BreadcrumbsData[];
  className?: string;
};

export const Breadcrumbs = ({ data, className }: BreadcrumbsProps) => {
  return (
    <div
      className={`
        ${className} flex items-center gap-[14px] text-white absolute font-medium left-6 xl:left-20 top-[93px] text-sm`}
    >
      {data.map((d, index) => {
        if (index < data.length - 1) {
          return (
            <>
              <Link key={`breadcrumb-item-${index}`} href={d.path}>
                {' '}
                {d.title}{' '}
              </Link>
              <span key={`breadcrumb-sep-${index}`}>
                <RightArrow />
              </span>
            </>
          );
        }

        return <span key={'last-element-breadcrumps'}> {d.title} </span>;
      })}
    </div>
  );
};
