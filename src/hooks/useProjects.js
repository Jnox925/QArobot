import { useState, useEffect, useCallback } from "react";
import { fetchProjects } from "../utils/api";

export function useProjects() {
  const [type, setType] = useState("all");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProjects({ type, q: submittedQuery });
      setProjects(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [type, submittedQuery]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  function search(text) {
    setSubmittedQuery(text);
  }

  return {
    type,
    setType,
    projects,
    loading,
    error,
    search,
    reload: loadProjects,
  };
}
