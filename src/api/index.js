import axios from 'axios';

const url = 'http://localhost:5000/accounts/';

export const fetchCurrency = (currencies) => axios.get(url + currencies);
export const fetchLatestRates = (latestRates, lang) => axios.get(url + latestRates, { params: { lang } });
export const fetchDailyRates = (dailyRates, params) => axios.get(url + dailyRates, { params: params });