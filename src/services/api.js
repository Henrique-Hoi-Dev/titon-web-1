import axios from "axios";

const {
  REACT_APP_API_USER_DEFAULT,
  REACT_APP_API_DRIVER_DEFAULT,
} = process.env;

export const api = axios.create({
  baseURL: REACT_APP_API_USER_DEFAULT,
});

export const apiDriver = axios.create({
  baseURL: REACT_APP_API_DRIVER_DEFAULT,
});
