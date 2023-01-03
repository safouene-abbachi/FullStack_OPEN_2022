import React from 'react';

const Persons = ({ persons, handleDelete }) => {
  console.log('🚀 ~ persons', persons);
  return (
    <div>
      {persons.map(({ name, number, id }) => (
        <p key={id}>
          {name} {number}
          <button onClick={() => handleDelete(id, name)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
