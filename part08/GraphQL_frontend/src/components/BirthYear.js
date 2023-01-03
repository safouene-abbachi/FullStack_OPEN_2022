import React, { useState } from 'react';
import { UPDATE_AUTHOR, All_AUTHORS } from '../queries';
import { useMutation, useQuery } from '@apollo/client';

const BirthYear = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const { data } = useQuery(All_AUTHORS);
  const [updateBirth] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: All_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();
    const setBornTo = Number(born);
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
          <select
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="">--Please choose an option--</option>
            {data.allAuthors.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
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
