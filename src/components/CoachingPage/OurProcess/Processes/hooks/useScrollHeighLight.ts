import React, { RefObject, useEffect, useState } from 'react';

const APPROX_MOVER_HALF_HEIGHT = 32;

const useScrollHeighLight = ({
  isMobile,
  approxNavBarHeight,
  refs,
}: {
  isMobile: boolean;
  approxNavBarHeight: number;
  refs: RefObject<HTMLDivElement>[];
}) => {
  const [selectedElem, updateSelectELem] = useState('1');
  const [movableTop, setMovableTop] = useState('0');

  useEffect(() => {
    const handleScroll = () => {
      const divElems = refs;
      const visibleElems = divElems.filter((elems) => {
        if (elems.current) {
          const boundingTop = elems.current?.getBoundingClientRect().top ?? 0;
          return boundingTop - approxNavBarHeight > 0;
        }
        return false;
      });
      if (visibleElems.length > 0) {
        const nearestElem = visibleElems.reduce<React.RefObject<HTMLDivElement>>((prev, current) => {
          const prevElementTop = prev.current?.offsetTop ?? 0;
          const currentElementTop = current.current?.offsetTop ?? 0;
          return prevElementTop < currentElementTop ? prev : current;
        }, visibleElems[0]);

        if (nearestElem.current) {
          if (!isMobile) {
            const nearestElemTop = nearestElem.current?.offsetTop ?? 0;
            const nearesteElemHeight = nearestElem.current?.offsetHeight;
            const topValue = nearestElemTop + (nearesteElemHeight / 2 - APPROX_MOVER_HALF_HEIGHT);
            setMovableTop(`${topValue}px`);
          }

          updateSelectELem(nearestElem.current?.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [refs]);

  return { selectedElem, movableTop };
};

export default useScrollHeighLight;
