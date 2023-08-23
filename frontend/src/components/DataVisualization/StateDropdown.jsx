import React from 'react';

const StateDropdown = ({ states, onSelectState }) => {
  return (
    <select onChange={onSelectState}>
      <option value="">Select a state</option>
      {states.map(state => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>
  );
};

export default StateDropdown;
