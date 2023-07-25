import React from "react"

const SubTitle = ({subtitle}:{subtitle:string}) => {
    return (
      <h1
        className={`text-sm md:text-md lg:text-lg uppercase md:mb-1 mb-0.5 lg:tracking-[3.6px] tracking-[2.818px] font-semibold text-font-color-orange leading-loose`}
      >
        {subtitle}
      </h1>
    );
}

export default SubTitle
