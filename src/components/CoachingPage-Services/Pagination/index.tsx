/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

// Define the prop types if you're using TypeScript
type PaginationProps = {
  pageCount: number;
  currentPage: number;
// eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
};

const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  if (!Number.isInteger(pageCount) || pageCount < 1) {
    console.error('Invalid pageCount:', pageCount);
    return null;
  }

  return (
    <div className='paginationContainer1'>
      {[...Array(pageCount)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <span
            key={pageNumber}
            className={`dot45 ${currentPage === index ? 'active' : ''}`}
            onClick={() => onPageChange(index)}
          />
        );
      })}
    </div>
  );
};

export default Pagination;
