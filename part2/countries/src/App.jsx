import { useState, useEffect } from 'react';
import getAllCountries from './services/countries';

const api_key = import.meta.env.VITE_SOME_KEY;

const TooManyMatches = () => <div>Too many matches, refine the filter</div>;

const Button = ({ country, onClick }) => (
  <button onClick={() => onClick(country)}>Show</button>
);

const Country = ({ country, onClick }) => (
  <li>
    {country.name.common} <Button country={country} onClick={onClick} />
  </li>
);

const CountriesList = ({ countries, onClick }) => {
  return (
    <div>
      <ul>
        {countries.map((country) => (
          <Country
            key={country.name.common}
            country={country}
            onClick={onClick}
          />
        ))}
      </ul>
    </div>
  );
};

const CountryDetails = ({ country }) => (
  <div>
    <h2>
      {country.name.common}{' '}
      <img
        src={country.flags.png}
        alt={country.name.common}
        style={{ width: '30px', height: 'auto' }}
      />
    </h2>

    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area}</p>
    <h3>Languages:</h3>
    <ul>
      {Object.values(country.languages).map((lang) => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    getAllCountries().then((data) => {
      console.log('Countries', data);

      setCountriesList(data);
    });
  }, []);

  const onCountryChange = (event) => {
    const searchQuery = event.target.value;
    console.log(searchQuery);

    const filteredCountries = countriesList.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    console.log('Selected countries:', filteredCountries);

    setSelectedCountries(filteredCountries);
  };

  const onCountryClick = (country) => {
    setSelectedCountries([country]);
  };

  return (
    <div>
      find countries <input type="text" onChange={onCountryChange} />
      {selectedCountries.length > 10 ? (
        <TooManyMatches />
      ) : selectedCountries.length === 1 ? (
        <CountryDetails country={selectedCountries[0]} />
      ) : (
        <CountriesList countries={selectedCountries} onClick={onCountryClick} />
      )}
    </div>
  );
};

export default App;
