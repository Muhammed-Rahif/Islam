import { quranApiInstance } from 'config/api';
import { useQuery } from '@tanstack/react-query';
import { Juz } from '../types/Juz';

// interface Props {}

function useAllJuzs() {
  return useQuery({
    queryKey: ['juzs'],
    queryFn: async () => {
      const { data }: { data: { juzs: Juz[] } } = await quranApiInstance.get(
        '/juzs'
      );
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

export { useAllJuzs };
