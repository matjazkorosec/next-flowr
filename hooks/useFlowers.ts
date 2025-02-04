import { useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';
import { Flower } from '@/types/flower';

const useFlowers = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFlowers = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<{ items: Flower[] }>('/flowers');
        setFlowers(response.data.items);
      } catch (err) {
        console.error('Error fetching flowers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlowers();
  }, []);

  return { flowers, loading };
};

export default useFlowers;
