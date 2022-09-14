import { useEffect, useState } from "react";
import { api } from "../api";

export const useValidateToken = (token) => {

  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      setIsFetching(true);
      api
        .get("/auth/token/validate", {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
          localStorage.setItem("tokenNgt", token);
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false));
    }
  }, [token]);

  return { data, error, isFetching };
};
