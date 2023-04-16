import { quranApiInstance } from 'config/api';
import { useQuery } from '@tanstack/react-query';
import { Stargazers } from '../types/Stargazers';

// interface Props {}

function useStargazers() {
  return useQuery({
    queryKey: ['stargazers'],
    queryFn: async () => {
      const { data }: { data: Stargazers[] } = await quranApiInstance.get(
        'https://api.github.com/repos/Muhammed-Rahif/Islam/stargazers'
      );

      return data;
    },
  });
}

export { useStargazers };
