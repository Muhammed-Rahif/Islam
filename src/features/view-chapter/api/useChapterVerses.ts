import { quranApiInstance } from 'config/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { VersesByChapter } from '../types/VersesByChapter';

interface Props {
  chapterId: number;
  words?: boolean;
  per_page?: number;
  translations?: number[];
}

function useChapterVerses({
  chapterId,
  per_page = 10,
  words = true,
  translations = [131],
}: Props) {
  return useInfiniteQuery({
    queryKey: ['chapter-verses', chapterId, per_page, translations, words],
    queryFn: async ({ pageParam = 1 }) => {
      const { data }: { data: VersesByChapter } = await quranApiInstance.get(
        `/verses/by_chapter/${chapterId}?words=${words}&page=${pageParam}&per_page=${per_page}&word_fields=text-uthmani,location,audio_url&translations=${translations.join(
          ','
        )}&translation_fields=resource_name`
      );

      return data;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.pagination.next_page ?? undefined,
    getPreviousPageParam: (firstPage, allPages) =>
      firstPage.pagination.current_page === 1
        ? undefined
        : firstPage.pagination.current_page - 1,
    enabled: Boolean(chapterId),
    cacheTime: Infinity,
    staleTime: Infinity,
    structuralSharing: false,
    notifyOnChangeProps: [
      'data',
      'error',
      'isLoading',
      'fetchNextPage',
      'isFetchingNextPage',
      'hasNextPage',
    ],
  });
}

export { useChapterVerses };
