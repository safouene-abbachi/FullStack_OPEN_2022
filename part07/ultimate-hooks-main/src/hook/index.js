import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // ...

  const getAll = async () => {
    const { data } = await axios.get(baseUrl);
    setResources(data);
  };

  const create = async (resource) => {
    // ...
    const { data } = await axios.post(baseUrl, resource);
    setResources((prevState) => [...prevState, data]);
  };

  const service = {
    getAll,
    create,
  };

  return [resources, service];
};
