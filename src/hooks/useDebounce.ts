/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

const useDebounce = (cb: () => void, delay: number, dependencies: any[]) => {
  const shouldRunEffect = useRef(false);

  useEffect(() => {
    let timer: any;
    if (shouldRunEffect.current) {
      timer = setTimeout(() => {
        cb();
      }, delay);
    } else shouldRunEffect.current = true;

    return () => {
      clearTimeout(timer);
    };
  }, dependencies);
};

export default useDebounce;
