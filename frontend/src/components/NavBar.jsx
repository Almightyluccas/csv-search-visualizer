import React from 'react';

const NavBar = ({ onTableClick, showOriginal, darkMode }) => {
  return (
    <div className={`p-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} 
    flex justify-center items-center text-white`}>
      <button
        className={`bg-blue-500 text-white px-3 py-1 rounded mr-2`}
        // onClick={}
        // disabled={}
      >
        Home
      </button>
      <button
        className={`bg-blue-500 text-white px-3 py-1 rounded ${
          showOriginal ? 'opacity-25 pointer-events-none' : 'hover:bg-blue-700'
        } ml-2`}
        onClick={onTableClick}
        disabled={showOriginal}
      >
        Table
      </button>
    </div>
  );
};

export default NavBar;
