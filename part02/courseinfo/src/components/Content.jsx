import React from 'react';
import Part from './Part';
const Content = ({ parts }) => {
  const total = parts.reduce((curr, acc) => curr + acc['exercises'], 0);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <h4>total of {total} exercises</h4>
    </div>
  );
};

export default Content;
