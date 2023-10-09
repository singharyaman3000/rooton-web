import { ReactElement } from 'react';

type UlProps = {
  children: ReactElement[] | ReactElement;
  className?: string;
};

export const Ul = ({ children, className }: UlProps) => {
  return (
    <section className={`${className} mt-[27px] flex gap-x-4 gap-y-5 text-sm font-medium leading-primary`}>
      <ul className=" flex flex-col gap-5">
        {Array.isArray(children)
          ? children.map((child) => {
            return child;
          })
          : children}
      </ul>
    </section>
  );
};
