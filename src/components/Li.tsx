import { ReactElement } from 'react';

type LiProps = {
  children: string | string[] | ReactElement;
  tabbed?: boolean
};

export const Li = ({ children, tabbed = false }: LiProps) => {
  return (
    <li className=" flex items-baseline">
      <span className={` flex-shrink-0 ${tabbed ? ' bg-grey-bullet w-2 h-2' : 'w-3 h-3 bg-golden-yellow'} mr-4`} />
      <span className=" lg:text-lg">{children}</span>
    </li>
  );
};
