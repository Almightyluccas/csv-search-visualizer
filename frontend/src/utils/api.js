import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    Accept: 'application/json',
  },
});

export const fetchData = async (column = '', value = '') => {
  try {
    const params = column && value ? {
      search_criteria: column,
      search_parameter: value,
    } : {};

    const response = await api.get('/data/csv/search', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
