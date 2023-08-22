import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const NavBar = ({ darkMode, handleDarkModeToggle }) => {
  const location = useLocation();

  const handleTableLinkClick = () => {
    if (location.pathname === '/table') {
      window.location.reload();
    }
  };

  return (
    <>
      <div className={`sticky top-0 p-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} 
      flex justify-center items-center text-white`}>
        <Link
          to='/'
          className={`bg-blue-500 text-white px-3 py-1 rounded ml-2`}
        >
          Home
        </Link>
        <Link
          to='/table'
          className={`bg-blue-500 text-white px-3 py-1 rounded ml-2`}
          onClick={handleTableLinkClick} // Call the function on link click
        >
          Table
        </Link>
        <Link
          to='/visualization'
          className={`bg-blue-500 text-white px-3 py-1 rounded ml-2`}
        >
          Data Visualization
        </Link>

        <div className="flex items-center">
          <label className="flex items-center space-x-2 ml-3">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeToggle}
              className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className={`${darkMode ? 'text-white' : 'text-black'}`}>
              Dark Mode
            </span>
          </label>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
