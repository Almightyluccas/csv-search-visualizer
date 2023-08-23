import {useState, useMemo} from 'react';
import {fetchData, queryData} from "../utils/api";
import { useNavigate } from 'react-router-dom';

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

  const csvUrl = sessionStorage.getItem('csvUrl') || 'https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/us-500.csv';
  const navigate = useNavigate() ;
  const fetchDataFromApi = async () => {

    try {
      const fetchedData = await fetchData(csvUrl);
      setOriginalData(fetchedData);
      setData(fetchedData);
      setColumns(Object.keys(fetchedData[0]));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const navigateToProfile = (data) => {
    const singleRowData = data[0];
    sessionStorage.setItem('singleRowData', JSON.stringify(singleRowData));
    const userId = `${singleRowData.first_name}_${singleRowData.last_name}`;
    navigate(`/profile/${userId}`);
  }
 const navigateToCompany = (data) => {
  const singleRowData = data[0];
  sessionStorage.setItem('singleRowData', JSON.stringify(singleRowData));

  const companyNameWithHyphens = singleRowData.company_name.replace(/\s+/g, '').replace(',','');
  navigate(`/company/${companyNameWithHyphens}`);
}


  const handleCellClick = async (value, column) => {
    if (showOriginal) {
      setShowOriginal(false);
    }
    try {
      const newData = await queryData(csvUrl, column, value);
      if (column === 'company_name') {
          navigateToCompany(newData)
          return
       } else if(newData.length === 1) {
         navigateToProfile(newData)
         return
       }
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
      const newData = await queryData(csvUrl, column, value);
       if (column === 'company_name') {
          navigateToCompany(newData)
          return
       } else if(newData.length === 1) {
         navigateToProfile(newData)
         return
       }

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

  return {
    originalData,
    setData,
    data,
    columns,
    showOriginal,
    searchCriteria,
    error,
    setCurrentPage,
    currentPage,
    itemsPerPage,
    maxVisiblePages,
    setTotalPages,
    totalPages,
    fetchDataFromApi,
    handleCellClick,
    handleSearch,
    handleNavTableClick,
    handleClickPage,
    handleSkip,
    pageRange,
    handleItemsPerPageChange,

  };
}
