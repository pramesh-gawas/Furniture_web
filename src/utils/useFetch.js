import { useState, useEffect } from "react";

export function useFetch(url, method = "GET", body = null, token = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);

        const options = {
          method: method,
          headers: {},
        };

        if (token) {
          options.headers["Authorization"] = `Bearer ${token}`;
        }

        if (body) {
          options.headers["Content-Type"] = "application/json";
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const result = await response.json();
        if (!response.ok)
          throw new Error(`Error: ${result.message}` || "something went wrong");
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, JSON.stringify(body), token]);

  return { data, loading, error };
}
