import { quranApiInstance } from 'config/api';
import { useQuery } from '@tanstack/react-query';
import { Chapter } from '../types/Chapter';

interface Props {
  chapterId: number;
}

function useChapter({ chapterId }: Props) {
  return useQuery({
    queryKey: ['chapter', chapterId],
    queryFn: async () => {
      const { data }: { data: Chapter } = await quranApiInstance.get(
        `/chapters/${chapterId}`
      );

      return data;
    },
    enabled: Boolean(chapterId),
    staleTime: Infinity,
    cacheTime: Infinity,
    structuralSharing: false,
    notifyOnChangeProps: ['data', 'isLoading', 'error'],
  });
}

export { useChapter };
