import React, { useState, useMemo, useEffect } from 'react';
import PaginationButtons from "./PaginationButtons";

const DataTable = ({ columns, data, onCellClick, itemsPerPage, maxVisiblePages, darkMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageValue, setItemsPerPageValue] = useState(itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset current page when itemsPerPageValue changes
  }, [itemsPerPageValue]);

  const totalPages = Math.ceil(data.length / itemsPerPageValue);

  const handleClickPage = (page) => setCurrentPage(page);
  const handleSkip = (step) => setCurrentPage(Math.min(Math.max(currentPage + step, 1), totalPages));

  const startIndex = (currentPage - 1) * itemsPerPageValue;
  const visibleData = data.slice(startIndex, startIndex + itemsPerPageValue);

  const pageRange = useMemo(() => {
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    const startPage = Math.max(Math.min(currentPage - halfMaxVisiblePages, totalPages - maxVisiblePages + 1), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }, [currentPage, totalPages, maxVisiblePages]);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPageValue(newItemsPerPage);
  };

  return (
    <div className={`overflow-x-auto mx-0.5 ${darkMode ? 'dark:bg-gray-800' : ''}`}>
      <div className={`py-2 inline-block min-w-full px-2 ${darkMode ? 'dark:text-gray-200' : ''}`}>
        <div className={`flex justify-center items-center max-h-[80vh] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`table-container ${darkMode ? 'shadow-xl' : 'shadow-lg'}`}>
            <table className={`w-full max-w-screen-md ${darkMode ? 'dark:bg-gray-800' : ''}`}>
              <thead className={`sticky top-0 ${darkMode ? 'dark:bg-gray-800' : 'bg-gray-200'} border-b z-10`}>
              <tr>
                {columns.map((columnName, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`text-sm font-medium ${darkMode ? 'dark:text-gray-200' : 'text-gray-900'} px-6 py-3 text-left`}
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {visibleData.map((entry, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ${darkMode ? 'dark:bg-gray-700' : ''}`}
                >
                  {columns.map((columnName, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={`text-sm ${darkMode ? 'dark:text-gray-200' : 'text-gray-900'} font-light px-6 py-4 whitespace-nowrap cursor-pointer`}
                      onClick={() => onCellClick(entry[columnName], columnName)}
                    >
                      {entry[columnName]}
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={`flex justify-center mt-4 ${darkMode ? 'dark:text-gray-200' : ''}`}>

          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            handleClickPage={handleClickPage}
            handleCurrentPage={setCurrentPage}
            handleSkip={handleSkip}
            pageRange={pageRange}
            darkMode={darkMode}
          />
        </div>
        <div className={`items-per-page flex justify-end ${darkMode ? 'dark:text-gray-200' : ''}`} style={{ marginRight: '15vw' }}>
          <span className="mr-2">Rows per page:</span>
          <select
            className={`items-per-page-select ${darkMode ? 'dark:bg-gray-800' : ''}`}
            value={itemsPerPageValue}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
