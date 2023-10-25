import { useEffect, useState } from 'react';
import useSliderPagination from './useSlider';

type IUseSliderData = {
  slideId: string;
  sliderData: unknown;
};

const useSliderData = ({ slideId, sliderData }: IUseSliderData) => {
  const [scrollAmt, setScrollAmt] = useState(0);
  const [unitPageWidth, setPageWidth] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { pageNum, incrementPage, decrementPage , jumpToPage } = useSliderPagination({ slidesLength: totalPages, initialPage: 0 });

  useEffect(() => {
    setScrollAmt(unitPageWidth * pageNum);
  }, [pageNum]);

  useEffect(() => {
    if (sliderData) {
      const slide = document.getElementById(slideId);
      if (slide) {
        let totalWidth = 0;
        let itemsPerPage = 0;
        const { children = [] } = slide;
        if (children && children.length > 0) {
          for (const key in children) {
            if (children[key].clientWidth) {
              if (totalWidth + children[key].clientWidth <= slide.clientWidth) {
                console.log(children[key].clientWidth);
                
                totalWidth += children[key].clientWidth;
                itemsPerPage += 1;
              }
            }
          }
        }
        setTotalPages(Math.ceil(slide.childElementCount / itemsPerPage));
        setPageWidth(totalWidth);
      }
    }
  }, [sliderData]);

  return { totalPages, pageNum, incrementPage, decrementPage, scrollAmt , jumpToPage };
};

export default useSliderData;
