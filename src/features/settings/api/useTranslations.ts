import { quranApiInstance } from 'config/api';
import { useQuery } from '@tanstack/react-query';
import { Translations } from '../types/Translations';

// interface Props {}

function useTranslations() {
  return useQuery({
    queryKey: ['translations', 'resource'],
    queryFn: async () => {
      const { data }: { data: { translations: Translations } } =
        await quranApiInstance.get('/resources/translations');
      return data;
    },
    enabled: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: true,
    structuralSharing: false,
    notifyOnChangeProps: ['data'],
  });
}

export { useTranslations };
