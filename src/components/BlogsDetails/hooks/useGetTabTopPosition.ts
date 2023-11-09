import { RefObject, useEffect, useState } from 'react';

const useGetTabTopPosition = (currentRef: RefObject<HTMLSpanElement>) => {
  const [fromTop, setFromTop] = useState(0);

  useEffect(() => {
    if (currentRef?.current) {
      const parentDiv = document.getElementById('tab-parent-div') as HTMLDivElement;
      const parentY = parentDiv.getBoundingClientRect().top;
      const spanY = currentRef.current.getBoundingClientRect().top + currentRef.current.offsetHeight / 2 - 20;
      setFromTop(spanY - parentY);
    }
  }, [currentRef?.current]);

  return { fromTop };
};

export default useGetTabTopPosition;
