import { fetcher } from "services/fetcher";
import { useSelector } from "react-redux";

import useSWR from "swr";

export const useGet = (url, params, props) => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.token

  const { data, error, isValidating, mutate } = useSWR(
    !props && [`${url}`, params, token],  
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    mutate,
    data,
    loading: !error && !data,
    error,
    isValidating,
  };
};
