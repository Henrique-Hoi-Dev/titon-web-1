import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_USER_DEFAULT
});

export const api_driver = axios.create({
  baseURL: process.env.REACT_APP_API_DRIVER_DEFAULT
});
