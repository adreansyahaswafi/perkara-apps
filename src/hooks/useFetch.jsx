import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Services } from "../services";

const useFetchEngine = ({
  url,
  defaultparams = null,
  helperDir
}) => {
  const [params, setparams] = useState(defaultparams);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("idle");

  const fetchData = useCallback(() => {
    if (params === null) return;
    setLoading("pending");
    setError(null);
    const source = axios.CancelToken.source();
    const requestConfig = {
      cancelToken: source.token,
    };
    // console.log(requestConfig);

    Services()
      .get(url, params, { ...requestConfig })
      .then((raw) => {
        setData(raw.data);
        setLoading("resolved");
        if (helperDir) {
          helperDir(raw?.data);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          // console.log("Request canceled", err.message);
        } else {
          setLoading("error");
          setError(err);
        }
      });

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [params, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    error,
    loading,
    params,
    setparams,
    data,
  };
};
export default useFetchEngine;
