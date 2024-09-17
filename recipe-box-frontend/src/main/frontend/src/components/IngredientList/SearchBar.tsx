import React from 'react';
import './SearchBar.css';

const SearchBar: React.FC = () => {
    return (
        <div className="search-bar">
            <input className="search-input" type="text" placeholder="Search..." />
            <button className="search-button">Add</button>
        </div>
    );
}

export default SearchBar;
