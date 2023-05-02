import { quranApiInstance } from 'config/api';
import { useQuery } from '@tanstack/react-query';
import { PrayerTimeMethodsResponse } from '../types/PrayerMethodsResponse';

// interface Props {}

function usePrayerTimeMethods() {
  return useQuery({
    queryKey: ['prayer-time-methods', 'resource'],
    queryFn: async () => {
      const { data }: { data: PrayerTimeMethodsResponse } =
        await quranApiInstance.get('http://api.aladhan.com/v1/methods');
      return data;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    structuralSharing: false,
  });
}

export { usePrayerTimeMethods };
