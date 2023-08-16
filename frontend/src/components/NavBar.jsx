import React from 'react';

const NavBar = ({ onHomeClick, showOriginal }) => {
  return (
    <div className="p-2 bg-gray-200 flex justify-center items-center">
      <button
        className={`bg-blue-500 text-white px-3 py-1 rounded ${
          showOriginal ? 'opacity-25 pointer-events-none' : 'hover:bg-blue-700'
        }`}
        onClick={onHomeClick}
        disabled={showOriginal}
      >
        Home
      </button>
    </div>
  );
};

export default NavBar;
