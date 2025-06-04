import { useEffect, useState } from 'react';
import { api_driver } from 'services/api';

export const useUpdateForgotPassword = (url, body, fetch, setFetch, token) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetch) {
      setIsFetching(true);
      api_driver
        .put(`/${url}`, body, {
          headers: { Authorization: `Bearer ${token}` }
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
