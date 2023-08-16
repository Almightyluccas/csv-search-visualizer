import React, { useState } from 'react';

const SearchBar = ({ onSearch, columns}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, searchCriteria);
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="bg-white text-gray-900 px-2 py-1 rounded shadow-sm focus:ring focus:ring-blue-300 mr-2"
        >
          <option value="">Select a column</option>
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white text-gray-900 px-3 py-1 rounded shadow-sm focus:ring focus:ring-blue-300 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
