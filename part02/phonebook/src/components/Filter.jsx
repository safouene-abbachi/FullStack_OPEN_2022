import React from 'react';

const Filter = ({ searchField, handleSearch }) => {
  return (
    <div>
      <input value={searchField} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
