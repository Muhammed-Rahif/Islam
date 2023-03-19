import { quranApiInstance } from 'config/api';
import { useQuery } from 'react-query';
import { Chapter } from '../types/Chapter';

// interface Props {}

function useChapersList() {
  return useQuery(
    ['chapters'],
    async () => {
      const { data }: { data: { chapters: Chapter[] } } =
        await quranApiInstance.get('/chapters');

      return data;
    },
    {
      enabled: true,
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: true,
    }
  );
}

export { useChapersList };
