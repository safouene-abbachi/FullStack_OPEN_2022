import React from 'react';
import Header from './Header';
import Content from './Content';
const Course = ({ course: { id, name, parts } }) => {
  console.log(parts);
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
    </div>
  );
};

export default Course;
