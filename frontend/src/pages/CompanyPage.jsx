import React, { useEffect, useState } from 'react';
import { queryData } from '../utils/api';
import CompanyInformation from "../components/companyProfile/CompanyInformation";

const CompanyPage = ({ darkMode }) => {
  const sessionUserData = sessionStorage.getItem('singleRowData');
  const userData = sessionUserData ? JSON.parse(sessionUserData) : null;

  const [screensWidth, setScreensWidth] = useState(window.innerWidth);
  const [numberOfUsersInCompany, setNumberOfUsersInCompany] = useState(0); // Initialize with 0

  const isLargeScreen = screensWidth >= 2000;
  const customStyles = isLargeScreen ? { height: '95vh' } : {};

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreensWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  const csvUrl =
    sessionStorage.getItem('csvUrl') ||
    'https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/us-500.csv';

  useEffect(() => {
    const fetchData = async () => {
      const data = await queryData(csvUrl, 'company_name', userData.company_name);
      setNumberOfUsersInCompany(data.length);
    };

    fetchData();
  }, [csvUrl, userData.company_name]);

  const companyInfo = {
    company_name: userData.company_name,
    company_address: userData.address,
    web: userData.web,
    numberOfUsersInCompany: numberOfUsersInCompany,
  };

  console.log(companyInfo);

  return (
    <div className="flex justify-center items-center" style={customStyles}>
      <CompanyInformation darkMode={darkMode} companyData={companyInfo} />
    </div>
  );
};

export default CompanyPage;
