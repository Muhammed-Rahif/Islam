import { quranApiInstance } from 'config/api';
import { useQuery } from '@tanstack/react-query';
import { VersesUthmani } from '../types/VersesUthmani';

interface Props {
  chapterId: number;
}

function useVersesUthmani({ chapterId }: Props) {
  return useQuery({
    queryKey: ['verses-uthmani', chapterId],
    queryFn: async () => {
      const { data }: { data: VersesUthmani } = await quranApiInstance.get(
        `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterId}`
      );

      return data;
    },
    enabled: Boolean(chapterId),
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: true,
    structuralSharing: false,
    notifyOnChangeProps: ['data', 'error', 'isLoading', 'refetch'],
  });
}

export { useVersesUthmani };
