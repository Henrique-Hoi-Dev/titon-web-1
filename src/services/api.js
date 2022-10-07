import axios from "axios";

const {
  REACT_APP_API_USER_DEFAULT,
} = process.env;

export const api = axios.create({
  baseURL: REACT_APP_API_USER_DEFAULT,
});
