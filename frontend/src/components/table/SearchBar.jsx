import React, { useState } from 'react';

const SearchBar = ({ onSearch, columns, darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, searchCriteria);
  };

  return (
    <div className={`mt-9 flex items-center justify-center mb-4 ${darkMode ? 'dark:bg-gray-800 dark:text-gray-200' : ''}`}>
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className={`bg-white text-gray-900 dark:text-white px-2 py-1 rounded shadow-sm focus:ring focus:ring-blue-300 mr-2 ${darkMode ? 'dark:bg-gray-700' : 'bg-white'}`}
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
          className={`bg-white text-gray-900 dark:text-white px-3 py-1 rounded shadow-sm focus:ring focus:ring-blue-300 mr-2 
          ${darkMode ? 'dark:bg-gray-700 dark:text-gray-200' : 'bg-white'}`}
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 ${darkMode ? 'dark:bg-gray-600 dark:text-gray-200' : ''}`}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
