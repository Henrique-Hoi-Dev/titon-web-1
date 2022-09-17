import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "services/api";

export const useCreate = (url, body, fetch, setFetch) => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.token

  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetch) {
      setIsFetching(true);
      api
        .post(`${url}`, body, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false))
        .finally(() => setFetch(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  return { data, error, isFetching };
};
