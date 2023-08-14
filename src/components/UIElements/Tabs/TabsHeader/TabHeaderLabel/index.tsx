import React, { useEffect, useRef } from 'react';

const TabHeaderLabel = ({ service }: { service: string }) => {
  const targetElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targetElement = targetElementRef.current;

    if (!targetElement) return;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        const hasMutiText = mutation.target.textContent?.split(' ');
        console.log(hasMutiText, 'hi');
        if (mutation.type === 'characterData') {
          if (hasMutiText?.length === 1) {
            targetElement.classList.add('line-wrap-1');
          } else {
            targetElement.classList.add('line-wrap-2');
          }
        }
      }
    });

    observer.observe(targetElement, { characterData: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [targetElementRef.current]);

  return (
    <div
      ref={targetElementRef}
      className={`mt-[8px] text-lg not-italic leading-[normal] max-w-[130px] tracking-[normal] text-center`}
    >
      {service}
    </div>
  );
};

export default TabHeaderLabel;
