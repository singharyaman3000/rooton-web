import React from 'react';

const Paginator = ({ totalPages, selectedIndex }: { totalPages: number; selectedIndex: number }) => {
  console.log(selectedIndex);
  return (
    <div className="flex md:hidden items-center justify-center  gap-x-[16px]">
      {[...Array(totalPages)].map((elem, index) => {
        if (index === 0 || index === totalPages - 1) {
          return (
            <div
              key={elem}
              className={`square-[3px] bg-black opacity-40 ${selectedIndex === index && '!opacity-100 !bg-[#f59723]'}`}
            ></div>
          );
        }
        return (
          <div
            key={elem}
            className={`square-[4px] bg-black  ${selectedIndex === index && '!opacity-100 !bg-[#f59723]'} `}
          ></div>
        );
      })}
    </div>
  );
};

export default Paginator;
