import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { SelectedTagType } from '../NavigationPanel';

const useSetScrollHeader = (
  target: string,
  refs: RefObject<HTMLElement>[],
  setState: Dispatch<SetStateAction<SelectedTagType>>,
) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [observe, setObserve] = useState<boolean>(false);
  const allHeadings = document?.querySelectorAll(target);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const options = {
    root: null,
    rootMargin: `0px 0px -${window.innerHeight / 2}px 0px`,
    threshold: 1.0,
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry,index) => {
      if (entry.isIntersecting) {
        const intersectingHeaderText = entry.target.textContent ?? '';
        const intersectingRef = refs.find((ref) => {
          return ref.current?.textContent === intersectingHeaderText;
        });

        if (intersectingRef && observe) {
          setState({ tag: { label: intersectingHeaderText, id: index }, activeRef: intersectingRef });
        }
      }
    });
  };

  observerRef.current = new IntersectionObserver(handleObserver, options);

  const unObserveTargets = () => {
    setObserve(false);
    return allHeadings.forEach((heading) => {
      if (observerRef.current) observerRef.current.unobserve(heading);
    });
  };

  const observeTargets = () => {
    setObserve(true);
    return allHeadings.forEach((heading) => {
      if (observerRef.current) observerRef.current.observe(heading);
    });
  };

  const onScrollStart = () => {
    setIsScrolling(true);
  };

  const onScrollEnd = () => {
    setIsScrolling(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollStart);
    window.addEventListener('scrollend', onScrollEnd);
    observeTargets();
    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', onScrollStart);
      window.removeEventListener('scrollend', onScrollEnd);
    };
  }, []);

  return { isScrolling, unObserveTargets, observeTargets };
};

export default useSetScrollHeader;
