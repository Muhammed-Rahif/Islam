import { quranApiInstance } from 'config/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { VersesUthmani } from '../types/VersesUthmani';

interface Props {
  chapterId: number;
  pages: {
    start: number;
    end: number;
    continue?: number;
  };
}

function useVersesUthmani({ chapterId, pages }: Props) {
  return useInfiniteQuery({
    queryKey: ['verses-uthmani', chapterId, pages],
    queryFn: async ({ pageParam = pages.continue ?? pages.start }) => {
      const { data }: { data: VersesUthmani } = await quranApiInstance.get(
        `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterId}&page_number=${pageParam}`
      );

      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPageNo = parseInt(lastPage.meta.filters.page_number);
      return currentPageNo < pages.end ? currentPageNo + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      const currentPageNo = parseInt(firstPage.meta.filters.page_number);
      return currentPageNo > pages.start ? currentPageNo - 1 : undefined;
    },
    enabled: Boolean(chapterId),
    cacheTime: Infinity,
    staleTime: Infinity,
    structuralSharing: false,
  });
}

export { useVersesUthmani };
