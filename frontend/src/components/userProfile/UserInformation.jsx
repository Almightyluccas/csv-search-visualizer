import React from 'react';
import UserImage from "./UserImage";

const UserInformation = ({darkMode, userData, isLargeScreen}) => {
  const containerClasses = darkMode
    ? 'p-6 dark:bg-gray-800 border border-gray-700 rounded-lg shadow md:p-8 lg:w-1/2'
    : 'p-6 bg-white border border-gray-200 rounded-lg shadow md:p-8 lg:w-1/2';

  const textClasses = darkMode ? 'text-white' : 'text-gray-900';
  const dividerClasses = darkMode ? 'divide-gray-700' : 'divide-gray-100';
  const headerClasses = darkMode ? 'text-gray-400' : 'text-gray-500';
  const detailTextClasses = darkMode ? 'text-gray-300' : 'text-gray-700';

  const imageSize = isLargeScreen ? 'large' : '';


  return (
    <div className={containerClasses}>
      <div className="px-4 sm:px-0">
        <UserImage darkMode={darkMode} size={imageSize}/>
        <h3
          className={`text-base font-semi-bold leading-7 ${textClasses}`}>{`${userData.first_name} ${userData.last_name[0]}.`}</h3>
        <p className={`mt-1 max-w-2xl text-sm leading-6 ${headerClasses}`}>Personal Details</p>
      </div>
      <div className={`mt-6 border-t ${dividerClasses}`}>
        <dl className={`divide-y ${dividerClasses}`}>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Full name</dt>
            <dd
              className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{`${userData.first_name} ${userData.last_name}`}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Phone 1</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{userData.phone1}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Phone 2</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{userData.phone2}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Email</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{userData.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>City</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{userData.city}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>County</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{userData.county}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>State</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{userData.state}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>ZIP</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{userData.zip}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Employer name</dt>
            <dd
              className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{userData.company_name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Employer address</dt>
            <dd
              className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{`${userData.address}`}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className={`text-sm font-medium leading-6 ${textClasses}`}>Employer website</dt>
            <dd className={`mt-1 text-sm leading-6 ${detailTextClasses} sm:col-span-2 sm:mt-0`}>{userData.web}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default UserInformation;
