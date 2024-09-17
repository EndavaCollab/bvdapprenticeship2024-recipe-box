import React from 'react';
import './Pagination.css';

const Pagination: React.FC = () => {
    return (
        <div className="pagination">
            <button>Prev</button>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <button>Next</button>
        </div>
    );
}

export default Pagination;
