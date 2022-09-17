import axios from "axios";

const {
  REACT_APP_API,
} = process.env;

export const api = axios.create({
  baseURL: REACT_APP_API,
});
