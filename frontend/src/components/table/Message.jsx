import React from 'react';

const Message = ({ searchCriteria, error, darkMode }) => {
  return (
    <div className={`p-2 text-center ${darkMode ? 'dark:text-gray-200' : ''}`}>
      <p className={`text-2xl font-bold`}>
        {error ? (
          <span className="text-red-500">{error}</span>
        ) : searchCriteria ? (
          `${searchCriteria}`
        ) : (
          "Welcome to Luccas' .CSV Viewer"
        )}
      </p>
    </div>
  );
};

export default Message;