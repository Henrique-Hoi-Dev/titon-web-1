import { useEffect, useState } from "react";
import { api, apiBingo } from "services/api";
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
        .then(() => {
          setData({ success: true });
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false))
        .finally(() => setFetch(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  return { data, error, isFetching };
};

export const useBingoDelete = (url, id, gameInstanceId, fetch, setFetch) => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.token

  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetch) {
      setIsFetching(true);
      apiBingo
      .delete(`${url}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          round_id: id,
          template_id: id,
          game_instance: gameInstanceId
        }
      })
        .then((res) => {
          setData({ success: true });
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false))
        .finally(() => setFetch(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  return { data, error, isFetching };
};
