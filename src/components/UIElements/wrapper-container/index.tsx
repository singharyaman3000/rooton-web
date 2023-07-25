const Container = ({ children , bgImage}: { children: React.ReactNode, bgImage?:string }) => {
  return (
    <div className=" z-0 h-auto mx-auto max-w-[1440px] bg-credibility-grid bg-right">
      <div className="flex mx-auto px-6 md:px-20">{children}</div>
    </div>
  );
};

export default Container;
