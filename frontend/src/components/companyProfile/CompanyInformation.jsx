import React from 'react';
import CompanyVideo from "./CompanyVideo";


const CompanyInformation = ({ darkMode, companyData, isLargeScreen }) => {
  const containerClasses = darkMode
    ? 'p-6 dark:bg-gray-800 border border-gray-700 rounded-lg shadow md:p-8 lg:w-1/2'
    : 'p-6 bg-white border border-gray-200 rounded-lg shadow md:p-8 lg:w-1/2';

  const textClasses = darkMode ? 'text-white' : 'text-gray-900';
  const dividerClasses = darkMode ? 'divide-gray-700' : 'divide-gray-100';
  const detailTextClasses = darkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className={containerClasses}>
      <CompanyVideo />
      <div className={`mt-6 border-t ${dividerClasses}`}>
        <dl className={`divide-y ${dividerClasses}`}>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Company Name</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>
              {companyData.company_name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Company Address</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>
              {companyData.company_address}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Company Website</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>
              {companyData.web}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>
              Number of Users from the Company
            </dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>
              {companyData.numberOfUsersInCompany}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default CompanyInformation;
