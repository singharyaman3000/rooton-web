import React from "react";
import ReactHtmlParser from "react-html-parser";

const TitleWrapper = ({title, cssClass}:{title:string, cssClass?: string}) => {

    return (
        <h1 className={`${cssClass} text-[27.5px] md:text-5xl tracking-normal leading-10 md:leading-[68px] font-extrabold text-black`}>{ReactHtmlParser(title)}</h1>
    )
}

export default  TitleWrapper;