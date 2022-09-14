import { useEffect, useState } from "react";
import { apiAuth } from "../api";

export const useLogin = (userData) => {
  const { username, password } = userData;

  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (username && password) {
      setIsFetching(true);
      username &&
        password &&
        apiAuth
        .post("auth/login/room", 
        {},
        {
          headers: {
          "username": username,
          "pw": password
         },
        })
        .then((res) => {
          setData(res.data);
          localStorage.setItem("tokenNgt", res.data.access_token);
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password]);

  return { data, error, isFetching };
};
