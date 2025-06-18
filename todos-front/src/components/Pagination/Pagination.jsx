import React from 'react';
import './style.css';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) {
  // Create array with all page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      {/* Previous button */}
      <button 
        className="pagination-button" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      
      {/* Page numbers */}
      <div className="pagination-numbers">
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
      
      {/* Next button */}
      <button 
        className="pagination-button" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}