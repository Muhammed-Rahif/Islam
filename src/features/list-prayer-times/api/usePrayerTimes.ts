import { useQuery } from '@tanstack/react-query';
import { PrayerTimesResponse } from '../types/PrayerTimesResponse';
import axios from 'axios';
import dayjs from 'dayjs';
import { getGeoLocation } from 'utils/geoLocation';
import { LocalNotifications } from '@capacitor/local-notifications';
import {
  generatePrayerNotificationContent,
  updatePrayerNotifications,
} from '../utils/prayerTimes';
import { IntRange } from 'types/Int';
import { ObligatoryPrayers } from 'types/Prayers';

interface Props {
  date?: string;
  method?: IntRange<0, 14>;
  notifications?: ObligatoryPrayers[];
}

/**
 * @param {number} method - Calculation method
 * - 0 - Shia Ithna-Ansari
 * - 1 - University of Islamic Sciences, Karachi
 * - 2 - Islamic Society of North America
 * - 3 - Muslim World League
 * - 4 - Umm Al-Qura University, Makkah
 * - 5 - Egyptian General Authority of Survey
 * - 7 - Institute of Geophysics, University of Tehran
 * - 8 - Gulf Region
 * - 9 - Kuwait
 * - 10 - Qatar
 * - 11 - Majlis Ugama Islam Singapura, Singapore
 * - 12 - Union Organization islamic de France
 * - 13 - Diyanet İşleri Başkanlığı, Turkey
 * - 14 - Spiritual Administration of Muslims of Russia
 * - 15 - Moonsighting Committee Worldwide (also requires shafaq parameter) // not implemented yet
 * - 16 - Dubai (unofficial) // not implemented yet
 */
function usePrayerTimes({
  date = dayjs().format('DD-MM-YYYY'),
  method = 4,
}: Props = {}) {
  return useQuery<PrayerTimesResponse>({
    queryKey: ['prayer-times', date, method],
    queryFn: async () => {
      const geoLocation = await getGeoLocation();

      const { data }: { data: PrayerTimesResponse } = await axios.get(
        `https://api.aladhan.com/v1/timings/${date}?latitude=${geoLocation?.coords.latitude}&longitude=${geoLocation?.coords.longitude}&method=${method}`
      );

      return data;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    structuralSharing: false,
  });
}

export { usePrayerTimes };
