import { quranApiInstance } from 'config/api';
import { useQuery } from 'react-query';
import { Chapter, ChapterSortBy } from '../types/Chapter';
import { Juz } from '../types/Juz';

interface Props {
  sortBy: ChapterSortBy;
}

function useChapersList({ sortBy }: Props) {
  return useQuery('chapters', async () => {
    type ChapterWithJuzType = Chapter & {
      juzNo: number;
    };

    // fetching chapters only
    const { data }: { data: { chapters: ChapterWithJuzType[] } } =
      await quranApiInstance.get('/chapters');

    // fetching juzs
    const {
      data: { juzs },
    }: { data: { juzs: Juz[] } } = await quranApiInstance.get('/juzs');

    // injecting juzNo to chapters
    // data.chapters = data.chapters.map((chapter) => {
    //   chapter.juzNo =
    // });

    if (sortBy === 'revelation-order') {
      data.chapters = data.chapters.sort(
        (a, b) => a.revelation_order - b.revelation_order
      );
    }

    return data;
  });
}

export { useChapersList };
