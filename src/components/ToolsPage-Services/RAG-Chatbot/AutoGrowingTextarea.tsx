/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface AutoGrowingTextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const AutoGrowingTextarea: React.FC<AutoGrowingTextareaProps> = ({ value, onChange, onKeyDown }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset the height to auto to correctly calculate the scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height to the scrollHeight plus some offset to avoid scroll bars
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      rows={1} // Initial rows to start with a single line
      placeholder="Type your message..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={{
        width: '100%',
        maxHeight: '6rem', // Maximum height before it becomes scrollable
        marginRight: '0.5rem',
        backgroundColor: 'white',
        padding: '8px',
        boxSizing: 'border-box',
        overflow: 'auto', // Allow scrolling
        whiteSpace: 'pre-wrap', // Preserve whitespace formatting
        fontFamily: 'monospace', // Use a monospace font for better alignment
      }}
      className="active:outline-none focus-visible:outline-none focus:outline-none"
    />
  );
};

export default AutoGrowingTextarea;
