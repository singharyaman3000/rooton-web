const ArticlePreLoader = () => {
  return (
    <div className="flex w-[360px] md:w-[380px] ">
      <div className="h-[514px] w-full md:!h-[527px] md:max-w-[380px] !min-w-[360px] p-[0px] skeleton relative">
        <div className=" relative h-full">
          <div className="absolute flex  items-center z-[10] left-0 bottom-0 p-[10px] md:p-[16px] w-full"></div>
        </div>
        <div className="absolute w-full h-full top-0 bg-black opacity-[0.32]"></div>
      </div>
    </div>
  );
};

export default ArticlePreLoader;
