import React, {useEffect} from 'react';
import DataTable from '../components/table/DataTable';
import Message from '../components/table/Message';
import SearchBar from "../components/table/SearchBar";
import PaginationButtons from "../components/table/PaginationButtons";
import RowsPerPage from "../components/table/RowsPerPage";
import { useDataAndPagination} from '../hooks/TableHooks';

const TablePage = ({darkMode}) => {
  const {
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
    handleClickPage,
    handleSkip,
    pageRange,
    handleItemsPerPageChange,
  } = useDataAndPagination();

  useEffect(() => {
  fetchDataFromApi()
}, []);


  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    setCurrentPage(1);
  }, [itemsPerPage, data]);

  const customStyles = {
    height: '90vh'
   }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? '' : ''}`} style={customStyles}>
      <Message searchCriteria={searchCriteria} error={error} darkMode={darkMode} />
      <SearchBar onSearch={handleSearch} columns={columns} darkMode={darkMode}/>
      <div>
        <span>Number of Rows: {data.length}</span>
      </div>
      <DataTable
        columns={columns}
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
export default TablePage;
