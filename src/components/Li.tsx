type LiProps = {
  children: string | string[];
};

export const Li = ({ children }: LiProps) => {
  return (
    <li className=" flex items-baseline">
      <span className=" flex-shrink-0 w-3 h-3 bg-golden-yellow mr-4" />
      <span>{children}</span>
    </li>
  );
};
