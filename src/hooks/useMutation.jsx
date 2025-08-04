import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Services } from "../services";

const useMutation = ({ url, defaultparams = null, alert = () => null, helperDir = null, headers = null }) => {
  const [params, setparams] = useState(defaultparams);
  const [optimisticData, setOptimisticData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("idle");

  const cancelSourceRef = useRef(null);

  const fetchData = useCallback(() => {
    if (params === null) return;

    setLoading("pending");
    setError(null);

    const source = axios.CancelToken.source();
    cancelSourceRef.current = source;

    Services()
      .post(url, params, {
        cancelToken: source.token,
        headers
        // headers: {
        //   ...(isForm ? {} : { "Content-Type": "application/json" }),
        // },
      })
      .then((raw) => {
        setData(raw.data);
        setLoading("success");
        setOptimisticData(null);
        if (helperDir) helperDir(raw);
        if (alert) alert();
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          setLoading("error");
          setError(err);
        }
      });

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [params]);

  useEffect(() => {
    const cancel = fetchData();
    return () => {
      if (cancel) cancel();
    };
  }, [fetchData]);

  const postWithOptimisticUpdate = useCallback(
    async (postParams, optimisticUpdate) => {
      if (optimisticUpdate) {
        setOptimisticData(optimisticUpdate);
      }

      const isForm = postParams instanceof FormData;

      try {
        const response = await Services().post(url, postParams, {
          headers: {
            ...(isForm ? {} : { "Content-Type": "application/json" }),
          },
        });

        setData(response.data);
        setOptimisticData(null);

        window.dispatchEvent(
          new CustomEvent("CALL_TOAST", {
            detail: {
              type: "success",
              message: "Item berhasil ditambahkan",
              delay: 3000,
            },
          })
        );
      } catch (err) {
        setOptimisticData(null);
        setError(err);
      }
    },
    [url]
  );

  const combinedData = optimisticData ? { ...data, ...optimisticData } : data;

  return {
    error,
    loading,
    params,
    setparams,
    data: combinedData,
    postWithOptimisticUpdate,
  };
};

export default useMutation;
