import React from 'react';
import { useNavigate } from 'react-router-dom';

const DatasetSelector = ({ darkMode }) => {
  const navigate = useNavigate() ;
  const handleDatasetProvidedClick = () => {
    sessionStorage.clear()
    navigate('/table') ;
  };
  const handleOtherDatasetsClick = () => {
    sessionStorage.setItem('csvUrl', 'https://raw.githubusercontent.com/curran/data/gh-pages/all/cdc_mortality_mortality_underyling_cause_by_years.csv');
    navigate('/table') ;
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`bg-white dark:bg-gray-800 shadow-xl rounded-lg p-10 space-y-8 text-center 
      ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <h1 className="text-3xl font-bold">Welcome to Luccas' CSV Viewer</h1>
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
          <button
            onClick={handleDatasetProvidedClick}
            className={`bg-blue-500 hover:bg-blue-700 text-white px-8 py-4 rounded-lg w-full 
            ${darkMode ? 'bg-opacity-70' : ''}`}
          >
            Dataset Provided
          </button>
          {/*<button*/}
          {/*  onClick={handleOtherDatasetsClick}*/}
          {/*  className={`bg-red-400 hover:bg-red-700 text-white px-8 py-4 rounded-lg w-full */}
          {/*  ${darkMode ? 'bg-opacity-70' : ''}`}*/}
          {/*>*/}
          {/*  Other Datasets / Manual Upload*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  );
};

export default DatasetSelector;
