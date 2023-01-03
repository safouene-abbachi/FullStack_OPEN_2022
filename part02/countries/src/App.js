import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;
function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCounty, setSelectedCountry] = useState('');
  const [weather, setWeather] = useState({});
  console.log('🚀 ~ countries', countries);

  const handleClick = (country) => {
    const { name } = country;
    setSelectedCountry(name?.common);
  };
  console.log('🚀 ~ weather', weather);
  const filtredCountries = useMemo(() => {
    const returnedCountries = countries.filter((country) =>
      country?.name?.common.toLowerCase().includes(search.toLowerCase())
    );
    console.log('🚀 ~ returnedCountries', returnedCountries);
    if (!search) {
      return [];
    }

    if (returnedCountries.length > 10) {
      return <p> Too many matches, specify another filter </p>;
    }
    if (returnedCountries.length <= 10 && returnedCountries.length > 1) {
      return returnedCountries.map((country) => (
        <div key={country?.name?.common}>
          <h2>
            {country?.name?.common}{' '}
            <button onClick={() => handleClick(country)}>show</button>
          </h2>
          {selectedCounty === country?.name?.common && (
            <div key={country?.name?.common}>
              <p>
                Capital: {country?.capital[0]}
                <br />
                area: {country?.area}
              </p>
              Languages :
              <ul>
                {Object.entries(country?.languages).map((lang) => (
                  <li key={lang[0]}>{lang[1]}</li>
                ))}
              </ul>
              <img
                width={300}
                height={300}
                src={country?.flags['svg']}
                alt={country?.name?.common}
              />
            </div>
          )}
        </div>
      ));
    }
    if (returnedCountries.length === 1) {
      const { latlng } = returnedCountries[0];

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${API_KEY}`
        )
        .then(({ data }) => {
          console.log('🚀 ~ response', data);

          setWeather({
            ...weather,
            celciusTemp: (data.main.temp - 273.15).toFixed(2),
            wind: data.wind.speed,
            icon: data.weather[0].icon,
          });
        })

        .catch((error) => {
          console.log('🚀 ~ error', error);
        });
      return returnedCountries.map((country) => (
        <div key={country?.name?.common}>
          <h2>{country?.name?.common}</h2>
          <p>
            Capital: {country?.capital[0]}
            <br />
            area: {country?.area}
          </p>
          Languages :
          <ul>
            {Object.entries(country?.languages).map((lang) => (
              <li key={lang[0]}>{lang[1]}</li>
            ))}
          </ul>
          <img
            width={300}
            height={300}
            src={country?.flags['svg']}
            alt={country?.name?.common}
          />
          <h1>Weather in {country?.capital[0]}</h1>
          <p>temperature {weather['celciusTemp']} celcius</p>
          <img
            src={`http://openweathermap.org/img/w/${weather['icon']}.png`}
            alt="weather icon"
          />
          <p>Wind {weather['wind']} m/s</p>
        </div>
      ));
    }
  }, [countries, search, selectedCounty]);
  console.log('🚀 ~ filtredCountries', filtredCountries);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>Find countries</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>{filtredCountries}</div>
    </div>
  );
}

export default App;
