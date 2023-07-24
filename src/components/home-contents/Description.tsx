import React from "react";
import ReactHtmlParser from 'react-html-parser'

const Description = ({description, cssClass}:{description:string, cssClass?:string}) => {
    return (
        <p className={`${cssClass} text-sm md:text-lg leading-6 md:leading-[30px]  tracking-normal font-medium text-font-color-light-gray`}>{ReactHtmlParser(description)}</p>
    )
}

export default Description