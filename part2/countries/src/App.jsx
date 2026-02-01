import { useState, useEffect } from 'react';
import getAllCountries from './services/countries';
import weatherService from './services/weather';

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

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(capital)
      .then((data) => {
        console.log('Weather data:', data);
        setWeather(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Weather fetch error:', err);
        setError('Could not load weather data');
      });
  }, [capital]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weather) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <img
        src={weatherService.getIconUrl(weather.weather[0].icon)}
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
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

    <Weather capital={country.capital[0]} />
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
