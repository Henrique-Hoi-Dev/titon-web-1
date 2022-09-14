import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api, apiBingo } from "services/api";

export const useUpdate = (url, body, id, fetch, setFetch) => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.token
  
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (fetch) {
      setIsFetching(true);
      api
        .put(`/${url}/${id}`, body, {
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
}

export const useBingoUpdate = (url, body, id, fetch, setFetch) => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.token

  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (fetch) {
      setIsFetching(true);
      apiBingo
        .put(`${url}`, body, {
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