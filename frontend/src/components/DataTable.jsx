import React from 'react';

const DataTable = ({ columns, data, onCellClick}) => {
  return (
    <div className="overflow-x-auto mx-0.5">
      <div className="py-2 inline-block min-w-full px-2">
        <div className="flex justify-center items-center max-h-[50vh] overflow-y-scroll">
          <table className="w-full max-w-screen-md">
            <thead className="sticky top-0 bg-gray-200 border-b z-10">
              <tr>
                {columns.map((columnName, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left"
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((entry, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100`}
                >
                  {columns.map((columnName, columnIndex) => (
                    <td
                      key={columnIndex}
                      className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={() => onCellClick(entry[columnName], columnName)}
                    >
                      {entry[columnName]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
