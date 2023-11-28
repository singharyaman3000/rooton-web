import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { SelectedTagType } from '../NavigationPanel';

const useSetScrollHeader = (refs: RefObject<HTMLElement>[], setState: Dispatch<SetStateAction<SelectedTagType>>) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const options = {
    root: null,
    rootMargin: '25% 0px -25% 0px',
    threshold: 1,
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const intersectingHeaderText = entry.target.getAttribute('data-id') ?? '';        
        const intersectingRef = refs.find((ref, index) => {
          console.log(index);
          return index === +intersectingHeaderText;
        });
// console.log(intersectingRef);

        if (intersectingRef) {
          setState({ tag: +intersectingHeaderText, activeRef: intersectingRef });
        }
      }
    });
  };

  const unObserveTargets = () => {
    const allHeadingsNodelist = document?.querySelectorAll('heading');
    return allHeadingsNodelist?.forEach((heading) => {
      if (observerRef.current) observerRef.current.unobserve(heading);
    });
  };

  // eslint-disable-next-line no-undef
  const observeTargets = () => {
    const allHeadingsNodelist = document?.querySelectorAll('heading');
    return allHeadingsNodelist?.forEach((heading) => {
      if (observerRef.current) observerRef.current.observe(heading);
    });
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, options);
    observeTargets();

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { unObserveTargets, observeTargets };
};

export default useSetScrollHeader;
