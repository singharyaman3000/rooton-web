import { ReactElement } from 'react';

type H2Props = {
  children: ReactElement | string;
};

export const H2 = ({ children }: H2Props) => {
  return <h2 className=" font-extrabold text-[28px] leading-heading">{children}</h2>;
};
