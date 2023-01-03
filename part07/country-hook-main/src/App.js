import { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
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

const useCountry = (name) => {
  console.log('🚀 ~ name', name);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );
      setCountry(data);
    };
    fetchCountry();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log('🚀 ~ country', country);
  if (!country) {
    return <div>not found...</div>;
  }
  const { name, population, capital, flags } = country[0];
  return (
    <div>
      <h3>{name.common}</h3>
      <div>population {population}</div>
      <div>capital {capital}</div>
      <img src={flags.png} height="100" alt={`flag of ${name.common}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
