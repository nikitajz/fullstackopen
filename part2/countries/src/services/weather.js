import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = (city) => {
  return axios
    .get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => response.data);
};

const getIconUrl = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export default { getWeather, getIconUrl };
