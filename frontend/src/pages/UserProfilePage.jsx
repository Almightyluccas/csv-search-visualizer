import React, { useState, useEffect } from 'react';
import UserInformation from "../components/userProfile/UserInformation";

const UserProfilePage = ({ darkMode }) => {
  const storedUserData = sessionStorage.getItem('singleRowData');
  const userData = storedUserData ? JSON.parse(storedUserData) : null;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isLargeScreen = screenWidth >= 2000;
  const customStyles = isLargeScreen ? { height: '95vh' } : {};

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  return (
    <div className="flex justify-center items-center" style={customStyles}>
      <UserInformation darkMode={darkMode} userData={userData} isLargeScreen={isLargeScreen} />
    </div>
  );
};

export default UserProfilePage;
