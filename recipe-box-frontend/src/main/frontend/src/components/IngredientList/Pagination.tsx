import React from 'react';
import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, totalItems, setCurrentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="pagination">
            <button
                onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                }}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <span
                    key={index + 1}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => setCurrentPage(index + 1)}
                    aria-hidden="true"
                >
                    {index + 1}
                </span>
            ))}
            <button
                onClick={() => {
                    if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                    }
                }}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
