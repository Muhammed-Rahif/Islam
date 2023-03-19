import { quranApiInstance } from 'config/api';
import { useQuery } from 'react-query';
import { Chapter } from '../types/Chapter';

interface Props {
  chapterId: number;
}

function useChapter({ chapterId }: Props) {
  return useQuery(
    ['chapter', chapterId],
    async () => {
      const { data }: { data: Chapter } = await quranApiInstance.get(
        `/chapters/${chapterId}`
      );

      return data;
    },
    {
      enabled: Boolean(chapterId),
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: true,
    }
  );
}

export { useChapter };
