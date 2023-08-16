import React from 'react';

const Message = ({ searchCriteria, error }) => {
  return (
    <div className={`p-2  text-center`}>
      <p className={`text-2xl font-bold `}>
        {error ? (
          <span className="text-red-500">{error}</span>
        ) : searchCriteria ? (
          `${searchCriteria}`
        ) : (
          "Welcome to Luccas' CSV visualizer"
        )}
      </p>
    </div>
  );
};

export default Message;
