import React from 'react';
import DatasetSelector from "../components/home/DatasetSelector";

const HomePage = ({ darkMode }) => {
  const customStyles = {
    height: '90vh'
   }
  return (
    <div className="flex justify-center" style={customStyles}>
      <DatasetSelector darkMode={darkMode} />
    </div>
  );
};

export default HomePage;
