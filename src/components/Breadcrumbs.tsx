/* eslint-disable react/no-array-index-key */
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { ReactElement } from 'react';

import { RightArrow } from './Icons/RightArrow.icon';
import { RightArrowGrey } from './Icons/RightArrowGrey';

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
  const params = useParams();
  const styleClass = `
  ${isStatic ? 'text-primary-font-color' : 'text-white'} font-medium left-6 xl:left-20 top-[93px] text-sm text-position`;

  return (
    <div className={`${className} ${isStatic ? '' : 'absolute'} flex items-center gap-[14px] ${styleClass}`}>
      {data.map((d, index) => {
        if (index < data.length - 1) {
          return (
            <React.Fragment key={`breadcrumb-item-${index}`}>
              <Link className=" opacity-70" href={params.lang ? `/${params.lang}${d.path}` : d.path}>
                {' '}
                {d.title}{' '}
              </Link>
              <span className=" opacity-70" key={`breadcrumb-sep-${index}`}>
                {isStatic ? <RightArrowGrey /> : <RightArrow />}
              </span>
            </React.Fragment>
          );
        }

        return <span key={'last-element-breadcrumps'} dangerouslySetInnerHTML={{ __html: d.title as string }} />;
      })}
    </div>
  );
};
