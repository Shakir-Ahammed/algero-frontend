import { useState, useEffect } from "react";
import { apiFetch } from "../lib/api";

/**
 * Generic hook to fetch data from the backend API.
 * Falls back to the provided static data if the API call fails.
 */
export function useApiData<T>(path: string, fallback: T): {
  data: T;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    apiFetch<{ data: T }>(path)
      .then((res) => {
        if (!cancelled) {
          // Laravel paginates with { data: [...] } or returns raw array
          const payload = Array.isArray(res) ? res : res.data ?? res;
          setData(payload as T);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          // keep fallback data
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, loading, error };
}
