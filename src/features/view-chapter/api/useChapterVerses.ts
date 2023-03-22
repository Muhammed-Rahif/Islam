import { quranApiInstance } from 'config/api';
import { useQuery } from '@tanstack/react-query';
import { VersesByChapter } from '../types/VersesByChapter';

interface Props {
  chapterId: number;
  words?: boolean;
  page?: number;
  per_page?: number;
  translations?: number[];
}

function useChapterVerses({
  chapterId,
  page = 1,
  per_page = 10,
  words = true,
  translations = [131],
}: Props) {
  return useQuery({
    queryKey: ['chapter-verses', chapterId],
    queryFn: async () => {
      const { data }: { data: VersesByChapter } = await quranApiInstance.get(
        `/verses/by_chapter/${chapterId}?words=${words}&page=${page}&per_page=${per_page}&word_fields=text-uthmani,location,audio_url&translations=${translations.join(
          ','
        )}&translation_fields=resource_name`
      );

      return data;
    },
    enabled: Boolean(chapterId),
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: true,
    structuralSharing: false,
    notifyOnChangeProps: ['data', 'error', 'isLoading'],
  });
}

export { useChapterVerses };
