import React from 'react';

const RowsPerPage = ({ itemsPerPageValue, handleItemsPerPageChange, darkMode }) => {
  return (
    <div className={`items-per-page flex justify-end ${darkMode ? 'dark:text-gray-200' : ''}`} style={{ marginRight: '14vw' }}>
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
  );
};

export default RowsPerPage;
