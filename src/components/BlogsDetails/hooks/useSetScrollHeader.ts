import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
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
        const intersectingHeaderId = entry.target.getAttribute('data-id') ?? '';
        const intersectingRef = refs.find((ref, index) => {
          return index === +intersectingHeaderId;
        });
        if (intersectingRef) {
          setState({ tag: +intersectingHeaderId, activeRef: intersectingRef });
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
  }, [refs]);

  return { unObserveTargets, observeTargets };
};

export default useSetScrollHeader;
