import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    Accept: 'application/json',
  },
});

export const fetchData = async (data_url) => {
  try {
    const endpoint = '/data/csv/search';
    const queryParams = {
      data_url,
    };
    const response = await api.get(endpoint, {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const queryData = async (data_url, search_criteria , search_parameter) => {
  try {
    const endpoint = '/data/csv/search';
    const queryParams = {
      data_url,
      search_criteria,
      search_parameter,
    };
    const response = await api.get(endpoint, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getChoroplethData = async (data_url) => {
  try {
    const queryParams = {
      data_url,
    };
    const response = await api.get('/data/csv/interactive-map', {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};