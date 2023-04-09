import dayjs from 'dayjs';
import { Timings } from '../types/PrayerTimesResponse';

export function getNextPrayer(prayerTimes: Timings) {
  const now = dayjs();
  const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  let nextPrayerIndex = 0;

  for (let i = 0; i < prayerOrder.length; i++) {
    const prayerTime = dayjs(
      `${now.format('YYYY-MM-DD')} ${
        prayerTimes[prayerOrder[i] as keyof Timings]
      }`
    );

    if (prayerTime.isAfter(now)) {
      nextPrayerIndex = i;
      break;
    }
  }

  const nextPrayerName = prayerOrder[nextPrayerIndex];
  const nextPrayerTime = dayjs(
    `${now.format('YYYY-MM-DD')} ${
      prayerTimes[nextPrayerName as keyof Timings]
    }`
  );

  return {
    name: nextPrayerName,
    time: nextPrayerTime.toDate(),
    readableTime: nextPrayerTime.format('h:mm A'),
  };
}
