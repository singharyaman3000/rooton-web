import { RefObject, useEffect, useState } from 'react';

const useSelectedTabPosition = (currentRef: RefObject<HTMLDivElement>) => {
  const [fromLeft, setFromLeft] = useState(0);

  useEffect(() => {
    if (currentRef.current) {
      setFromLeft(currentRef.current.offsetLeft + currentRef.current.offsetWidth / 2 - 12.5);
    }
  }, [currentRef.current]);

  return { fromLeft };
};

export default useSelectedTabPosition;
