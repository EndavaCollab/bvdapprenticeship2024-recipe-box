import "./SearchBar.css";

interface SearchBarProps {
    setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
    return (
        <>
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button className="search-button">Add</button>
            </div>
        </>
    );
};

export default SearchBar;
