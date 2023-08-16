import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import DataTable from './components/DataTable';
import Message from './components/Message';
import { fetchData } from './api';
import SearchBar from "./components/SearchBar";

const App = () => {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [showOriginal, setShowOriginal] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    // Apply dark mode styles to the entire app
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchDataFromApi = async () => {
    try {
      const fetchedData = await fetchData();
      setOriginalData(fetchedData);
      setData(fetchedData);
      setColumns(Object.keys(fetchedData[0]));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleCellClick = async (value, column) => {
    if (showOriginal) {
      setShowOriginal(false);
    }

    try {
      const newData = await fetchData(column, value);
      setData(newData);
      setSearchCriteria(`Search results for ${column}: ${value}`);
      setError(null); // Clear error state when new data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async (value, column) => {
    try {
      const newData = await fetchData(column, value);
      setData(newData);
      setSearchCriteria(`Search results for ${column}: ${value}`);
      setShowOriginal(false);
      setError(newData.length === 0 ? 'No results found. Try Again' : null); // Set error message if no results
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  const handleHomeClick = () => {
    setShowOriginal(true);
    setData(originalData);
    setSearchCriteria('');
    setError(null); // Clear error state when going back to home
  };

const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`}>
      <NavBar
        onHomeClick={handleHomeClick}
        showOriginal={showOriginal}
        columns={columns}
        darkMode={darkMode}
      />
      <div className="p-4">
        <Message
          searchCriteria={searchCriteria}
          error={error}
          darkMode={darkMode}
        />
      </div>

      <div className="flex justify-end p-4">
        <label className="flex items-center space-x-2">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
          />
        </label>
      </div>

      <SearchBar onSearch={handleSearch}
                 columns={columns}
                 darkMode={darkMode}
      />
      <DataTable columns={columns}
                 data={data}
                 onCellClick={handleCellClick}
                 itemsPerPage={15}
                 maxVisiblePages={4}
                 darkMode={darkMode}
      />
    </div>
  );
};
export default App;
