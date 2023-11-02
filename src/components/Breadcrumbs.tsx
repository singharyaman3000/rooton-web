/* eslint-disable react/no-array-index-key */
import Link from 'next/link';
import { RightArrow } from './Icons/RightArrow.icon';
import { ReactElement } from 'react';

type BreadcrumbsData = {
  title: string | ReactElement;
  path: string;
};

type BreadcrumbsProps = {
  data: BreadcrumbsData[];
  className?: string;
  isStatic?: boolean;
};

export const Breadcrumbs = ({ data, className, isStatic = false }: BreadcrumbsProps) => {
  return (
    <div
      className={`
        ${className} ${
          isStatic ? '' : 'absolute'
        } flex items-center gap-[14px] text-white font-medium left-6 xl:left-20 top-[93px] text-sm`}
    >
      {data.map((d, index) => {
        if (index < data.length - 1) {
          return (
            <>
              <Link className=" opacity-70" key={`breadcrumb-item-${index}`} href={d.path}>
                {' '}
                {d.title}{' '}
              </Link>
              <span className=" opacity-70" key={`breadcrumb-sep-${index}`}>
                <RightArrow />
              </span>
            </>
          );
        }

        return <span key={'last-element-breadcrumps'} dangerouslySetInnerHTML={{ __html: d.title as string }} />;
      })}
    </div>
  );
};
