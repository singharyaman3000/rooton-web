import React, { useEffect } from 'react';

type RefElement = HTMLDivElement | null;

const useScrollToBottom = (ref: React.MutableRefObject<RefElement>, dependencies: React.DependencyList) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
    }
  }, [ref.current, ...dependencies]);
};

export default useScrollToBottom;
