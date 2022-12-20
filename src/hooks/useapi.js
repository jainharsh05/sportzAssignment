import { useState } from "react";

export default (api) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    try {
      const res = await api(...args);
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Unwanted Error");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    request,
  };
};
