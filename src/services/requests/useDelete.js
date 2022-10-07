import { useEffect, useState } from "react";
import { api } from "services/api";
import { useSelector } from "react-redux";

export const useDelete = (url, id, fetch, setFetch) => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.token

  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetch) {
      setIsFetching(true);
      api
        .delete(`/${url}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setData({ successStatus: true, success: res?.data });
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false))
        .finally(() => setFetch(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  return { data, error, isFetching };
};

