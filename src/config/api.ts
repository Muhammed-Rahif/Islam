import axios from 'axios';

const QURAN_API_BASE_URL = 'https://api.quran.com/api/v4';

const quranApiInstance = axios.create({
  baseURL: QURAN_API_BASE_URL,
  timeout: 10000,
  params: {
    language: 'en',
  },
});

export { QURAN_API_BASE_URL, quranApiInstance };
