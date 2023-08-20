import React, {useState, useEffect, useMemo} from 'react';
import NavBar from '../components/NavBar';
import DataTable from '../components/table/DataTable';
import Message from '../components/table/Message';
import {fetchData} from '../api';
import SearchBar from "../components/table/SearchBar";
import PaginationButtons from "../components/table/PaginationButtons";
import RowsPerPage from "../components/table/RowsPerPage";

const TableView = () => {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [showOriginal, setShowOriginal] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [maxVisiblePages, setMaxVisiblePages] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
  setTotalPages(Math.ceil(data.length / itemsPerPage));
  setCurrentPage(1);
  }, [itemsPerPage, data]);


  useEffect(() => {

  }, [itemsPerPage]);

  useEffect(() => {
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
      setCurrentPage(1);
      setError(null);
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
      setError(newData.length === 0 ? 'No results found. Try Again' : null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  const handleNavTableClick = () => {
    setShowOriginal(true);
    setData(originalData);
    setSearchCriteria('');
    setError(null);
  };

  const handleClickPage = (page) => setCurrentPage(page);
  const handleSkip = (step) => setCurrentPage(Math.min(Math.max(currentPage + step, 1), totalPages));

  const pageRange = useMemo(() => {
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    const startPage = Math.max(Math.min(currentPage - halfMaxVisiblePages, totalPages - maxVisiblePages + 1), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    return Array.from({length: endPage - startPage + 1}, (_, index) => startPage + index);
  }, [currentPage, totalPages, maxVisiblePages]);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? '' : ''}`}>

      <NavBar
        onTableClick={handleNavTableClick}
        showOriginal={showOriginal}
        columns={columns}
        darkMode={darkMode}
      />
      <div className="p-4">
        <div className="flex justify-center p-4">
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
        <Message searchCriteria={searchCriteria} error={error} darkMode={darkMode}/>
      </div>


      <SearchBar onSearch={handleSearch} columns={columns} darkMode={darkMode}/>
      <div>
        <span>Number of Rows: {data.length}</span>
      </div>
      <DataTable columns={columns}
                 data={data}
                 onCellClick={handleCellClick}
                 currentPage={currentPage}
                 itemsPerPage={itemsPerPage}
                 maxVisiblePages={maxVisiblePages}
                 darkMode={darkMode}
      />
      <RowsPerPage
        itemsPerPageValue={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        darkMode={darkMode}
      />
      <div className="flex justify-center">
        <PaginationButtons
          currentPage={currentPage}
          handleClickPage={handleClickPage}
          handleCurrentPage={setCurrentPage}
          handleSkip={handleSkip}
          totalPages={totalPages}
          pageRange={pageRange}
          darkMode={darkMode}
        />
      </div>
      <div className="flex justify-end">
        <span  style={{ marginRight: '14vw' }}>Page {currentPage} out of {totalPages}</span>
      </div>

    </div>
  );
};
export default TableView;
