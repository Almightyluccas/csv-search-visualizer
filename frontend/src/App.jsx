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
  const [error, setError] = useState(null); // State for tracking errors

  useEffect(() => {
    fetchDataFromApi();
  }, []);

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

  return (
    <div className="flex flex-col h-screen">
      <NavBar
        onHomeClick={handleHomeClick}
        showOriginal={showOriginal}
        columns={columns}
      />
      <div className="p-4">
        <Message searchCriteria={searchCriteria} error={error} />

      </div>

      <SearchBar onSearch={handleSearch} columns={columns}/>
      <DataTable columns={columns} data={data} onCellClick={handleCellClick}/>
    </div>
  );
};

export default App;
