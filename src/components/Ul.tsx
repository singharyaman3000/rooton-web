import { ReactElement } from 'react';

type UlProps = {
  children: ReactElement[] | ReactElement;
};

export const Ul = ({ children }: UlProps) => {
  return (
    <section className=" flex gap-x-4 gap-y-5 text-sm font-medium leading-primary">
      <ul className=" mt-[27px] flex flex-col gap-5">
        {Array.isArray(children)
          ? children.map((child) => {
            return child;
          })
          : children}
      </ul>
    </section>
  );
};
