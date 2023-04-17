import { Translations } from 'features/settings';
import { atomWithStorage } from 'jotai/utils';
import { IntRange } from 'types/Int';
import { ObligatoryPrayers } from 'types/Prayers';

const settingsStorageKey = 'settings';

export type SettingsType = {
  general: {
    language: string;
    theme: string;
  };
  quran: {
    fontSize: '75%' | '100%' | '125%' | '150%' | '175%' | '200%';
    fontFamily: string;
    translations: Translations;
  };
  prayerTimes: {
    notifications: ObligatoryPrayers[];
    /**
     * @example {number} methodNo - Calculation method
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
     * - 15 - Moonsighting Committee Worldwide (also requires shafaq parameter) // not supported yet
     * - 16 - Dubai (unofficial) // not supported yet
     */
    methodId: IntRange<0, 14>;
  };
};

export const availableSettings = {
  general: {
    theme: ['light', 'dark'],
  },
  quran: {
    fontSize: ['75%', '100%', '125%', '150%', '175%', '200%'],
    fontFamily: [
      // 'Uthmanic Script',
      'Me Quran',
      'Al Qalam',
      'Noorehira',
      'Al Qalam Quran',
      'Maddina',
      'Noorehidayat',
      'Quran Standard',
      'Arabic Quran',
      'Scheherazade',
      'Saleem',
      'Amiri',
      'Amiri Quran',
      'Aref Ruqaa',
      'Katibeh',
      'Lateef',
      'Mirza',
      'Noto Naskh Arabic',
      'Rakkas',
      'Reem Kufi',
    ],
  },
  prayerTimes: {
    notifications: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
    methods: [
      'Shia Ithna-Ansari',
      'University of Islamic Sciences, Karachi',
      'Islamic Society of North America',
      'Muslim World League',
      'Umm Al-Qura University, Makkah',
      'Egyptian General Authority of Survey',
      'Institute of Geophysics, University of Tehran',
      'Gulf Region',
      'Kuwait',
      'Qatar',
      'Majlis Ugama Islam Singapura, Singapore',
      'Union Organization islamic de France',
      'Diyanet İşleri Başkanlığı, Turkey',
      'Spiritual Administration of Muslims of Russia',
    ],
  },
};

const settingsAtom = atomWithStorage<SettingsType>(settingsStorageKey, {
  general: {
    language: 'en',
    theme: 'light',
  },
  quran: {
    fontSize: '100%',
    fontFamily: 'Me Quran',
    translations: [
      {
        id: 131,
        name: 'Dr. Mustafa Khattab, the Clear Quran',
        author_name: 'Dr. Mustafa Khattab',
        slug: 'clearquran-with-tafsir',
        language_name: 'english',
        translated_name: {
          name: 'Dr. Mustafa Khattab',
        },
      },
    ],
  },
  prayerTimes: {
    notifications: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
    methodId: 4,
  },
});

export { settingsAtom };
