import axios from "axios";

const {
  REACT_APP_API_DEFAULT,
  REACT_APP_BINGO_DEFAULT,
  REACT_APP_API_AUTH,
} = process.env;

export const api = axios.create({
  baseURL: REACT_APP_API_DEFAULT,
});

export const apiBingo = axios.create({
  baseURL: REACT_APP_BINGO_DEFAULT,
});

export const apiAuth = axios.create({
  baseURL: REACT_APP_API_AUTH,
});
