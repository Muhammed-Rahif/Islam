import { quranApiInstance } from 'config/api';
import { useQuery } from 'react-query';
import { VersesUthmani } from '../types/VersesUthmani';

interface Props {
  chapterId: number;
}

function useVersesUthmani({ chapterId }: Props) {
  return useQuery(['verses-uthmani', chapterId], async () => {
    const { data }: { data: VersesUthmani } = await quranApiInstance.get(
      `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterId}`
    );

    return data;
  });
}

export { useVersesUthmani };
