import { quranApiInstance } from 'config/api';
import { useQuery } from 'react-query';
import { Juz } from '../types/Juz';

// interface Props {}

function useAllJuzs() {
  return useQuery(['juzs'], async () => {
    const { data }: { data: { juzs: Juz[] } } = await quranApiInstance.get(
      '/juzs'
    );

    return data;
  });
}

export { useAllJuzs };
