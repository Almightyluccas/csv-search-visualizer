import React from 'react';
import { userDefaultImage } from "../../assets/assets";

const UserImage = ({ darkMode, size }) => {
  let imageSizeClass;

  if (size === "small") {
    imageSizeClass = "w-12 h-12";
  } else if (size === "medium") {
    imageSizeClass = "w-16 h-16";
  } else if (size === "large") {
    imageSizeClass = "w-48 h-48";
  } else {
    imageSizeClass = "";
  }
  return (
    <div className={`p-2 flex justify-center ${darkMode ? 'dark:text-gray-200' : ''}`}>
      <img className={imageSizeClass} src={userDefaultImage} alt={`Default User Image`} />
    </div>
  );
};

export default UserImage;
