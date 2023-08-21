import React from 'react';
import NavBar from '../components/NavBar';
import DataTable from '../components/table/DataTable';
import Message from '../components/table/Message';
import SearchBar from "../components/table/SearchBar";
import PaginationButtons from "../components/table/PaginationButtons";
import RowsPerPage from "../components/table/RowsPerPage";
import { useDataAndPagination } from '../hooks/TableHooks';

const TableView = () => {
  const {
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
  } = useDataAndPagination();


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
