import { ReactElement } from 'react';

type H2Props = {
  children: ReactElement | string;
};

export const H2 = ({ children }: H2Props) => {
  return (
    <h2
      className="
      font-extrabold
      text-[28px]
      leading-heading
      lg:text-2xl
      xl:text-5xl
      lg:leading-heading-lg
      xl:leading-heading-lg
      "
    >
      {children}
    </h2>
  );
};
