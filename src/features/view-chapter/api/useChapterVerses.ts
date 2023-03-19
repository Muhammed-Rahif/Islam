import { quranApiInstance } from 'config/api';
import { useQuery } from 'react-query';
import { VersesByChapter } from '../types/VersesByChapter';

interface Props {
  chapterId: number;
  words?: boolean;
  page?: number;
  per_page?: number;
}

function useChapterVerses({
  chapterId,
  page = 1,
  per_page = 10,
  words = true,
}: Props) {
  return useQuery(['chapter-verses', chapterId], async () => {
    const { data }: { data: VersesByChapter } = await quranApiInstance.get(
      `/verses/by_chapter/${chapterId}?words=${words}&page=${page}&per_page=${per_page}&word_fields=text-uthmani,location,audio_url`
    );

    return data;
  });
}

export { useChapterVerses };
