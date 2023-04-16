import { quranApiInstance } from 'config/api';
import { useQuery } from '@tanstack/react-query';
import { Contributor } from '../types/Contributor';

// interface Props {}

function useContributors() {
  return useQuery({
    queryKey: ['contributors'],
    queryFn: async () => {
      const { data }: { data: Contributor[] } = await quranApiInstance.get(
        'https://api.github.com/repos/Muhammed-Rahif/Islam/contributors'
      );

      return data;
    },
  });
}

export { useContributors };
