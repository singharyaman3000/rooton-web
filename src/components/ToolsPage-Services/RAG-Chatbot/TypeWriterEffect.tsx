import React, { useState, useEffect } from 'react';
import { sentences } from './constants';

const TypewriterEffect: React.FC = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < sentences[currentSentenceIndex].length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => {
          return prev + sentences[currentSentenceIndex][charIndex];
        });
        setCharIndex((prev) => {
          return prev + 1;
        });
      }, 100); // Typing speed
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => {
          return prev.slice(0, -1);
        });
        setCharIndex((prev) => {
          return prev - 1;
        });
      }, 40); // Deleting speed
    } else if (!isDeleting && charIndex === sentences[currentSentenceIndex].length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Delay before starting to delete
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentSentenceIndex((prev) => {
        return (prev + 1) % sentences.length;
      });
    }

    return () => {
      return clearTimeout(timeout);
    };
  }, [charIndex, isDeleting, currentSentenceIndex]);

  // Calculate the maximum height for the text
  const maxHeight = `${Math.max(
    ...sentences.map((sentence) => {
      return sentence.length;
    }),
  )}px`;

  return (
    <div style={{ height: maxHeight, overflow: 'hidden' }} className="hidden md:flex md:items-center">
      <p className=" font-semibold text-xl">{displayedText}</p>
    </div>
  );
};

export default TypewriterEffect;
