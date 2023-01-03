import React, { useState } from 'react';
import { UPDATE_AUTHOR, All_AUTHORS } from '../queries';
import { useMutation } from '@apollo/client';

const BirthYear = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [updateBirth] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: All_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();
    const setBornTo = +born;
    updateBirth({ variables: { name, setBornTo } });
    setName('');
    setBorn('');
  };
  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYear;
