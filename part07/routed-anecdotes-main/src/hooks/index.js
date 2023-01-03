import { useState } from 'react';

export const useField = (name) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setValue('');
  };

  return {
    name,
    value,
    onChange,
    handleReset,
  };
};
