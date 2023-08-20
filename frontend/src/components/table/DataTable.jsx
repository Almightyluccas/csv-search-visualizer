import React, {useState, useMemo, useEffect} from 'react';
import PaginationButtons from "./PaginationButtons";

const DataTable = ({columns, data, onCellClick, currentPage, itemsPerPage, darkMode}) => {

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = data.slice(startIndex, startIndex + itemsPerPage);

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
      </div>
    </div>
  );
};

export default DataTable;
