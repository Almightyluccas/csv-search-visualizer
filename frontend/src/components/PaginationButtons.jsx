import React from 'react';

const PaginationButtons = ({
                             currentPage,
                             totalPages,
                             handleClickPage,
                             handleCurrentPage,
                             handleSkip,
                             pageRange,
                             darkMode,
                           }) => {


const paginationButton = (text, onClick, disabled = false, extraClass = '', isCurrentPage = false) => {
  const baseClasses = `pagination-item ${disabled ? 'disabled' : 'bg-gray-300 hover:bg-gray-500'} text-gray-800 dark:text-gray-200 font-bold py-2 px-4 ${disabled ? '' : 'cursor-pointer'} ${extraClass}`;
  const darkModeClasses = `dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300`;

  // Check if the button represents the current page and dark mode is enabled
  const isCurrentPageAndDarkMode = isCurrentPage && darkMode;

  // Add the 'dark:bg-gray-900' class if the button is the current page number
  const currentBgClass = isCurrentPage ? 'bg-gray-900' : '';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${currentBgClass} ${isCurrentPageAndDarkMode ? 'dark:bg-gray-900' : ''} ${darkMode ? darkModeClasses : ''}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

  // Make sure to start user at page one of table and also move paginationButtons to App.jsx
  // also move the Rowes Per page to anotehr component and put that in App.jsx
  // maybe remove clicking on the name to filter by it if it messes up first_name and company_name implementation
  // mention in read me that i tested with other datasets if found online that were csv and they still worked
  const renderPaginationButtons = () => {
    const buttons = [];

    if (currentPage !== 1) {
      buttons.push(
        paginationButton('««', () => handleCurrentPage(1), false, 'rounded-l'),
        paginationButton('«', () => handleSkip(-5), false),
        paginationButton('Prev', () => handleClickPage(currentPage - 1))
      );
    }

    pageRange.forEach((page) => {
      buttons.push(
        paginationButton(page, () => handleClickPage(page), page === currentPage, page === currentPage ? 'active bg-blue-500 border-blue-500' : '')
      );
    });

    if (currentPage !== totalPages) {
      buttons.push(
        paginationButton('Next', () => handleClickPage(currentPage + 1)),
        paginationButton('»', () => handleSkip(5), currentPage >= totalPages - 5),
        paginationButton('»»', () => handleCurrentPage(totalPages), false, 'rounded-r')
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      {renderPaginationButtons()}
    </div>
  );
};

export default PaginationButtons;
