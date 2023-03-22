import { quranApiInstance } from 'config/api';
import { useQuery } from '@tanstack/react-query';
import { Chapter } from '../types/Chapter';

// interface Props {}

function useChapersList() {
  return useQuery({
    queryKey: ['chapters'],
    queryFn: async () => {
      const { data }: { data: { chapters: Chapter[] } } =
        await quranApiInstance.get('/chapters');

      return data;
    },
    enabled: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: true,
    structuralSharing: false,
    notifyOnChangeProps: ['data', 'error', 'isLoading', 'refetch'],
  });
}

export { useChapersList };
