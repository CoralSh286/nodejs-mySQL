import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
const URL = "http://localhost:3001/";


const useApiRequest = ({ url, method = 'get', initialData = null, body = {} }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest({
        url,
        method,
        data: body, // Changed from 'body' to 'data' - axios expects 'data' property
      });
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Memoized refetch function that can be called manually
  const refetch = useCallback(() => {
    return fetchData();
  }, [url, method, body]);

  useEffect(() => {
    fetchData();
  }, [url, method]);

  return { data, loading, error, refetch };
};


const apiRequest = async ({ url, method, body }) => {
    try {
        const config = {
            baseURL: URL,
            url,
            method,
            headers: {
            'Content-Type': 'application/json',
            }
        };

        // Only add data if there's a body and it's not a DELETE request
        if (body && method.toUpperCase() !== 'DELETE') {
            config.data = body; // json-server expects plain objects, not stringified
        }

        const response = await axios(config);
        return response.data;
    } catch (err) {
        console.error('API request error:', err);
        throw err; // Re-throw to handle in the calling function
    }
};
export  {useApiRequest, apiRequest};