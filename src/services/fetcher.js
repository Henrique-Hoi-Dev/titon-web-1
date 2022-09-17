import { api } from "./api";

export const fetcher = async (url, params, token) => {
  const res = await api
    .get(url, { params, headers: { Authorization: `bearer ${token}` } })
    .then((res) => res.data);
  return await res;
};
