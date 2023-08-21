import {useState, useEffect, useMemo} from 'react';
import {fetchData} from "../utils/api";

export function useDataAndPagination() {
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
  return {
    originalData,
    data,
    columns,
    showOriginal,
    searchCriteria,
    error,
    setCurrentPage,
    currentPage,
    itemsPerPage,
    maxVisiblePages,
    totalPages,
    darkMode,
    fetchDataFromApi,
    handleCellClick,
    handleSearch,
    handleNavTableClick,
    handleClickPage,
    handleSkip,
    pageRange,
    handleItemsPerPageChange,
    handleDarkModeToggle,
  };
}
