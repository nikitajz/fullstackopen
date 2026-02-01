import axios from 'axios';

const getAllCountries = () => {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

  return axios.get(`${baseUrl}/all`).then((response) => response.data);
};

export default getAllCountries;
