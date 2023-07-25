
import React, { useEffect, useState } from 'react'
import useSliderPagination, { IUseSlider } from './useSlider';

// export interface IUseSliderData  extends IUseSlider {slideId:string}

type IUseSliderData ={
    slideId:string
}

const useSliderData = ({slideId}:IUseSliderData) => {

    const [scrollAmt, setScrollAmt] = useState(0);
    const [unitPageWidth, setPageWidth] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { pageNum, incrementPage, decrementPage } = useSliderPagination({ slidesLength: totalPages, initialPage: 0 });
  
    useEffect(() => {
      setScrollAmt(unitPageWidth * pageNum);
    }, [pageNum]);
    useEffect(() => {
        const slide = document.getElementById(slideId);
        if (slide) {
          let totalWidth = 0;
          let itemsPerPage = 0;
          const children = slide.children;
          if (children && children.length > 0) {
            for (const key in children) {
              if (children[key].clientWidth) {
                if (totalWidth + children[key].clientWidth < slide.clientWidth) {
                  totalWidth = totalWidth + children[key].clientWidth;
                  itemsPerPage += 1;
                }
              }
            }
          }
          setTotalPages(Math.ceil(slide.childElementCount / itemsPerPage));
          setPageWidth(totalWidth);
        }
      }, []);

      return {totalPages , pageNum , incrementPage ,decrementPage , scrollAmt}
}

export default useSliderData